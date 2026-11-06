<?php
/**
 * Fonctions du thème PLACO PRO 237.
 *
 * @package placo-pro-237
 */

defined( 'ABSPATH' ) || exit;

define( 'PLACO_VERSION', '1.2.0' );

require_once get_template_directory() . '/inc/gallery.php';

/* -------------------------------------------------------------------------
 * Réglages du thème
 * ---------------------------------------------------------------------- */
add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'responsive-embeds' );
} );

/** Titre de l'onglet sur la page d'accueil. */
add_filter( 'pre_get_document_title', function ( $title ) {
	if ( is_front_page() ) {
		return 'PLACO PRO 237 — Plâtrerie, faux plafonds & décoration intérieure | Douala · Yaoundé';
	}
	return $title;
} );

/* -------------------------------------------------------------------------
 * Coordonnées (modifiables dans Apparence > Personnaliser)
 * ---------------------------------------------------------------------- */
function placo_defaults() {
	return array(
		'phone_display'    => '+237 672 840 122',
		'phone_tel'        => '+237672840122',
		'whatsapp'         => '237672840122',
		'email'            => 'contact@placopro237.com',
		'hours'            => 'Lun – Sam · 8h – 18h',
		'meta_description' => 'PLACO PRO 237 : faux plafonds, cloisons en plaque de plâtre, staff, corniches, éclairage intégré et décoration intérieure à Douala et Yaoundé. Devis gratuit.',
	);
}

function placo_opt( $key ) {
	$defaults = placo_defaults();
	$value    = get_theme_mod( 'placo_' . $key, $defaults[ $key ] ?? '' );
	return '' === $value ? ( $defaults[ $key ] ?? '' ) : $value;
}

function placo_whatsapp_url( $text = '' ) {
	$num = preg_replace( '/\D+/', '', placo_opt( 'whatsapp' ) );
	return 'https://wa.me/' . $num . ( $text ? '?text=' . rawurlencode( $text ) : '' );
}

add_action( 'customize_register', function ( $wp_customize ) {
	$wp_customize->add_section( 'placo_contact', array(
		'title'    => 'Coordonnées PLACO PRO 237',
		'priority' => 30,
	) );

	$fields = array(
		'phone_display'    => array( 'Téléphone affiché', 'Ex. : +237 672 840 122', 'sanitize_text_field' ),
		'phone_tel'        => array( 'Téléphone (lien d\'appel)', 'Sans espaces, ex. : +237672840122', 'sanitize_text_field' ),
		'whatsapp'         => array( 'Numéro WhatsApp', 'Format international sans + ni espaces, ex. : 237672840122', 'sanitize_text_field' ),
		'email'            => array( 'E-mail', '', 'sanitize_email' ),
		'hours'            => array( 'Horaires', '', 'sanitize_text_field' ),
		'meta_description' => array( 'Description Google (page d\'accueil)', '150 à 160 caractères conseillés', 'sanitize_textarea_field' ),
	);
	$defaults = placo_defaults();

	foreach ( $fields as $key => $f ) {
		$wp_customize->add_setting( 'placo_' . $key, array(
			'default'           => $defaults[ $key ],
			'sanitize_callback' => $f[2],
		) );
		$wp_customize->add_control( 'placo_' . $key, array(
			'label'       => $f[0],
			'description' => $f[1],
			'section'     => 'placo_contact',
			'type'        => 'meta_description' === $key ? 'textarea' : 'text',
		) );
	}
} );

/* -------------------------------------------------------------------------
 * Styles et scripts
 * ---------------------------------------------------------------------- */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style(
		'placo-fonts',
		'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'placo-style', get_stylesheet_uri(), array( 'placo-fonts' ), PLACO_VERSION );

	wp_enqueue_style( 'placo-animations', get_template_directory_uri() . '/assets/css/animations.css', array( 'placo-style' ), PLACO_VERSION );
	wp_enqueue_script( 'placo-main', get_template_directory_uri() . '/assets/js/main.js', array(), PLACO_VERSION, true );
	wp_enqueue_script( 'placo-animations', get_template_directory_uri() . '/assets/js/animations.js', array( 'placo-main' ), PLACO_VERSION, true );
	wp_localize_script( 'placo-main', 'PLACO_CONFIG', array(
		'whatsapp' => preg_replace( '/\D+/', '', placo_opt( 'whatsapp' ) ),
		'email'    => placo_opt( 'email' ),
	) );
} );

/** Préconnexion aux polices Google. */
add_filter( 'wp_resource_hints', function ( $urls, $relation ) {
	if ( 'preconnect' === $relation ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array( 'href' => 'https://fonts.gstatic.com', 'crossorigin' );
	}
	return $urls;
}, 10, 2 );

/* -------------------------------------------------------------------------
 * Images du thème
 * ---------------------------------------------------------------------- */
function placo_img_url( $file ) {
	return get_template_directory_uri() . '/assets/images/realisations/' . rawurlencode( $file );
}

/** Affiche une image de la galerie avec ses dimensions (évite les décalages au chargement). */
function placo_img( $file, $alt = '', $loading = 'lazy' ) {
	$path = get_template_directory() . '/assets/images/realisations/' . $file;
	$size = file_exists( $path ) ? @getimagesize( $path ) : false;
	printf(
		'<img src="%s" alt="%s"%s loading="%s" decoding="async">',
		esc_url( placo_img_url( $file ) ),
		esc_attr( $alt ),
		$size ? sprintf( ' width="%d" height="%d"', (int) $size[0], (int) $size[1] ) : '',
		esc_attr( $loading )
	);
}

/* -------------------------------------------------------------------------
 * Logo officiel (SVG vectoriel, net à toutes les tailles)
 * ---------------------------------------------------------------------- */
function placo_logo( $invert = false ) {
	// Couleurs : bleu nuit, gris, orange, séparateur. Variante claire pour fond sombre.
	$c = $invert
		? array( '#F5F1EA', '#B9B3A8', '#E8701C', 'rgba(245,241,234,.4)' )
		: array( '#14284B', '#4B4844', '#D9620F', '#93918F' );
	$body = sprintf(
		'<rect x="0" y="0" width="44" height="200" fill="%1$s"/><rect x="53" y="0" width="132" height="43" fill="%1$s"/><rect x="142" y="52" width="43" height="44" fill="%1$s"/><rect x="53" y="104" width="132" height="44" fill="%2$s"/><rect x="142" y="157" width="43" height="43" fill="%3$s"/>'
		. '<text x="241" y="106" font-size="104" font-weight="800" fill="%1$s" textLength="373" lengthAdjust="spacingAndGlyphs">PLACO</text>'
		. '<text x="641" y="106" font-size="104" font-weight="800" fill="%2$s" textLength="236" lengthAdjust="spacingAndGlyphs">PRO</text>'
		. '<text x="241" y="171" font-size="43" font-weight="800" fill="%3$s" textLength="83" lengthAdjust="spacingAndGlyphs">237</text>'
		. '<rect x="344" y="139" width="3" height="34" fill="%4$s"/>'
		. '<text x="367" y="162" font-size="16.5" font-weight="600" fill="%2$s" textLength="499" lengthAdjust="spacing">PLÂTRERIE · AMÉNAGEMENT INTÉRIEUR</text>',
		$c[0], $c[1], $c[2], $c[3]
	);
	printf(
		'<a href="%s" class="logo" aria-label="PLACO PRO 237 — Plâtrerie · Aménagement intérieur — accueil"><svg class="logo-svg" viewBox="0 0 872 200" aria-hidden="true">%s</svg></a>',
		esc_url( home_url( '/' ) ),
		$body // Contenu statique défini ci-dessus.
	);
}

/** Favicon : monogramme du logo (si aucune icône n'est définie dans Personnaliser > Identité du site). */
add_action( 'wp_head', function () {
	if ( ! has_site_icon() ) {
		printf( '<link rel="icon" type="image/svg+xml" href="%s">' . "
", esc_url( get_template_directory_uri() . '/assets/images/icon.svg' ) );
	}
} );

/**
 * Démarrage des animations, exécuté avant l'affichage de la page :
 * écran d'introduction à la 1re visite de la session, avec sécurités si un script ne charge pas.
 */
add_action( 'wp_head', function () {
	?>
<script>(function(d){var c=d.documentElement.classList,s=null;c.add('anim');window.PLACO_T0=Date.now();
try{s=sessionStorage.getItem('placoIntro')}catch(e){}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!s&&d.body===null){c.add('show-preloader','is-loading');
setTimeout(function(){c.add('preloader-done');c.remove('is-loading')},4500);setTimeout(function(){c.remove('show-preloader')},5600)}
setTimeout(function(){[].forEach.call(d.querySelectorAll('.hero .reveal'),function(e){e.classList.add('visible')})},5000)})(document);</script>
	<?php
}, 1 );
