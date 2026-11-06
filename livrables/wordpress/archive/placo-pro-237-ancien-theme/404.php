<?php
/**
 * Page 404.
 *
 * @package placo-pro-237
 */

get_header();
?>

<section class="wp-page">
	<div class="container">
		<div class="entry">
			<span class="eyebrow">Erreur 404</span>
			<h1>Cette page n'existe pas</h1>
			<div class="entry-content"><p>Le lien est peut-être erroné ou la page a été déplacée.</p></div>
			<p><a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">Retour à l'accueil</a></p>
		</div>
	</div>
</section>

<?php
get_footer();
