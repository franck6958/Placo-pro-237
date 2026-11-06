<?php
/**
 * En-tête du thème PLACO PRO 237.
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php if ( is_front_page() ) : ?>
<meta name="description" content="<?php echo esc_attr( placo_opt( 'meta_description' ) ); ?>">
<?php endif; ?>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="preloader" aria-hidden="true">
  <div class="pl-inner">
    <svg class="pl-mark" viewBox="0 0 185 200">
      <rect class="r1" style="--i:0" x="0" y="0" width="44" height="200" fill="#14284B"/>
      <rect class="r2" style="--i:1" x="53" y="0" width="132" height="43" fill="#14284B"/>
      <rect class="r3" style="--i:2" x="142" y="52" width="43" height="44" fill="#14284B"/>
      <rect class="r4" style="--i:3" x="53" y="104" width="132" height="44" fill="#4B4844"/>
      <rect class="r5" style="--i:4" x="142" y="157" width="43" height="43" fill="#D9620F"/>
    </svg>
    <div class="pl-bar"><span></span></div>
  </div>
</div>
<a class="screen-reader-text" href="#contenu">Aller au contenu</a>
<!-- ============ EN-TÊTE ============ -->
<header id="header">
  <div class="container nav">
    <?php placo_logo(); ?>
    <nav class="nav-links" id="navLinks">
      <a href="<?php echo esc_url( home_url( '/#services' ) ); ?>">Services</a>
      <a href="<?php echo esc_url( home_url( '/#apropos' ) ); ?>">À propos</a>
      <a href="<?php echo esc_url( home_url( '/#methode' ) ); ?>">Méthode</a>
      <a href="<?php echo esc_url( home_url( '/#realisations' ) ); ?>">Réalisations</a>
      <a href="<?php echo esc_url( home_url( '/#faq' ) ); ?>">FAQ</a>
      <a href="<?php echo esc_url( home_url( '/#contact' ) ); ?>">Contact</a>
    </nav>
    <a href="<?php echo esc_url( home_url( '/#contact' ) ); ?>" class="btn btn-primary nav-cta">Devis gratuit</a>
    <button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>

<main id="contenu">
