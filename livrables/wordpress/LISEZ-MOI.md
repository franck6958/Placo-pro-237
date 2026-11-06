# PLACO PRO 237 : mise en ligne sur WordPress (version 2.2.0)

Cette version installe sur WordPress **exactement le même site** que la version locale (http://localhost:3000) : mêmes pages, même design, mêmes animations, même galerie et même formulaire de devis.

Le site est livré en **4 fichiers zip de moins de 2 Mo chacun** :

| Fichier | Contenu |
|---|---|
| `placo-pro-237.zip` | le thème : toutes les pages, le design, les scripts, les polices |
| `placo-pro-237-photos-1.zip` | photos des réalisations (1/3) |
| `placo-pro-237-photos-2.zip` | photos des réalisations (2/3) |
| `placo-pro-237-photos-3.zip` | photos des réalisations (3/3) |

---

## 1. Installer le thème

1. Dans l'administration WordPress : **Apparence › Thèmes › Ajouter › Téléverser un thème**
2. Choisissez `placo-pro-237.zip`, puis cliquez sur **Installer maintenant**
3. Si WordPress indique que le thème existe déjà, cliquez sur **Remplacer le thème actif par la version téléversée**
4. Si le thème n'est pas encore actif, cliquez sur **Activer**

## 2. Téléverser les photos (WordPress vous le propose)

Dès que vous cliquez sur un lien de l'administration après l'installation, WordPress ouvre automatiquement l'écran **Apparence › Photos du site**.
Pour les mises à jour suivantes, un bouton **« Étape suivante : téléverser les photos du site »** apparaît aussi directement sous le message « Thème installé ».

Sur cet écran :

1. Cliquez sur **Choisir les fichiers…** (ou glissez-les dans le cadre)
2. Sélectionnez **les 3 fichiers** `placo-pro-237-photos-1.zip`, `-2.zip` et `-3.zip` **en même temps**, sans les décompresser
3. Ils sont envoyés un par un. Le tableau passe à **✔ Complet** pour chaque fichier.

Tant qu'il manque des photos, un bandeau orange **« Téléverser les photos »** reste affiché en haut de l'administration.
Les photos sont rangées dans `wp-content/uploads/placo-pro-237/` : elles **restent en place lors des prochaines mises à jour du thème**. WordPress ne vous les redemandera que si elles ont changé.

## 3. Vider le cache (très important)

Si une extension de cache est installée (LiteSpeed Cache, WP Super Cache, WP Rocket…), **videz tout le cache** : sinon l'ancien site peut rester affiché.
Dans LiteSpeed Cache, c'est le bouton **Purger tout** dans la barre du haut.
Ensuite, rechargez le site dans votre navigateur avec **Ctrl + F5**.

## 4. Vérifier

- https://placopro237.com/ : la page d'accueil, avec le logo et les couleurs bleu marine et orange
- https://placopro237.com/realisations : la galerie avec ses filtres par pièce
- https://placopro237.com/contact : envoyez une demande de devis de test

> **Une page affiche « Page introuvable » ou une erreur 404 du serveur ?**
> Allez dans **Réglages › Permaliens**, choisissez **Titre de la publication**, puis cliquez sur **Enregistrer**.
> Normalement le thème le fait tout seul à la première visite.

---

## Installation par FTP (si un téléversement est refusé)

Le dossier `dossiers-ftp/` contient les mêmes éléments, déjà décompressés :

- `placo-pro-237/` → à envoyer dans `wp-content/themes/` (en remplaçant l'ancien dossier)
- `placo-pro-237-photos-1/`, `-2/`, `-3/` → à envoyer dans `wp-content/plugins/` (le thème y trouve aussi les photos)

Puis faites les étapes 1.4 et 3 ci-dessus.

---

## Le formulaire de devis

Les demandes envoyées depuis la page Contact arrivent par e-mail à :
- **contact@placopro237.com**, l'adresse affichée sur le site ;
- l'**adresse e-mail d'administration** de WordPress (**Réglages › Général**).

Si les e-mails n'arrivent pas, installez l'extension **WP Mail SMTP** et configurez-la avec la boîte e-mail de votre hébergeur. Le bouton « Envoyer sur WhatsApp » du formulaire fonctionne dans tous les cas.

## L'application Android

Le site propose l'application Android à télécharger : page https://placopro237.com/application et bouton « Télécharger l'APK » en bas de chaque page.
Le fichier `placo-pro-237.apk` est inclus dans le thème, rien d'autre à installer.

- L'application affiche le site en ligne : toute mise à jour du site apparaît aussitôt dans l'application, sans la réinstaller.
- Pour la reconstruire (nouvelle icône, nouveau nom…) : `npm run build:apk`, puis `npm run build:wordpress`.
- **Gardez précieusement** le dossier `placo-pro-237/android-app/signing/` (clé de signature et son mot de passe). Sans lui, les téléphones refuseront d'installer une nouvelle version par-dessus l'ancienne.

## Bon à savoir

- Le contenu du site (textes, photos, téléphone…) **ne se modifie plus dans WordPress**. Il se modifie dans le projet Next.js (`placo-pro-237/`), puis on regénère les zips avec la commande `npm run build:wordpress`. Les nouveaux fichiers arrivent dans ce dossier `wordpress/`.
- L'administration WordPress (`/wp-admin`) fonctionne normalement : extensions, utilisateurs, sauvegardes, etc.
- Les pages créées dans **Pages › Ajouter** ne sont pas affichées, car le site affiche uniquement ses propres pages.
- `robots.txt` et `sitemap.xml` sont fournis : déclarez https://placopro237.com/sitemap.xml dans Google Search Console.
- L'ancien thème (version 1.2.0) est conservé dans `archive/` en cas de besoin.
