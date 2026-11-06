<?php
/**
 * Modèle par défaut : articles, pages, archives, recherche.
 * (La page d'accueil utilise front-page.php.)
 *
 * @package placo-pro-237
 */

get_header();
?>

<section class="wp-page">
	<div class="container">
		<div class="entry">
			<?php if ( have_posts() ) : ?>
				<?php if ( ! is_singular() ) : ?>
					<span class="eyebrow"><?php echo is_search() ? 'Recherche' : 'Actualités'; ?></span>
				<?php endif; ?>

				<?php while ( have_posts() ) : the_post(); ?>
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
						<?php if ( is_singular() ) : ?>
							<h1><?php the_title(); ?></h1>
						<?php else : ?>
							<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<?php endif; ?>

						<?php if ( has_post_thumbnail() ) : ?>
							<div style="margin:20px 0;border-radius:14px;overflow:hidden"><?php the_post_thumbnail( 'large' ); ?></div>
						<?php endif; ?>

						<div class="entry-content">
							<?php is_singular() ? the_content() : the_excerpt(); ?>
						</div>
					</article>
				<?php endwhile; ?>

				<?php the_posts_pagination(); ?>
			<?php else : ?>
				<h1>Page introuvable</h1>
				<div class="entry-content"><p>Le contenu demandé n'existe pas ou a été déplacé.</p></div>
				<p><a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">Retour à l'accueil</a></p>
			<?php endif; ?>
		</div>
	</div>
</section>

<?php
get_footer();
