</main>

<!-- ============ PIED DE PAGE ============ -->
<footer>
  <div class="container">
    <div class="foot-grid">
      <div>
        <?php placo_logo( true ); ?>
        <p style="margin-top:16px;max-width:320px">Plâtrerie, faux plafonds et décoration intérieure à Douala et Yaoundé.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul><li><a href="<?php echo esc_url( home_url( '/#services' ) ); ?>">Faux plafonds</a></li><li><a href="<?php echo esc_url( home_url( '/#services' ) ); ?>">Cloisons</a></li><li><a href="<?php echo esc_url( home_url( '/#services' ) ); ?>">Staff & corniches</a></li><li><a href="<?php echo esc_url( home_url( '/#services' ) ); ?>">Décoration</a></li></ul>
      </div>
      <div>
        <h4>Navigation</h4>
        <ul><li><a href="<?php echo esc_url( home_url( '/#apropos' ) ); ?>">À propos</a></li><li><a href="<?php echo esc_url( home_url( '/#realisations' ) ); ?>">Réalisations</a></li><li><a href="<?php echo esc_url( home_url( '/#faq' ) ); ?>">FAQ</a></li><li><a href="<?php echo esc_url( home_url( '/#contact' ) ); ?>">Devis gratuit</a></li></ul>
      </div>
    </div>
    <div class="copy" style="justify-content:center;text-align:center">
      <span>Copyright © <?php echo esc_html( date_i18n( 'Y' ) ); ?> | Placo-pro-237 Tous Droits Réservés | Developed By ING Franck Junior MENOUNGA</span>
    </div>
  </div>
</footer>

<a href="<?php echo esc_url( placo_whatsapp_url( 'Bonjour PLACO PRO 237, je souhaite un devis.' ) ); ?>" class="wa" id="waFloat" aria-label="Nous écrire sur WhatsApp" target="_blank" rel="noopener">
  <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7A11.8 11.8 0 0 0 24 12c0-3.2-1.2-6.2-3.5-8.5z"/></svg>
</a>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo agrandie">
  <button class="lb-btn lb-close" id="lbClose" aria-label="Fermer">&times;</button>
  <button class="lb-btn lb-prev" id="lbPrev" aria-label="Photo précédente">&#8249;</button>
  <img id="lbImg" src="" alt="">
  <p id="lbCap"></p>
  <button class="lb-btn lb-next" id="lbNext" aria-label="Photo suivante">&#8250;</button>
</div>

<?php wp_footer(); ?>
</body>
</html>
