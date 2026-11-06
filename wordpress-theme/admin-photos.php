<?php
/**
 * Écran « Apparence › Photos du site ».
 *
 * Les photos ne tiennent pas dans le zip du thème (limite d'envoi de 2 Mo) : elles sont
 * livrées dans des zips séparés (placo-pro-237-photos-1.zip, -2.zip…). Après chaque
 * installation ou mise à jour du thème, WordPress propose de les téléverser ici.
 * Elles sont rangées dans wp-content/uploads/placo-pro-237/site et survivent aux mises à jour.
 *
 * @package placo-pro-237
 */

defined( 'ABSPATH' ) || exit;

const PLACO_PHOTOS_PAGE = 'placo-photos';
/** Extensions acceptées à l'extraction : jamais de PHP, de SVG ni de HTML. */
const PLACO_PHOTOS_EXT = array( 'jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'woff2', 'woff', 'ico', 'mp4' );

function placo_photos_can() {
	return current_user_can( 'edit_theme_options' ) && current_user_can( 'upload_files' );
}

function placo_photos_url() {
	return admin_url( 'themes.php?page=' . PLACO_PHOTOS_PAGE );
}

/** Liste des photos attendues (générée au build) : [ 'files' => [ [path, size, part] ], 'parts' => [...] ] */
function placo_photos_manifest() {
	static $m = null;
	if ( null === $m ) {
		$file = get_template_directory() . '/photos-manifest.json';
		$m    = is_file( $file ) ? json_decode( (string) file_get_contents( $file ), true ) : null;
		if ( ! is_array( $m ) ) {
			$m = array( 'files' => array(), 'parts' => array() );
		}
	}
	return $m;
}

/** État par zip : nombre de photos présentes (et à jour) sur le nombre attendu. */
function placo_photos_status() {
	$m     = placo_photos_manifest();
	$parts = array();
	foreach ( $m['parts'] as $part ) {
		$parts[ $part ] = array( 'ok' => 0, 'total' => 0 );
	}
	$missing = 0;
	foreach ( $m['files'] as $f ) {
		$part = $f['part'];
		if ( ! isset( $parts[ $part ] ) ) {
			$parts[ $part ] = array( 'ok' => 0, 'total' => 0 );
		}
		$parts[ $part ]['total']++;
		$found = placo_find_file( '/' . $f['path'] );
		if ( $found && filesize( $found ) === (int) $f['size'] ) {
			$parts[ $part ]['ok']++;
		} else {
			$missing++;
		}
	}
	return array( 'missing' => $missing, 'total' => count( $m['files'] ), 'parts' => $parts );
}

/* -------------------------------------------------------------------------
 * Menu
 * ---------------------------------------------------------------------- */
add_action(
	'admin_menu',
	function () {
		add_theme_page( 'Photos du site', 'Photos du site', 'edit_theme_options', PLACO_PHOTOS_PAGE, 'placo_photos_render' );
	}
);

/* -------------------------------------------------------------------------
 * Après l'installation / la mise à jour du thème : on propose les photos
 * ---------------------------------------------------------------------- */

// 1. Lien sur la page « Thème installé / mis à jour » (pour les mises à jour suivantes).
$placo_next_step = function ( $actions ) {
	if ( placo_photos_can() ) {
		$actions = array( 'placo_photos' => '<a class="button button-primary" href="' . esc_url( placo_photos_url() ) . '">Étape suivante : téléverser les photos du site →</a>' ) + (array) $actions;
	}
	return $actions;
};
add_filter( 'install_theme_complete_actions', $placo_next_step, 99 );
add_filter( 'update_theme_complete_actions', $placo_next_step, 99 );

// 2. Première page d'administration ouverte après une nouvelle version : redirection vers l'écran Photos
//    s'il manque des photos (une seule fois par version).
add_action(
	'admin_init',
	function () {
		if ( wp_doing_ajax() || ! placo_photos_can() || 'GET' !== ( isset( $_SERVER['REQUEST_METHOD'] ) ? $_SERVER['REQUEST_METHOD'] : '' ) ) {
			return;
		}
		if ( get_option( 'placo_photos_prompted' ) === PLACO_VERSION ) {
			return;
		}
		global $pagenow;
		if ( in_array( $pagenow, array( 'update.php', 'async-upload.php', 'customize.php' ), true ) ) {
			return; // ne pas interrompre un téléversement en cours
		}
		update_option( 'placo_photos_prompted', PLACO_VERSION, false );
		$page = isset( $_GET['page'] ) ? sanitize_key( $_GET['page'] ) : '';
		if ( PLACO_PHOTOS_PAGE !== $page && placo_photos_status()['missing'] > 0 ) {
			wp_safe_redirect( add_query_arg( 'placo_welcome', '1', placo_photos_url() ) );
			exit;
		}
	}
);

// 3. Rappel sur toutes les pages d'administration tant que des photos manquent.
add_action(
	'admin_notices',
	function () {
		if ( ! placo_photos_can() ) {
			return;
		}
		$screen = get_current_screen();
		if ( $screen && false !== strpos( (string) $screen->id, PLACO_PHOTOS_PAGE ) ) {
			return;
		}
		$s = placo_photos_status();
		if ( $s['missing'] < 1 ) {
			return;
		}
		printf(
			'<div class="notice notice-warning"><p><strong>PLACO PRO 237 :</strong> %1$d photo(s) du site sont manquantes ou à mettre à jour. <a class="button button-primary" style="margin-left:8px" href="%2$s">Téléverser les photos</a></p></div>',
			(int) $s['missing'],
			esc_url( placo_photos_url() )
		);
	}
);

/* -------------------------------------------------------------------------
 * Réception d'un fichier (un zip de photos, ou une image seule) — appel AJAX
 * ---------------------------------------------------------------------- */
add_action(
	'wp_ajax_placo_upload_photos',
	function () {
		check_ajax_referer( 'placo_photos', 'nonce' );
		if ( ! placo_photos_can() ) {
			wp_send_json_error( array( 'message' => 'Droits insuffisants.' ), 403 );
		}
		if ( empty( $_FILES['file'] ) || ! is_array( $_FILES['file'] ) ) {
			wp_send_json_error( array( 'message' => 'Aucun fichier reçu (il dépasse peut-être la taille autorisée par l\'hébergeur).' ), 400 );
		}
		$file = $_FILES['file']; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		if ( UPLOAD_ERR_OK !== (int) $file['error'] || ! is_uploaded_file( $file['tmp_name'] ) ) {
			$msg = in_array( (int) $file['error'], array( UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE ), true )
				? 'Fichier trop lourd pour l\'hébergeur (limite : ' . size_format( wp_max_upload_size() ) . ').'
				: 'Le téléversement a échoué (code ' . (int) $file['error'] . ').';
			wp_send_json_error( array( 'message' => $msg ), 400 );
		}

		$name = sanitize_file_name( wp_unslash( $file['name'] ) );
		$ext  = strtolower( pathinfo( $name, PATHINFO_EXTENSION ) );
		$base = placo_photos_dir();
		if ( ! wp_mkdir_p( $base ) ) {
			wp_send_json_error( array( 'message' => 'Impossible de créer le dossier ' . $base . '.' ), 500 );
		}

		if ( 'zip' === $ext ) {
			$written = placo_photos_extract_zip( $file['tmp_name'], $base );
			if ( is_wp_error( $written ) ) {
				wp_send_json_error( array( 'message' => $written->get_error_message() ), 400 );
			}
		} elseif ( in_array( $ext, PLACO_PHOTOS_EXT, true ) ) {
			$written = placo_photos_write( $base, 'realisations/' . $name, (string) file_get_contents( $file['tmp_name'] ) ) ? 1 : 0;
		} else {
			wp_send_json_error( array( 'message' => 'Format non accepté : envoyez les fichiers placo-pro-237-photos-….zip.' ), 400 );
		}

		$s = placo_photos_status();
		wp_send_json_success(
			array(
				'written' => $written,
				'missing' => $s['missing'],
				'parts'   => $s['parts'],
			)
		);
	}
);

/** Écrit un fichier extrait dans le dossier des photos (chemin relatif à site/, déjà validé). */
function placo_photos_write( $base, $rel, $data ) {
	$rel = ltrim( str_replace( '\\', '/', $rel ), '/' );
	if ( '' === $rel || false !== strpos( $rel, '..' ) || false !== strpos( $rel, "\0" ) ) {
		return false;
	}
	$ext = strtolower( pathinfo( $rel, PATHINFO_EXTENSION ) );
	if ( ! in_array( $ext, PLACO_PHOTOS_EXT, true ) || strlen( $data ) > 15 * MB_IN_BYTES ) {
		return false;
	}
	$dest = $base . '/' . $rel;
	if ( ! wp_mkdir_p( dirname( $dest ) ) ) {
		return false;
	}
	return false !== file_put_contents( $dest, $data );
}

/** Chemin d'une entrée du zip, relatif à site/ (« placo-pro-237-photos-1/site/realisations/x.jpg » → « realisations/x.jpg »). */
function placo_photos_entry_path( $entry ) {
	$entry = str_replace( '\\', '/', $entry );
	if ( '/' === substr( $entry, -1 ) ) {
		return '';
	}
	$pos = strpos( '/' . $entry, '/site/' );
	if ( false !== $pos ) {
		return substr( '/' . $entry, $pos + 6 );
	}
	return 'realisations/' . basename( $entry ); // zip de photos « en vrac »
}

/** Extrait un zip de photos. Retourne le nombre de fichiers écrits ou une WP_Error. */
function placo_photos_extract_zip( $zip_file, $base ) {
	$written = 0;
	if ( class_exists( 'ZipArchive' ) ) {
		$zip = new ZipArchive();
		if ( true !== $zip->open( $zip_file ) ) {
			return new WP_Error( 'zip', 'Ce fichier zip est illisible.' );
		}
		for ( $i = 0; $i < $zip->numFiles; $i++ ) {
			$rel = placo_photos_entry_path( (string) $zip->getNameIndex( $i ) );
			if ( '' === $rel || ! in_array( strtolower( pathinfo( $rel, PATHINFO_EXTENSION ) ), PLACO_PHOTOS_EXT, true ) ) {
				continue;
			}
			$data = $zip->getFromIndex( $i );
			if ( false !== $data && placo_photos_write( $base, $rel, $data ) ) {
				$written++;
			}
		}
		$zip->close();
	} else {
		require_once ABSPATH . 'wp-admin/includes/class-pclzip.php';
		$zip  = new PclZip( $zip_file );
		$list = $zip->extract( PCLZIP_OPT_EXTRACT_AS_STRING );
		if ( ! is_array( $list ) ) {
			return new WP_Error( 'zip', 'Ce fichier zip est illisible.' );
		}
		foreach ( $list as $entry ) {
			if ( ! empty( $entry['folder'] ) ) {
				continue;
			}
			$rel = placo_photos_entry_path( (string) $entry['filename'] );
			if ( '' !== $rel && placo_photos_write( $base, $rel, (string) $entry['content'] ) ) {
				$written++;
			}
		}
	}
	if ( 0 === $written ) {
		return new WP_Error( 'zip', 'Aucune photo trouvée dans ce zip.' );
	}
	return $written;
}

/* -------------------------------------------------------------------------
 * Écran
 * ---------------------------------------------------------------------- */
function placo_photos_render() {
	if ( ! placo_photos_can() ) {
		wp_die( 'Droits insuffisants.' );
	}
	$s       = placo_photos_status();
	$welcome = ! empty( $_GET['placo_welcome'] ); // phpcs:ignore WordPress.Security.NonceVerification
	$limit   = size_format( wp_max_upload_size() );
	?>
	<div class="wrap" id="placo-photos">
		<h1>Photos du site PLACO PRO 237</h1>

		<?php if ( $welcome ) : ?>
			<div class="notice notice-success"><p><strong>Le thème PLACO PRO 237 (version <?php echo esc_html( PLACO_VERSION ); ?>) est installé.</strong> Dernière étape : téléversez les photos ci-dessous.</p></div>
		<?php endif; ?>

		<p style="font-size:14px;max-width:760px">
			Les photos des réalisations sont livrées à part, dans les fichiers
			<code>placo-pro-237-photos-1.zip</code>, <code>-2.zip</code>… (chacun fait moins de 2 Mo).
			Sélectionnez-les tous d'un coup : ils sont envoyés un par un, sans les décompresser.
			Les photos sont conservées lors des prochaines mises à jour du thème.
		</p>

		<table class="widefat striped" style="max-width:760px;margin:18px 0">
			<thead><tr><th>Fichier à téléverser</th><th>Photos présentes</th><th>État</th></tr></thead>
			<tbody id="placo-parts">
			<?php foreach ( $s['parts'] as $part => $p ) : ?>
				<tr data-part="<?php echo esc_attr( $part ); ?>">
					<td><code><?php echo esc_html( $part ); ?></code></td>
					<td class="count"><?php echo (int) $p['ok']; ?> / <?php echo (int) $p['total']; ?></td>
					<td class="state"><?php echo $p['ok'] === $p['total'] ? '<span style="color:#008a20">✔ Complet</span>' : '<span style="color:#b32d2e">À téléverser</span>'; ?></td>
				</tr>
			<?php endforeach; ?>
			</tbody>
		</table>

		<div id="placo-drop" style="max-width:728px;border:2px dashed #8c8f94;border-radius:8px;background:#fff;padding:28px 16px;text-align:center">
			<p style="font-size:15px;margin:0 0 12px"><strong>Glissez les fichiers .zip ici</strong> ou</p>
			<label class="button button-primary button-hero" for="placo-file">Choisir les fichiers…</label>
			<input type="file" id="placo-file" accept=".zip,image/jpeg,image/png,image/webp" multiple style="display:none">
			<p class="description" style="margin-top:12px">Taille maximale par fichier acceptée par votre hébergeur : <?php echo esc_html( $limit ); ?>.</p>
		</div>

		<ul id="placo-log" style="max-width:760px;margin-top:16px"></ul>

		<p id="placo-done" style="font-size:15px;<?php echo $s['missing'] > 0 ? 'display:none' : ''; ?>">
			<strong style="color:#008a20">✔ Toutes les photos sont en place.</strong>
			<a class="button" href="<?php echo esc_url( home_url( '/' ) ); ?>" target="_blank" rel="noopener">Voir le site</a>
			— pensez à vider le cache (LiteSpeed Cache › Purger tout) si vous en utilisez un.
		</p>
	</div>

	<script>
	(function () {
		var ajax = <?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>;
		var nonce = <?php echo wp_json_encode( wp_create_nonce( 'placo_photos' ) ); ?>;
		var input = document.getElementById('placo-file');
		var drop = document.getElementById('placo-drop');
		var log = document.getElementById('placo-log');

		function line(text, color) {
			var li = document.createElement('li');
			li.textContent = text;
			if (color) li.style.color = color;
			log.appendChild(li);
			return li;
		}
		function refresh(parts, missing) {
			Object.keys(parts || {}).forEach(function (part) {
				var row = document.querySelector('#placo-parts tr[data-part="' + part + '"]');
				if (!row) return;
				var p = parts[part];
				row.querySelector('.count').textContent = p.ok + ' / ' + p.total;
				row.querySelector('.state').innerHTML = p.ok === p.total
					? '<span style="color:#008a20">✔ Complet</span>'
					: '<span style="color:#b32d2e">À téléverser</span>';
			});
			document.getElementById('placo-done').style.display = missing > 0 ? 'none' : '';
		}
		async function send(files) {
			for (var i = 0; i < files.length; i++) {
				var f = files[i];
				var li = line('⏳ ' + f.name + ' : envoi…');
				var fd = new FormData();
				fd.append('action', 'placo_upload_photos');
				fd.append('nonce', nonce);
				fd.append('file', f);
				try {
					var res = await fetch(ajax, { method: 'POST', body: fd, credentials: 'same-origin' });
					var json = await res.json().catch(function () { return null; });
					if (json && json.success) {
						li.textContent = '✔ ' + f.name + ' : ' + json.data.written + ' fichier(s) installé(s)';
						li.style.color = '#008a20';
						refresh(json.data.parts, json.data.missing);
					} else {
						li.textContent = '✖ ' + f.name + ' : ' + ((json && json.data && json.data.message) || ('erreur ' + res.status + ' (fichier trop lourd pour l\'hébergeur ?)'));
						li.style.color = '#b32d2e';
					}
				} catch (e) {
					li.textContent = '✖ ' + f.name + ' : la connexion a échoué.';
					li.style.color = '#b32d2e';
				}
			}
			input.value = '';
		}
		input.addEventListener('change', function () { send(input.files); });
		['dragenter', 'dragover'].forEach(function (t) {
			drop.addEventListener(t, function (e) { e.preventDefault(); drop.style.borderColor = '#D9620F'; drop.style.background = '#fff7f0'; });
		});
		['dragleave', 'drop'].forEach(function (t) {
			drop.addEventListener(t, function (e) { e.preventDefault(); drop.style.borderColor = '#8c8f94'; drop.style.background = '#fff'; });
		});
		drop.addEventListener('drop', function (e) { send(e.dataTransfer.files); });
	})();
	</script>
	<?php
}
