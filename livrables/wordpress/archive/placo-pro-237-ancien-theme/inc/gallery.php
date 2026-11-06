<?php
/**
 * Liste des photos de la galerie « Réalisations ».
 *
 * POUR AJOUTER UNE PHOTO :
 *   1. Copiez le fichier .jpg dans  assets/images/realisations/
 *   2. Ajoutez une ligne ci-dessous (l'ordre des lignes = l'ordre d'affichage).
 *   Catégories possibles : salon, chambre, repas, eau, deco, autre
 *
 * @package placo-pro-237
 */

defined( 'ABSPATH' ) || exit;

function placo_gallery_categories() {
    return array(
        'salon'   => 'Salons & séjours',
        'chambre' => 'Chambres & dressings',
        'repas'   => 'Salles à manger',
        'eau'     => "Salles d'eau",
        'deco'    => 'Décoration & staff',
        'autre'   => 'Autres espaces',
    );
}

function placo_gallery() {
    $items = array(
        array( 'file' => 'plafond_02.jpg', 'cat' => 'salon', 'title' => 'Salon — caisson LED et suspension circulaire', 'alt' => 'Salon avec faux plafond à caisson, lignes LED et suspension circulaire' ),
        array( 'file' => 'plafond_14.jpg', 'cat' => 'salon', 'title' => 'Séjour — caissons superposés et rosace', 'alt' => 'Séjour avec plafond à caissons superposés, corniches LED et rosace' ),
        array( 'file' => 'plafond_10.jpg', 'cat' => 'deco', 'title' => 'Mur TV — arche lumineuse et niches', 'alt' => 'Mur TV en plâtre avec arche lumineuse, niches éclairées et plafond circulaire' ),
        array( 'file' => 'salon-caissons-arrondis-lustre.jpg', 'cat' => 'salon', 'title' => 'Salon — caissons arrondis et lustre cristal', 'alt' => 'Salon avec faux plafond à caissons arrondis, gorges LED, spots et lustre en cristal' ),
        array( 'file' => 'chambre-cercles-concentriques.jpg', 'cat' => 'chambre', 'title' => 'Chambre — cercles concentriques lumineux', 'alt' => 'Plafond à cercles concentriques lumineux avec spots, au-dessus d\'une tête de lit éclairée' ),
        array( 'file' => 'salle-a-manger-caisson-circulaire.jpg', 'cat' => 'repas', 'title' => 'Salle à manger — caisson circulaire lumineux', 'alt' => 'Salle à manger avec grand caisson circulaire, gorge LED et lustre boule' ),
        array( 'file' => 'plafond_16.jpg', 'cat' => 'deco', 'title' => 'Décoration — encadrement en staff', 'alt' => 'Encadrement mural en staff et corniche décorative' ),
        array( 'file' => 'salle-de-bain-lignes-led.jpg', 'cat' => 'eau', 'title' => 'Salle de bain — lignes LED en plafond hydrofuge', 'alt' => 'Salle de bain avec plafond hydrofuge et lignes LED géométriques' ),
        array( 'file' => 'plafond_13.jpg', 'cat' => 'salon', 'title' => 'Salon — caisson central à motif LED', 'alt' => 'Caisson central avec motif LED et gorge lumineuse chaude' ),
        array( 'file' => 'plafond_01.jpg', 'cat' => 'chambre', 'title' => 'Chambre — caisson plat et spots', 'alt' => 'Faux plafond plat avec gorge lumineuse et spots encastrés' ),
        array( 'file' => 'plafond_03.jpg', 'cat' => 'autre', 'title' => 'Plafond — motifs géométriques lumineux', 'alt' => 'Plafond à motifs géométriques lumineux en plâtre' ),
        array( 'file' => 'plafond_04.jpg', 'cat' => 'salon', 'title' => 'Séjour — plafond à décrochés et anneaux', 'alt' => 'Faux plafond à décrochés avec spots et suspension à anneaux' ),
        array( 'file' => 'salon-double-caisson-lustre.jpg', 'cat' => 'salon', 'title' => 'Salon — double caisson carré et lustre', 'alt' => 'Plafond à double caisson carré avec gorge lumineuse chaude et lustre' ),
        array( 'file' => 'salle-a-manger-suspensions.jpg', 'cat' => 'repas', 'title' => 'Salle à manger — double caisson et suspensions', 'alt' => 'Salle à manger avec double caisson lumineux, spots et suspensions dorées' ),
        array( 'file' => 'dressing-lignes-led.jpg', 'cat' => 'chambre', 'title' => 'Dressing — lignes LED et gorge périphérique', 'alt' => 'Plafond de dressing avec lignes LED en décalé et gorge lumineuse' ),
        array( 'file' => 'plafond_07.jpg', 'cat' => 'salon', 'title' => 'Salon — caisson et lignes LED croisées', 'alt' => 'Caisson lumineux avec lignes LED croisées' ),
        array( 'file' => 'plafond_08.jpg', 'cat' => 'chambre', 'title' => 'Chambre — profilés LED et spots', 'alt' => 'Plafond avec profilés LED encastrés et spots' ),
        array( 'file' => 'salle-d-eau-lignes-gorge.jpg', 'cat' => 'eau', 'title' => 'Salle d\'eau — lignes LED et gorge chaude', 'alt' => 'Salle d\'eau avec lignes LED blanches et gorge lumineuse chaude' ),
        array( 'file' => 'plafond_11.jpg', 'cat' => 'autre', 'title' => 'Appartement — gorge LED et lignes lumineuses', 'alt' => 'Pièce avec faux plafond, gorge LED et lignes lumineuses' ),
        array( 'file' => 'plafond_12.jpg', 'cat' => 'salon', 'title' => 'Salon — gorges lumineuses et suspension', 'alt' => 'Plafond à décroché avec gorges lumineuses et suspension' ),
        array( 'file' => 'sejour-lignes-led.jpg', 'cat' => 'salon', 'title' => 'Séjour ouvert — lignes LED encastrées', 'alt' => 'Séjour et salle à manger avec lignes LED encastrées dans un plafond plat' ),
        array( 'file' => 'plafond_15.jpg', 'cat' => 'chambre', 'title' => 'Chambre — lignes LED géométriques', 'alt' => 'Plafond avec lignes LED géométriques' ),
        array( 'file' => 'plafond_17.jpg', 'cat' => 'autre', 'title' => 'Hall d\'entrée — caissons lumineux', 'alt' => 'Hall avec plafond à caissons lumineux et spots' ),
        array( 'file' => 'bibliotheque-caisson-spots.jpg', 'cat' => 'autre', 'title' => 'Bureau-bibliothèque — caisson suspendu et spots', 'alt' => 'Bureau-bibliothèque avec caisson suspendu, spots décoratifs et gorge LED blanche' ),
        array( 'file' => 'plafond_18.jpg', 'cat' => 'autre', 'title' => 'Couloir — gorge LED et spots', 'alt' => 'Couloir avec gorge lumineuse LED et spots encastrés' ),
        array( 'file' => 'plafond_19.jpg', 'cat' => 'salon', 'title' => 'Séjour — caisson et spots encastrés', 'alt' => 'Faux plafond à caisson avec gorge LED et spots' ),
        array( 'file' => 'plafond_20.jpg', 'cat' => 'chambre', 'title' => 'Chambre — caisson lumineux et suspension', 'alt' => 'Caisson lumineux avec suspension à anneaux et spots carrés' ),
        array( 'file' => 'plafond-lignes-led-angle.jpg', 'cat' => 'autre', 'title' => 'Plafond — lignes LED en angle', 'alt' => 'Plafond plat avec profilés LED en angle et gorge périphérique' ),
        array( 'file' => 'plafond_06.jpg', 'cat' => 'autre', 'title' => 'Salon — lignes LED en cours de finition', 'alt' => 'Plafond avec lignes LED et spots, en cours de finition' ),
        array( 'file' => 'plafond_09.jpg', 'cat' => 'autre', 'title' => 'Chantier — profilés LED avant peinture', 'alt' => 'Profilés LED encastrés dans un plafond avant peinture' ),
    );
    return apply_filters( 'placo_gallery', $items );
}
