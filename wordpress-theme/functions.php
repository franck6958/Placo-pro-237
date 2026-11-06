<?php
/**
 * PLACO PRO 237 — thème « site statique ».
 *
 * Le site est construit avec Next.js puis exporté en pages statiques (dossier site/).
 * Ce fichier sert ces pages à leurs adresses habituelles (/, /services, /realisations/…),
 * ainsi que les scripts, polices et photos. Les photos sont réparties dans de petites
 * extensions « PLACO PRO 237 — Photos » pour que chaque fichier zip reste léger.
 *
 * Le formulaire de devis (POST /api/devis) est traité ici et envoyé par e-mail via wp_mail().
 *
 * NE PAS MODIFIER À LA MAIN : ce thème est régénéré par scripts/build_wordpress.py.
 *
 * @package placo-pro-237
 */

defined( 'ABSPATH' ) || exit;

define( 'PLACO_VERSION', '__PLACO_VERSION__' );

// Écran « Photos du site » (administration uniquement)
if ( is_admin() ) {
	require_once get_template_directory() . '/admin-photos.php';
}

/* -------------------------------------------------------------------------
 * Dossiers contenant le site exporté : thème + extensions photos
 * ---------------------------------------------------------------------- */
function placo_site_roots() {
	static $roots = null;
	if ( null !== $roots ) {
		return $roots;
	}
	$roots = array();
	$theme = get_template_directory() . '/site';
	if ( is_dir( $theme ) ) {
		$roots[] = $theme;
	}
	// Photos téléversées depuis Apparence › Photos du site (conservées lors des mises à jour du thème)
	$uploads = placo_photos_dir();
	if ( is_dir( $uploads ) ) {
		$roots[] = $uploads;
	}
	// Ancienne méthode : extensions « PLACO PRO 237 — Photos »
	$plugins = glob( WP_PLUGIN_DIR . '/placo-pro-237-photos-*/site', GLOB_ONLYDIR );
	if ( $plugins ) {
		$roots = array_merge( $roots, $plugins );
	}
	return $roots;
}

/** Dossier où sont rangées les photos téléversées : wp-content/uploads/placo-pro-237/site */
function placo_photos_dir() {
	$up = wp_upload_dir( null, false );
	return trailingslashit( $up['basedir'] ) . 'placo-pro-237/site';
}

/** Chemin demandé, relatif à l'adresse du site (gère une installation en sous-dossier). */
function placo_request_path() {
	$uri  = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '/';
	$path = rawurldecode( (string) wp_parse_url( $uri, PHP_URL_PATH ) );
	$home = rtrim( (string) wp_parse_url( home_url( '/' ), PHP_URL_PATH ), '/' );
	if ( '' !== $home && 0 === strpos( $path, $home ) ) {
		$path = substr( $path, strlen( $home ) );
	}
	return '/' . ltrim( $path, '/' );
}

/** Trouve le fichier exporté correspondant à une adresse. */
function placo_find_file( $path ) {
	if ( false !== strpos( $path, '..' ) || false !== strpos( $path, "\0" ) || false !== strpos( $path, '\\' ) ) {
		return null;
	}
	$rel = trim( $path, '/' );
	if ( '' === $rel ) {
		$candidates = array( 'index.html' );
	} else {
		// fichier exact (_next/…, photos, données .txt), puis page HTML (/services → services.html)
		$candidates = array( $rel, $rel . '.html', $rel . '/index.html' );
	}
	foreach ( placo_site_roots() as $root ) {
		foreach ( $candidates as $c ) {
			$file = $root . '/' . $c;
			if ( is_file( $file ) ) {
				return $file;
			}
		}
	}
	return null;
}

function placo_mime( $file ) {
	$types = array(
		'html'  => 'text/html; charset=utf-8',
		'txt'   => 'text/plain; charset=utf-8',
		'js'    => 'application/javascript; charset=utf-8',
		'css'   => 'text/css; charset=utf-8',
		'json'  => 'application/json; charset=utf-8',
		'xml'   => 'application/xml; charset=utf-8',
		'svg'   => 'image/svg+xml',
		'jpg'   => 'image/jpeg',
		'jpeg'  => 'image/jpeg',
		'png'   => 'image/png',
		'webp'  => 'image/webp',
		'avif'  => 'image/avif',
		'gif'   => 'image/gif',
		'ico'   => 'image/x-icon',
		'woff2' => 'font/woff2',
		'woff'  => 'font/woff',
		'mp4'   => 'video/mp4',
		'apk'   => 'application/vnd.android.package-archive',
		'webmanifest' => 'application/manifest+json',
	);
	$ext = strtolower( pathinfo( $file, PATHINFO_EXTENSION ) );
	return isset( $types[ $ext ] ) ? $types[ $ext ] : 'application/octet-stream';
}

/** Envoie un fichier exporté (cache navigateur, 304, compression gzip) puis arrête WordPress. */
function placo_serve( $file, $status = 200 ) {
	while ( ob_get_level() > 0 ) {
		ob_end_clean();
	}
	$mime  = placo_mime( $file );
	$mtime = filemtime( $file );
	$size  = filesize( $file );
	$etag  = '"' . md5( $file . $mtime . $size ) . '"';
	$rel   = str_replace( '\\', '/', $file );

	status_header( $status );
	header( 'Content-Type: ' . $mime );
	header( 'X-Content-Type-Options: nosniff' );
	if ( false !== strpos( $rel, '/_next/static/' ) ) {
		header( 'Cache-Control: public, max-age=31536000, immutable' );
	} elseif ( preg_match( '/^(image|font|video)\//', $mime ) ) {
		header( 'Cache-Control: public, max-age=2592000' );
	} else {
		header( 'Cache-Control: public, max-age=0, must-revalidate' );
	}
	if ( 'apk' === strtolower( pathinfo( $file, PATHINFO_EXTENSION ) ) ) {
		header( 'Content-Disposition: attachment; filename="' . basename( $file ) . '"' );
	}
	header( 'Last-Modified: ' . gmdate( 'D, d M Y H:i:s', $mtime ) . ' GMT' );
	header( 'ETag: ' . $etag );

	if ( 200 === $status && isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) && trim( wp_unslash( $_SERVER['HTTP_IF_NONE_MATCH'] ) ) === $etag ) {
		status_header( 304 );
		exit;
	}

	$method = isset( $_SERVER['REQUEST_METHOD'] ) ? strtoupper( $_SERVER['REQUEST_METHOD'] ) : 'GET';
	$text   = (bool) preg_match( '/^(text\/|application\/(javascript|json|xml|manifest)|image\/svg)/', $mime );
	$accept = isset( $_SERVER['HTTP_ACCEPT_ENCODING'] ) ? (string) $_SERVER['HTTP_ACCEPT_ENCODING'] : '';

	if ( $text && function_exists( 'gzencode' ) && ! ini_get( 'zlib.output_compression' ) && false !== strpos( $accept, 'gzip' ) ) {
		$body = gzencode( (string) file_get_contents( $file ), 6 );
		header( 'Content-Encoding: gzip' );
		header( 'Vary: Accept-Encoding' );
		header( 'Content-Length: ' . strlen( $body ) );
		if ( 'HEAD' !== $method ) {
			echo $body; // phpcs:ignore WordPress.Security.EscapeOutput
		}
		exit;
	}

	header( 'Content-Length: ' . $size );
	if ( 'HEAD' !== $method ) {
		readfile( $file );
	}
	exit;
}

/** Page 404 du site. */
function placo_serve_404() {
	$file = placo_find_file( '/404' );
	if ( $file ) {
		placo_serve( $file, 404 );
	}
	status_header( 404 );
	echo 'Page introuvable.';
	exit;
}

/* -------------------------------------------------------------------------
 * Formulaire de devis : POST /api/devis (même réponse JSON que la version Next.js)
 * ---------------------------------------------------------------------- */
function placo_json( $data, $status = 200 ) {
	while ( ob_get_level() > 0 ) {
		ob_end_clean();
	}
	status_header( $status );
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Cache-Control: no-store' );
	echo wp_json_encode( $data );
	exit;
}

function placo_form_options() {
	$file = get_template_directory() . '/form-options.json';
	$opts = is_file( $file ) ? json_decode( (string) file_get_contents( $file ), true ) : null;
	return is_array( $opts ) ? $opts : array( 'cities' => array(), 'services' => array(), 'email' => '' );
}

function placo_handle_devis() {
	if ( 'POST' !== strtoupper( isset( $_SERVER['REQUEST_METHOD'] ) ? $_SERVER['REQUEST_METHOD'] : '' ) ) {
		placo_json( array( 'ok' => false, 'error' => 'Méthode non autorisée.' ), 405 );
	}
	$body = json_decode( (string) file_get_contents( 'php://input' ), true );
	if ( ! is_array( $body ) ) {
		placo_json( array( 'ok' => false, 'error' => 'Requête invalide.' ), 400 );
	}
	// Champ piège anti-spam : les robots le remplissent, les humains ne le voient pas.
	if ( ! empty( $body['website'] ) ) {
		placo_json( array( 'ok' => true ) );
	}

	$opts    = placo_form_options();
	$name    = trim( (string) ( isset( $body['name'] ) ? $body['name'] : '' ) );
	$phone   = trim( (string) ( isset( $body['phone'] ) ? $body['phone'] : '' ) );
	$city    = (string) ( isset( $body['city'] ) ? $body['city'] : '' );
	$service = (string) ( isset( $body['service'] ) ? $body['service'] : '' );
	$message = trim( (string) ( isset( $body['message'] ) ? $body['message'] : '' ) );

	$errors = array();
	$len    = function_exists( 'mb_strlen' ) ? mb_strlen( $name ) : strlen( $name );
	if ( $len < 2 ) {
		$errors['name'] = 'Indiquez votre nom (2 caractères minimum).';
	}
	if ( $len > 80 ) {
		$errors['name'] = 'Nom trop long.';
	}
	if ( ! preg_match( '/^\+?\d{8,15}$/', preg_replace( '/[\s.\-]/', '', $phone ) ) ) {
		$errors['phone'] = 'Numéro invalide. Exemple : +237 6 90 00 00 00';
	}
	if ( ! in_array( $city, $opts['cities'], true ) ) {
		$errors['city'] = 'Choisissez une ville.';
	}
	if ( ! in_array( $service, $opts['services'], true ) ) {
		$errors['service'] = 'Choisissez un type de travaux.';
	}
	if ( ( function_exists( 'mb_strlen' ) ? mb_strlen( $message ) : strlen( $message ) ) > 2000 ) {
		$errors['message'] = 'Message trop long (2000 caractères max).';
	}
	if ( $errors ) {
		placo_json( array( 'ok' => false, 'errors' => $errors ), 422 );
	}

	$text = "Bonjour PLACO PRO 237,\nJe souhaite un devis.\n\n"
		. 'Nom : ' . $name . "\n"
		. 'Téléphone : ' . $phone . "\n"
		. 'Ville : ' . $city . "\n"
		. 'Travaux : ' . $service . "\n"
		. 'Projet : ' . ( '' !== $message ? $message : '—' );

	// Destinataires : l'e-mail affiché sur le site + l'e-mail d'administration WordPress.
	$to = array_unique( array_filter( array( $opts['email'], get_option( 'admin_email' ) ) ) );
	$to = apply_filters( 'placo_devis_recipients', $to );

	$sent = wp_mail( $to, 'Demande de devis — ' . $service . ' (' . $city . ')', $text );
	if ( ! $sent ) {
		placo_json( array( 'ok' => false, 'error' => "L'envoi a échoué. Réessayez ou contactez-nous sur WhatsApp." ), 502 );
	}
	placo_json( array( 'ok' => true ) );
}

/* -------------------------------------------------------------------------
 * Routeur : intercepte les requêtes du site avant WordPress
 * ---------------------------------------------------------------------- */
add_filter(
	'do_parse_request',
	function ( $do_parse ) {
		if ( is_admin() || wp_doing_ajax() || wp_doing_cron() || isset( $_GET['rest_route'] ) || is_customize_preview() ) {
			return $do_parse;
		}
		$path = placo_request_path();

		// Laisse WordPress gérer ses propres adresses (wp-json, wp-login, flux…) et les raccourcis d'administration.
		if ( preg_match( '#^/(wp-|xmlrpc\.php|feed/?$)#', $path ) || in_array( rtrim( $path, '/' ), array( '/admin', '/login', '/dashboard' ), true ) ) {
			return $do_parse;
		}
		if ( '/api/devis' === rtrim( $path, '/' ) ) {
			placo_handle_devis();
		}

		$method = isset( $_SERVER['REQUEST_METHOD'] ) ? strtoupper( $_SERVER['REQUEST_METHOD'] ) : 'GET';
		if ( 'GET' !== $method && 'HEAD' !== $method ) {
			return $do_parse;
		}

		$file = placo_find_file( $path );
		if ( $file ) {
			placo_serve( $file );
		}
		placo_serve_404();
	},
	0
);

/* -------------------------------------------------------------------------
 * Adresses « jolies » indispensables : sans elles, /services ou /realisations
 * ne passent pas par WordPress. Vérifié à l'activation du thème ET à la première
 * visite après chaque mise à jour (remplacer le thème actif ne le « réactive » pas).
 * ---------------------------------------------------------------------- */
function placo_ensure_permalinks() {
	if ( '' === (string) get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
	}
	// Hors administration, ces fonctions ne sont pas chargées : sans elles, .htaccess n'est pas réécrit.
	if ( ! function_exists( 'save_mod_rewrite_rules' ) ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/misc.php';
	}
	flush_rewrite_rules( true );
	update_option( 'placo_rewrite_version', PLACO_VERSION, false );
}
add_action( 'after_switch_theme', 'placo_ensure_permalinks' );
add_action(
	'init',
	function () {
		if ( get_option( 'placo_rewrite_version' ) !== PLACO_VERSION ) {
			placo_ensure_permalinks();
		}
	},
	99
);
