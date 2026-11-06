<?php
/**
 * Page d'accueil one-page PLACO PRO 237.
 */
get_header();
?>

<!-- ============ HERO ============ -->
<section class="hero" id="accueil">
  <div class="container hero-grid">
    <div class="reveal">
      <span class="eyebrow">Plâtrerie · Faux plafonds · Décoration</span>
      <h1>Des intérieurs finis <em>avec précision</em>, du plafond aux murs.</h1>
      <p class="lead">PLACO PRO 237 conçoit et pose vos faux plafonds, cloisons en plaque de plâtre, staff et éclairages intégrés pour maisons, bureaux et commerces à Douala et Yaoundé.</p>
      <div class="hero-actions">
        <a href="#contact" class="btn btn-primary">Demander un devis gratuit
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        <a href="#realisations" class="btn btn-ghost">Voir nos réalisations</a>
      </div>
      <div class="hero-cities">
        <div><b>Douala</b>Interventions</div>
        <div><b>Yaoundé</b>Interventions</div>
        <div><b>Devis</b>Gratuit sur visite</div>
      </div>
    </div>

    <div class="hero-visual reveal">
      <div class="ceiling" aria-hidden="true">
        <!-- Illustration : coupe de faux plafond avec gorge lumineuse -->
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#F4D9A8" stop-opacity=".9"/>
              <stop offset="1" stop-color="#F4D9A8" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#F7F3EC"/><stop offset="1" stop-color="#E7DFD1"/>
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill="url(#wall)"/>
          <!-- plafond -->
          <rect x="0" y="0" width="400" height="70" fill="#FFFFFF"/>
          <rect x="0" y="70" width="400" height="10" fill="#E2D9CA"/>
          <!-- caisson central -->
          <rect x="60" y="80" width="280" height="44" fill="#FFFFFF" stroke="#DDD3C3"/>
          <rect class="led-glow" x="60" y="124" width="280" height="60" fill="url(#glow)"/>
          <rect x="100" y="80" width="200" height="22" fill="#F1ECE3"/>
          <!-- spots -->
          <g fill="#14284B">
            <circle cx="30" cy="76" r="4"/><circle cx="370" cy="76" r="4"/>
          </g>
          <g class="spot-cones" fill="#F4D9A8" opacity=".55">
            <path d="M30 80 L10 300 L50 300 Z"/><path d="M370 80 L350 300 L390 300 Z"/>
          </g>
          <!-- corniche -->
          <path d="M0 80 h400" stroke="#D9620F" stroke-width="2"/>
          <!-- sol -->
          <rect x="0" y="420" width="400" height="80" fill="#D6CCBB"/>
          <!-- banquette -->
          <rect x="90" y="350" width="220" height="70" rx="10" fill="#4B4844"/>
          <rect x="90" y="330" width="220" height="30" rx="10" fill="#3A3835"/>
          <!-- cadre mural -->
          <rect x="150" y="215" width="100" height="70" fill="none" stroke="#14284B" stroke-width="3"/>
          <path d="M155 280 l30 -35 l20 22 l15 -14 l25 27 z" fill="#D9620F"/>
        </svg>
        <span class="tag">Faux plafond · gorge lumineuse LED</span>
      </div>
    </div>
  </div>
</section>

<!-- ============ BANDEAU ATOUTS ============ -->
<div class="strip">
  <div class="container strip-grid">
    <div class="strip-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>Devis détaillé et gratuit</div>
    <div class="strip-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Délais annoncés et respectés</div>
    <div class="strip-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>Finitions soignées</div>
    <div class="strip-item"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14"/></svg>Chantier propre et rangé</div>
  </div>
</div>

<!-- ============ SERVICES ============ -->
<section id="services">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Nos services</span>
      <h2>Un seul interlocuteur pour vos travaux de plâtrerie et de finition</h2>
      <p>De l'étude à la livraison, nous prenons en charge chaque étape pour un résultat propre, durable et à votre goût.</p>
    </div>
    <div class="services-grid">
      <article class="card reveal">
        <div class="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 6h20M4 6v3h16V6M7 9v2M17 9v2"/><circle cx="7" cy="13" r="1.5"/><circle cx="17" cy="13" r="1.5"/></svg></div>
        <h3>Faux plafonds</h3>
        <p>Plafonds suspendus en plaque de plâtre, plats ou à caissons, adaptés aux salons, chambres, bureaux et commerces.</p>
        <ul><li>Plafonds à caissons et à niveaux</li><li>Gorges lumineuses LED</li><li>Spots encastrés</li></ul>
      </article>
      <article class="card reveal">
        <div class="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18"/><path d="M12 3v18M3 12h9"/></svg></div>
        <h3>Cloisons & doublages</h3>
        <p>Cloisons en plaque de plâtre pour créer ou redistribuer des espaces rapidement, sans gros œuvre.</p>
        <ul><li>Cloisons de séparation</li><li>Doublage de murs</li><li>Isolation phonique et thermique</li></ul>
      </article>
      <article class="card reveal">
        <div class="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7c3-3 6 3 9 0s6 3 9 0M3 12c3-3 6 3 9 0s6 3 9 0"/><path d="M3 17h18"/></svg></div>
        <h3>Staff & corniches</h3>
        <p>Moulures, corniches, rosaces et éléments décoratifs pour donner du caractère à vos plafonds et murs.</p>
        <ul><li>Corniches et moulures</li><li>Rosaces décoratives</li><li>Habillage de poutres</li></ul>
      </article>
      <article class="card reveal">
        <div class="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg></div>
        <h3>Éclairage intégré</h3>
        <p>Intégration des spots, rubans LED et luminaires directement dans les ouvrages en plâtre pour une ambiance sur mesure.</p>
        <ul><li>Rubans LED en gorge</li><li>Spots et downlights</li><li>Mise en valeur d'éléments</li></ul>
      </article>
      <article class="card reveal">
        <div class="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20h16M6 20V10h12v10M9 10V6h6v4"/></svg></div>
        <h3>Décoration intérieure</h3>
        <p>Niches murales, meubles TV en plâtre, têtes de lit, habillages et agencements décoratifs.</p>
        <ul><li>Niches et étagères intégrées</li><li>Meubles TV et têtes de lit</li><li>Conseil en aménagement</li></ul>
      </article>
      <article class="card reveal">
        <div class="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 2l4 4-12 12H6v-4z"/><path d="M2 22h20"/></svg></div>
        <h3>Enduits & peinture</h3>
        <p>Bandes, enduits, ponçage et mise en peinture pour une finition prête à vivre.</p>
        <ul><li>Bandes et joints</li><li>Enduits de finition</li><li>Peinture intérieure</li></ul>
      </article>
    </div>
  </div>
</section>

<!-- ============ À PROPOS ============ -->
<section class="about" id="apropos">
  <div class="container about-grid">
    <div class="about-visual reveal">
      <figure class="tall"><?php placo_img( 'plafond_14.jpg', 'Séjour avec plafond à caissons superposés et corniches LED', 'eager' ); ?></figure>
      <figure><?php placo_img( 'plafond_16.jpg', 'Encadrement mural en staff et corniche décorative' ); ?></figure>
      <figure><?php placo_img( 'plafond_13.jpg', 'Caisson central avec motif LED et gorge lumineuse' ); ?></figure>
    </div>
    <div class="reveal">
      <span class="eyebrow">À propos</span>
      <h2>Le savoir-faire du plâtre, au service de vos espaces</h2>
      <p>PLACO PRO 237 est une entreprise camerounaise spécialisée dans la plâtrerie et la décoration intérieure. Nous intervenons à Douala et à Yaoundé, chez les particuliers comme auprès des professionnels.</p>
      <p>Notre approche est simple : écouter votre projet, vous proposer une solution claire et chiffrée, puis l'exécuter avec rigueur jusqu'à la dernière finition.</p>
      <div class="values">
        <div class="value"><b>Précision</b><span>Des lignes droites, des angles nets, des joints invisibles.</span></div>
        <div class="value"><b>Transparence</b><span>Un devis détaillé, sans frais cachés.</span></div>
        <div class="value"><b>Fiabilité</b><span>Un planning annoncé et suivi.</span></div>
        <div class="value"><b>Créativité</b><span>Des propositions adaptées à votre style.</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ MÉTHODE ============ -->
<section id="methode">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Notre méthode</span>
      <h2>Comment se déroule votre projet</h2>
    </div>
    <div class="steps">
      <div class="step reveal"><h3>Prise de contact</h3><p>Vous nous décrivez votre besoin par téléphone, WhatsApp ou via le formulaire.</p></div>
      <div class="step reveal"><h3>Visite & mesures</h3><p>Nous passons sur place pour prendre les mesures et comprendre vos attentes.</p></div>
      <div class="step reveal"><h3>Devis & design</h3><p>Vous recevez un devis détaillé et une proposition de design à valider.</p></div>
      <div class="step reveal"><h3>Réalisation</h3><p>Pose, finitions, nettoyage du chantier et réception des travaux avec vous.</p></div>
    </div>
  </div>
</section>

<!-- ============ RÉALISATIONS ============ -->
<section id="realisations" style="padding-top:0">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Réalisations</span>
      <h2>Quelques projets</h2>
      <p>Une sélection de faux plafonds, éclairages intégrés et décorations réalisés par nos équipes. Cliquez sur une photo pour l'agrandir.</p>
    </div>
    <div class="filters" role="tablist">
      <button class="filter active" data-filter="all">Tout</button>
      <?php foreach ( placo_gallery_categories() as $placo_key => $placo_label ) : ?>
        <button class="filter" data-filter="<?php echo esc_attr( $placo_key ); ?>"><?php echo esc_html( $placo_label ); ?></button>
      <?php endforeach; ?>
    </div>
    <div class="gallery" id="gallery">
      <?php
      $placo_cats = placo_gallery_categories();
      foreach ( placo_gallery() as $placo_i => $placo_item ) :
          $placo_url = placo_img_url( $placo_item['file'] );
          ?>
        <div class="work reveal<?php echo $placo_i >= 9 ? ' extra' : ''; ?>" data-cat="<?php echo esc_attr( $placo_item['cat'] ); ?>" data-full="<?php echo esc_url( $placo_url ); ?>" data-title="<?php echo esc_attr( $placo_item['title'] ); ?>" tabindex="0">
          <div class="work-img"><?php placo_img( $placo_item['file'], $placo_item['alt'] ); ?></div>
          <div class="work-info"><small><?php echo esc_html( $placo_cats[ $placo_item['cat'] ] ?? '' ); ?></small><h3><?php echo esc_html( $placo_item['title'] ); ?></h3></div>
        </div>
      <?php endforeach; ?>
    </div>
    <?php if ( count( placo_gallery() ) > 9 ) : ?>
      <div class="more-wrap" id="moreWrap"><button class="btn btn-ghost" id="moreBtn">Voir toutes les réalisations (<?php echo (int) count( placo_gallery() ); ?>)</button></div>
    <?php endif; ?>
  </div>
</section>

<!-- ============ ZONES ============ -->
<section class="zones">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow" style="color:var(--gold)">Zones d'intervention</span>
      <h2>Présents à Douala et à Yaoundé</h2>
      <p>Pour un chantier hors de ces villes, contactez-nous : nous étudions chaque demande.</p>
    </div>
    <div class="zones-grid">
      <div class="zone reveal"><h3>Douala</h3><p>Particuliers, bureaux, commerces, hôtels et restaurants.</p></div>
      <div class="zone reveal"><h3>Yaoundé</h3><p>Particuliers, bureaux, commerces, hôtels et restaurants.</p></div>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section id="faq">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Questions fréquentes</span>
      <h2>Vous vous demandez peut-être…</h2>
    </div>
    <div class="faq-list reveal">
      <details><summary>Le devis est-il vraiment gratuit ?</summary><p>Oui. Après une visite et la prise de mesures, nous vous remettons un devis détaillé, sans engagement.</p></details>
      <details><summary>Combien de temps durent les travaux ?</summary><p>Cela dépend de la surface et de la complexité du design. Le délai est précisé dans le devis, avant tout démarrage.</p></details>
      <details><summary>Fournissez-vous les matériaux ?</summary><p>Oui, nous pouvons fournir l'ensemble des matériaux (plaques, ossatures, enduits, éclairages) ou travailler avec ceux que vous avez déjà achetés.</p></details>
      <details><summary>Travaillez-vous pour les entreprises ?</summary><p>Oui : bureaux, boutiques, hôtels, restaurants et autres locaux professionnels.</p></details>
      <details><summary>Le faux plafond résiste-t-il à l'humidité ?</summary><p>Pour les pièces humides (salles de bain, cuisines), nous utilisons des plaques hydrofuges adaptées.</p></details>
    </div>
  </div>
</section>

<!-- ============ CONTACT ============ -->
<section id="contact" style="background:var(--plaster-2)">
  <div class="container contact-grid">
    <div class="contact-info reveal">
      <span class="eyebrow">Contact</span>
      <h2>Parlons de votre projet</h2>
      <p>Décrivez-nous vos travaux : nous vous recontactons pour organiser une visite et établir votre devis.</p>
      <div class="info-line"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg><div><b>Téléphone / WhatsApp</b><a href="tel:<?php echo esc_attr( placo_opt( 'phone_tel' ) ); ?>" id="phoneLink"><?php echo esc_html( placo_opt( 'phone_display' ) ); ?></a></div></div>
      <div class="info-line"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg><div><b>E-mail</b><a href="mailto:<?php echo antispambot( placo_opt( 'email' ) ); ?>"><?php echo antispambot( placo_opt( 'email' ) ); ?></a></div></div>
      <div class="info-line"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><div><b>Zones</b>Douala · Yaoundé</div></div>
      <div class="info-line"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><div><b>Horaires</b><?php echo esc_html( placo_opt( 'hours' ) ); ?></div></div>
    </div>

    <form id="quoteForm" class="reveal" novalidate>
      <div class="row">
        <div><label for="name">Nom complet *</label><input id="name" required placeholder="Votre nom"></div>
        <div><label for="phone">Téléphone *</label><input id="phone" type="tel" required placeholder="+237 …"></div>
      </div>
      <div class="row">
        <div><label for="city">Ville *</label>
          <select id="city" required><option value="">Choisir…</option><option>Douala</option><option>Yaoundé</option><option>Autre</option></select></div>
        <div><label for="service">Type de travaux *</label>
          <select id="service" required><option value="">Choisir…</option><option>Faux plafond</option><option>Cloisons / doublage</option><option>Staff & corniches</option><option>Éclairage intégré</option><option>Décoration intérieure</option><option>Enduits & peinture</option><option>Autre</option></select></div>
      </div>
      <label for="msg">Votre projet</label>
      <textarea id="msg" placeholder="Pièce(s) concernée(s), surface approximative, style souhaité…"></textarea>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary" data-via="whatsapp">Envoyer via WhatsApp</button>
        <button type="submit" class="btn btn-ghost" data-via="email">Envoyer par e-mail</button>
      </div>
      <p class="form-msg" id="formMsg" role="status"></p>
    </form>
  </div>
</section>

<?php get_footer();
