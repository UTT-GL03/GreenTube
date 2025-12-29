# GreenTube: Plateforme de contenu vidéo écoresponsable

## A FAIRE :
- Tableau éco index des scénarios + analyse
- Analyse front local Green IT : video - chaine
- Comparaison service concurrent
- Mettre les bons numéro Tab, Fig, Cf 
- GreenFrame tab + analyse
- Image page final

## Choix du sujet

La consultation de vidéos sur des plateformes de contenu comme **YouTube** ou **Dailymotion** est aujourd’hui une activité quotidienne pour une grande partie de la population.  
Ces plateformes représentent une **part importante du trafic Internet mondial** et donc de la **consommation énergétique du numérique**.

Ce sujet nous semble particulièrement pertinent, car les services de contenu vidéo constituent un **usage central du web moderne**, à la fois informatif, culturel, mais surtout en tant que loisir. De plus, nous sommes tous deux consommateurs de Youtube, et passons plusieurs heures par semaine devant, ce qui nous a conforté dans notre choix.

## Utilité sociale

Les plateformes de vidéos en ligne ont une **utilité sociale forte** :  
- **Éducation** : mise à disposition de cours, tutoriels, documentaires et vulgarisation scientifique.  
- **Information et actualité** : accès à des contenus indépendants (Hugo Decrypte en France par exemple) de manière beaucoup plus abordable pour les jeunes que les médias traditionnels comme les journaux ou la télévision.  
- **Bien-être** : la vidéo est un outil de détente et peut être considéré comme un loisir à part entière.
- **Accessibilité** : elles permettent à chacun, même dans des zones isolées, d’avoir accès à des ressources éducatives et culturelles.

## Effets de la numérisation

La diffusion numérique des contenus vidéo a progressivement remplacé les supports physiques comme les **DVD**, les **CD** ou la **télévision**.
Cette transition a permis de réduire certains impacts liés à la fabrication et au transport de ces supports.  
Mais elle s’est aussi accompagnée d’une **forte hausse de la consommation de données**, notamment avec la généralisation de la **haute définition** et du **visionnage en continu**.

Chaque lecture d’une vidéo fait intervenir une **chaîne d’acteurs énergivores** :  
- Les **serveurs et data centers**, nécessaires pour stocker et diffuser les contenus.  
- Le **réseau Internet**, qui transporte d’importants volumes de données sur de longues distances.  
- Et enfin, les **appareils des utilisateurs**, qui doivent décoder et afficher ces flux, souvent en qualité supérieure à ce que l’écran nécessite réellement.  

## Scénarios d'usage et impacts

Nous faisons l’hypothèse que les plateformes de vidéos en ligne comme **YouTube** ou **Dailymotion** sont consultées plusieurs fois par jour, souvent lors de moments de pause de quelques minutes (pendant les transports, après un repas, avant de dormir, etc.).
Pour cette raison, nous prendrons en compte dans nos scénarios **le visionnage de deux vidéos consécutives**, afin de pouvoir observer l’impact d’un éventuel système de cache ou de mise en mémoire locale.

Nous distinguerons également deux types d’usages :  
- La **navigation aléatoire** à partir de la page d’accueil (consommation de contenu recommandée).  
- La **recherche ciblée** d’une chaîne ou d’un créateur spécifique.

## Scénario : "Lire des vidéos parmi les vidéos à la une"

L'utilisateur se connecte au site grâce à un favori (donc sans passer par un moteur de recherche). Si nécessaire, il se connecte. Puis il consulte les vidéos à la une.
Il choisit une des vidéos et la regarde jusqu'à la fin.
Il revient aux vidéos à la une et les consulte.
Il choisit une autre vidéo et la regarde jusqu'à la fin.

## Scénario : "Lire une vidéo d'un créateur de contenu donnée"

L'utilisateur se connecte au site grâce à un favori (donc sans passer par un moteur de recherche). Si nécessaire, il se connecte. Puis il consulte les vidéos à la une.
Il recherche un créateur de contenu via la barre de recherche.
Il se rend sur la chaine du créateur de contenu.
Il clqieu sur l'onglet "vidéos" du créateur de contenu.
Il choisit une des vidéos et la regarde jusqu'à la fin.

## Impact de l'exécution des scénarios auprès de différents services concurrents

L'EcoIndex d'une page (de A à G) est calculé (sources : [EcoIndex](https://www.ecoindex.fr/comment-ca-marche/), [Octo](https://blog.octo.com/sous-le-capot-de-la-mesure-ecoindex), [GreenIT](https://github.com/cnumr/GreenIT-Analysis/blob/acc0334c712ba68939466c42af1514b5f448e19f/script/ecoIndex.js#L19-L44)) en fonction du positionnement de cette page parmi les pages mondiales concernant :

- le nombre de requêtes lancées,
- le poids des téléchargements,
- le nombre d'éléments du document.

Nous avons choisi de comparer l’impact de nos scénarios sur les services les plus populaires du marché, à savoir YouTube et Dailymotion, ainsi que sur un service utilisant des ressources de manière plus modérée : PodUtt.

| Service | Score (sur 100) | Classe | Détail des mesures
| --- | --: | --: | --:
| Youtube | .. | . 🟥 | […](./benchmark/Youtube/ecoindex-environmental-statement.md)
| Dailymotion | .. | . 🟧 |  […](./benchmark/Daylimotion/ecoindex-environmental-statement.md)
| PodUTT | .. | . 🟥 | […](./benchmark/PodUTT/ecoindex-environmental-statement.md)

Tab.1 : Mesure de l'EcoIndex moyen de services de vidéo en ligne.
<!-- 
Les mesures de l'impact moyen de ces services (cf. Tab.1) révèlent des classes EcoIndex très faibles pour la plupart (E ou F) et médiocres pour certains (D).

Dans le détail, les pages les plus mal classées sont celles qui incluent : 

- une vidéo,
- des traqueurs en très grand nombre (pour la revente de données de consultation à des tiers),
- des publicités en grand nombre.

À l'inverse, le bon classement (B) de certaines pages (rubriques, articles) de Reporterre montre qu'il existe une marge de progression significative à condition d'adopter des pratiques d'éco-conception et un modèle économique permettant de réduire (totalement ou partiellement) le recours à des services tiers de traqueurs et de publicité. -->

## Modèle économique

Comme nous l'avons vu dans la section précédente, parmi les choix de conception ayant le plus d'impact environnemental, la plupart sont directement liés au modèle économique du service. C'est pourquoi il est nécessaire à ce stade d'analyser leur modèle économique et de définir notre propre modèle permettant une conception plus frugale.

| Service | Visiteur anonyme | Abonné
| --- | --- | ---
| YouTube | <ul><li>Publicités </li><li>Suivi comportemental massif</li></ul> | <ul><li>Sans publicité</li><li>Lecture en arrière-plan</li><li>YouTube Music Premium</li></ul>
| Dailymotion | <ul><li>Publicités (régie tierce et interne)</li><li>Suivi et algorithmes de recommandation</li></ul> | <ul><li>Offres entreprises (B2B)</li><li>Accès sans publicité (selon partenaire)</li></ul>
| PodUTT | <ul><li>Visionnage libre</li><li>Pas de publicité</li><li>Pas de suivi</li></ul> | Sans objet (service universitaire/libre)

Tab. 2 : Offre des services de vidéo en ligne.

Les offres de service numérique de vidéo (cf. Tab. 2) reposent majoritairement sur un modèle de captation de l'attention pour maximiser les revenus publicitaires :
- un accès gratuit financé par une publicité omniprésente et énergivore
- un accès "Premium" payant permettant de supprimer la publicité et d'ajouter des fonctionnalités de confort.

Sur Youtube, on peut rencontrer différents types de pub : 
  - In-Stream désactivable : Pub classique qu'on peut ignorer après 5s, payée seulement si vue 30s+.
  - In-Stream non désactivable : Pub de 15s obligatoire avant la vidéo, revenus garantis car impossible à passer.
  - Bumper : Format éclair de 6s non désactivable, idéal pour la répétition à faible coût.
  - In-Feed (Discovery) : Vignette suggérée en recherche ou accueil, payée uniquement si l'utilisateur clique.
  - Masthead : Bannière géante en haut de l'accueil YouTube, louée à prix d'or pour 24h.

| Format | Durée | Ignorable ? | Tarification | Coût Annonceur (Moyen) | Part de YouTube (45%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **InStream désactivable** | 15s à 3min | Oui | CPV (par vue) | 0,05 € / vue | **0,0225 €** |
| **InStream non désactivable** | Max 15s | Non | CPM (1000 impr.) | 8,00 € / 1k | **3,60 € / 1k** |
| **Bumper** | 6s | Non | CPM (1000 impr.) | 5,00 € / 1k | **2,25 € / 1k** |
| **Discovery** | Variable | Oui | CPC (clic) | 0,10 € / clic | **0,045 €** |
| **Masthead** | Jusqu'à 30s | Non | Forfait Journalier | 50 000 € / jour | **22 500 €** |

Tab. x : Estimation de la rémunération perçu par Youtube en fonction des différentes types de pub[^3].

Le modèle de PodUTT lui, se distingue par sa frugalité, aucune monétisation n'est recherchée, le service étant hébergé à des fins pédagogiques ou institutionnelles. Cela permet de supprimer les scripts de suivi et les flux vidéo publicitaires qui alourdissent considérablement le bilan carbone de chaque session de visionnage.

L'étude de l'offre des plateformes vidéo nous a permis d'identifier les sources de revenu communément utilisées (cf. Tab. 2). 
Associées à un bref état de l'art (cf. Tab. 3), nous avons pu établir que la majorité des publicités est peu rémunératrice à l'unité (mise à part Masthead), elle nécessite des millions de vues pour être viable. C'est ce constat qui pousse les plateformes à utiliser des algorithmes de recommandation addictifs, augmentant ainsi le temps passé en ligne et l'énergie consommée.

Le coût d'infrastructure est critique, contrairement au texte, le stockage et la diffusion de vidéo coûtent cher. 
Le modèle publicitaire classique "force" la surconsommation pour couvrir ces frais.
L'abonnement offre une stabilité, il permet de financer le service sans avoir recours à des scripts de tracking tiers ou à l'affichage de flux vidéos publicitaires non désirés.
Le sponsoring direct (ou régie intégrée), est beaucoup plus efficace et moins intrusif techniquement qu'une régie publicitaire programmatique.

Par conséquent, pour réduire l'impact écologique du service, nous proposons de, renoncer aux publicités en vidéo qui multiplient les requêtes réseau. Adopter un modèle de financement par contribution ou abonnement pour garantir la viabilité sans dépendre de la quantité de vues. Privilégier le don ou le mécénat institutionnel (modèle PodUTT) pour les services à visée éducative, permettant une frugalité numérique maximale. Et finalement une publicité masthead, sur chaque page du service, suffit à financer l'infrastructure pour une large audience tout en restant statique, moins énergivore et moins contraignant que le flux vidéo publicitaire.

Voici donc un résumé de notre modèle économique :

| Source possible de revenus | Montant unitaire | Quantité nécessaire pour financer un salaire[^1]
| --- | --- | ---
| Abonnement Premium | 12,99€ | 275
| Pub Masthead | 50 000€ / jour | 0,07 jour (soit env. 2h)
| Don / Contribution | 5,00 € |	714 donateurs

Tab. x : Source de revenus possibles pour notre service de vidéo en ligne.

[^1]:Basé sur le coût total employeur du salaire médian 2025 soit 3569€ environ. (source : [URSSAF](https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net))
[^2]:Basé sur le tarif de YouTube Premium (12,99€/mois) en 2025.
[^3]:Estimation après part plateforme pour un créateur/diffuseur (source : https://agence-anode.fr/blog/marketing-digital/prix-google-ads-youtube/).
[^4]:Basé sur un partenariat direct pour une vidéo de niche à audience qualifiée.

## Maquette de l'interface et échantillon de données

Au vu des différents services comparés, des exigences environnementales exprimées plus haut et des scénarios retenus, nous avons défini pour notre prototype une maquette de l'interface et un échantillon de données réalistes.

Les ressources Web possédant une représentation sur notre application seront de deux types :

- la page d'accueil (avec une HTTP-URI ayant pour chemin `/`) permettant d'afficher les miniatures de vidéo ou de chaine.
- la page de vidéo (avec pour chemin `/video/{id}`).
- la page de chaine (avec pour chemin `/channel/{id}`).

![Maquette de la page d'accueil](./docs/home_mockup.png)<br>
__Fig1__: Maquette de la Frontpage<br>
![Maquette de la page vidéo](./docs/video_mockup.png)<br>
__Fig2__: Maquette de la page vidéo<br>
![Maquette de la page chaine](./docs/channel_mockup.png)<br>
__Fig3__: Maquette de la page d'une chaîne<br>

Dans un objectif de sobriété environnementale, les vidéos et chaines de la page d'accueil seront affichées par paquet de 6, d'autre vidéo seront disponible via le bouton "Voir plus".

Pour des raisons de respect des droits d'auteurs, nous utilisons des données générées (avec [`dummy-json`](https://dummyjson.com)).

### Structure des documents

#### Vidéo
Contient les métadonnées de la vidéo et les informations essentielles de l'auteur.
```json
{
  "_id": "v0",
  "type": "video",
  "id_user": "u123",
  "date": "2024-10-07 14:30:00",
  "name": "Titre de la vidéo",
  "desc": "Description courte du contenu...",
  "path": "uploads/videos/videoTest.mp4",
  "thumbnail": "uploads/thumbnails/default.png",
  "views": 4500
}
```

#### Utilisateur
Profil complet incluant les accès et les statistiques d'abonnement.
```json
{
  "_id": "u0",
  "type": "user",
  "name": "Nom Prénom",
  "email": "user@example.com",
  "subscribers": 1250,
  "date": "2014-10-07 09:00:00"
}
```
#### Commentaire
Liaison entre un utilisateur et une vidéo pour les interactions textuelles.
```json
{
  "_id": "c0",
  "type": "comment",
  "id_user": "u123",
  "id_video": "v456",
  "date": "2025-01-12 10:15:00",
  "content": "Message de l'utilisateur..."
}
```
#### Compteur
Document technique de synchronisation pour la gestion des identifiants uniques.
```json
{
  "_id": "counter",
  "type": "counter",
  "user_counter": 799,
  "video_counter": 1999,
  "comment_counter": 7499 
}
```
## Implémentation des scénario prioritaire

### Étape de prototypage : Données chargées de manière statique

Pour cette première version du prototype (`v1.0.0`) :

- l'échantillon de données est encore chargé dans le code de manière statique,
- les fonctionnalités implémentées ne sont que celles nécessaires pour suivre les scénario prioritaire ("Consulter une vidéo - accueil/chaine").

Ces scénario nécessite de pouvoir naviguer entre deux types de page : la page d'accueil, une page de chaine de et les pages des vidéos.

### Page d'accueil

Nous avons développé la page d'accueil (cf. Fig. x) pour qu'elle affiche l'échantillon de données sous une forme proche de ce que prévoyait la maquette.

![Prototype de la page d'accueil](./docs/home_v1.png)<br>
__Fig.2__: Prototype de la page d'accueil'.<br>

Pour ce projet, nous avons exclu les frameworks lourds comme Bootstrap ou Tailwind CSS en raison de leur empreinte numérique élevée. Après un essai non concluant avec PicoCSS, dont la rigidité imposait trop de surcharges CSS personnalisées, nous avons développé notre propre bibliothèque modulaire.

Inspirée de l'approche Atomic CSS, cette structure assemble des fragments de classes dans un fichier index.css unique. Si cette méthode minimise la duplication de code dans la feuille de style, elle densifie les attributs class au sein du DOM. Cette approche pose une question intéressante en éco-conception : le gain de poids sur le fichier CSS compense-t-il l'augmentation de la taille du HTML ?

Pour aller plus loin dans la frugalité, nous pourrions mettre en place une étape qui consisterait à intégrer un système de Purge CSS. Cela permettrait de supprimer automatiquement les classes inutilisées et de ne servir que le code strictement nécessaire à l'affichage, optimisant ainsi chaque octet transféré.

Dans l'état actuel du prototype, il est possible d'avoir une première idée de l'impact environnemental du *frontend*.
Bien entendu, il manque encore le chargement dynamique des données, mais nous pouvons déjà évaluer l'impact de l'affichage des données et du *framework* (au sens large : *React*, *DayJS*).

|   | EcoIndex| GES (gCO2e) | Taille du DOM | Requêtes | Taille de la page (ko)
|---|--------:|------------:|--------------:|---------:|---------------------:
| Mode "développement"  | .. . 🟩 |  .. | .. | .. | ..
| Mode "pré-production" | .. . 🟦 | .. | .. | .. | ..

__Tab.4__: Évaluation de l'impact du prototype de la page d'accueil.

<!-- ANALYSE -->

### Pages des vidéos

Les pages des vidéos ont pour HTTP-URI `video/{id}`.

De même que précédemment, nous avons tenté d'implémenter cette page (cf. Fig. x) conformément à ce que prévoyait la maquette.

![Prototype de la page d'une vidéo](./docs/video_v1.png)<br>
__Fig.3__: Prototype de la page d'une vidéo.<br>

Avec l'ajout de ce modèle de page et la mise en place de la navigation entre les deux modèles, il devient possible d'exécuter le scénario prioritaire complet et de mesurer son impact.

|   | EcoIndex| GES (gCO2e) | Taille du DOM | Requêtes | Taille de la page (ko)
|---|--------:|------------:|--------------:|---------:|---------------------:
| 1. Chargement de la page | .. . 🟦 | .. | .. | .. | ..
| 2. Choisir une vidéo | .. . 🟦 | .. | .. | .. | ..
| 3. Retourner sur le menu | .. . 🟦 | .. | .. | .. | ..
| 4. Choisir une autre vidéo | .. . 🟦 | .. | .. | .. | ..

__Tab.5__: Évaluation de l'impact du scénario "Consulter une video - accueil" dans le prototype v1.0.0.

<!-- Ces estimations bien qu'artificiellement basses (puisque les données sont chargées de manière statique) sont tout de même à comparer avec [celles des services concurrents](lien) vues précédemment.

Si nous arrivons à maintenir les émissions en dessous de 1,3 g par page pour notre produit minimum viable, nous pouvons donc espérer proposer une alternative environ 2 fois moins impactante que les services existants (en incluant pourtant la participation au cycle de vie du terminal). -->

### Pages des chaines

Les pages des chaines ont pour HTTP-URI `channel/{id}`.

De même que précédemment, nous avons tenté d'implémenter cette page (cf. Fig. x) conformément à ce que prévoyait la maquette.

> La maquette initiale (v1) n'est plus disponible. Une version mise à jour et plus détaillée est présentée dans la suite de ce document.

Avec l'ajout de ce modèle de page et la mise en place de la navigation entre les deux modèles, il devient possible d'exécuter le scénario prioritaire complet et de mesurer son impact.

|   | EcoIndex| GES (gCO2e) | Taille du DOM | Requêtes | Taille de la page (ko)
|---|--------:|------------:|--------------:|---------:|---------------------:
| 1. Chargement de la page | .. . 🟦 | .. | .. | .. | ..
| 2. Choisir une chaine | .. . 🟦 | .. | .. | .. | ..
| 3. Choisir une vidéo | .. . 🟦 | .. | .. | .. | ..
| 4. Retourner sur la chaine | .. . 🟦 | .. | .. | .. | ..
| 5. Choisir une autre vidéo | .. . 🟦 | .. | .. | .. | ..

__Tab.6__: Évaluation de l'impact du scénario "Consulter une chaine - chaine" dans le prototype v1.0.0.

<!-- Ces estimations bien qu'artificiellement basses (puisque les données sont chargées de manière statique) sont tout de même à comparer avec [celles des services concurrents](lien) vues précédemment.

Si nous arrivons à maintenir les émissions en dessous de 1,3 g par page pour notre produit minimum viable, nous pouvons donc espérer proposer une alternative environ 2 fois moins impactante que les services existants (en incluant pourtant la participation au cycle de vie du terminal). -->

### Étape de prototypage : Données statiques chargées de manière dynamique

Pour cette nouvelle version du prototype (`v1.0.1`), identique du point de vue fonctionnel, les données (toujours statiques) sont désormais chargées par le *frontend* à travers le réseau immédiatement après un premier affichage à vide.
Ce comportement, plus réaliste, n'a pour effet qu'une requête supplémentaire par page affichée. 

Concernant l'évaluation de l'impact environnemental du scénario, par rapport au tableau précédent (cf. Tab.5), à l'exception du nombre de requêtes qui est incrémenté de 1, les résultats sont strictement identiques.

## Mesures de la consommation énergétique lors du passage à l'échelle

Maintenant que notre prototype est réaliste en termes de nombre de requêtes, nous pouvons simuler les effets du "passage à l'échelle". 

Les plateformes de vidéo en ligne permettent à tout type d'utilisateur de poster des vidéos de ce fait il est important d'analyser le comportement du service dans le cas ou le volume de vidéo, commentaires et chaine explose !

Nous avons ainsi mis en place les valeurs suivantes : 
- 2000 vidéos
- 7500 commentaires
- 800 utilisateurs inscrits

### Évolution de l'EcoIndex lors du passage à l'échelle

Produites désormais de manière automatique lors de l'intégration continue, les mesures nécessaires à la production de l'EcoIndex, [avant](...) et [après](...) la simulation du passage à l'échelle retraduisent bien (cf. Tab.x) l'augmentation du poids des téléchargements, mais aussi de l'augmentation du nombre d'éléments de la page des titres.

|   | EcoIndex| GES (gCO2e) | Taille du DOM | Requêtes | Taille de la page (ko)
|---|--------:|------------:|--------------:|---------:|---------------------:
| 1. Chargement de la page | <del>.. . 🟦</del><br/>.. . 🟥 | <del>..</del><br/>.. | <del>..</del><br/>.. | .. | <del>..</del><br/>.. 
| 2. Choisir une vidéo | <del>.. . 🟦</del><br/>.. . 🟩 | <del>..</del><br/>.. | .. | .. | <del>..</del><br/>..
| 3. Retourner sur le menu | <del>.. . 🟦</del><br/>.. . 🟥 | <del>..</del><br/>.. | <del>..</del><br/>.. | <del>..</del><br/>..
| 4. Choisir une autre vidéo | <del>.. . 🟦</del><br/>.. . 🟩 | <del>..</del><br/>.. | .. | .. | <del>..</del><br/>..

__Tab.6__: Effet du passage à l'échelle sur l'impact du scénario "Consulter une chaine - accueil" dans le prototype v1.0.1.

<!-- On pourrait s'étonner que la baisse de l'EcoIndex soit beaucoup plus forte pour la page des titres que pour la page d'un article alors que l'augmentation du poids des téléchargements est analogue.
Ceci s'explique par le fait que l'EcoIndex vise à évaluer un impact global, incluant une part de la fabrication et de la fin de vie des terminaux, et que cette part augmente avec le nombre d'éléments de la page. -->
Pour évaluer plus précisément l'impact de la consultation elle-même nous utiliserons un autre outil de mesure : GreenFrame.

### Mesure de la consommation énergétique liée à la consultation

Le logiciel GreenFrame est capable d'estimer, pour les différents composants de l'architecture, la consommation énergétique :

- du CPU (à partir du temps de calcul),
- de la mémoire vive (à partir de la taille des données mémorisées),
- du disque (à partir de la taille des données lues et écrites),
- du réseau (à partir de la taille des données reçues et envoyées),
- pour le navigateur uniquement, de l'écran (à partir du temps d'exécution du scénario).

A METTRE A JOUR

 (a)                 | cpu (Wh)   | mem (Wh)   | disk (Wh) | network (Wh)       | screen (Wh) | total (Wh)   |
| ------------------ | ---------- | ---------- | --------- | ------------------ | ----------- | ------------ | 
| Navigateur         | 0.0027     | 0.000058   | 0.0       | <mark>0.062</mark> | <mark>0.069</mark> | 0.13  |
| Serveur Web        | 0.000061   | 0.000020   | 0.0       | <mark>0.063</mark> | 0.0                | 0.063 |

| (b)                | cpu (Wh)   | mem (Wh)   | disk (Wh) | network (Wh)       | screen (Wh)        | total (Wh) |
| ------------------ | ---------- | ---------- | --------- | ------------------ | ------------------ | ---------- | 
| Navigateur         | 0.0035     |  0.000065  |  0.0      | <mark>0.062</mark> | <mark>0.072</mark> |  0.14      |
| Serveur Web        | 0.000074   |  0.000021  |  0.0      | <mark>0.063</mark> | 0.0                |  0.064     |

__Tab.7__: Estimation de la consommation énergétique de la consultation des vidéos via l'accueil (premier tableau) et via une chaine (second tableau).

<!-- Par rapport à ce que pouvait laisser penser l'EcoIndex, les résultats (cf. Tab.7) indiquent que la consommation due à la consultation de l'index (avec ses 3000 titres) est équivalente à celle d'un article. Autrement dit, l'affichage en lui même de ces données en grand nombre est négligeable par rapport à la transmission de ces données sur le réseau.

Par contre, l'affichage de ces données a bien un impact indirect : en augmentant le temps de lecture, il a un effet déterminant sur le temps d'éclairage de l'écran. 
De fait, les trois éléments ayant le plus d'impact (à peu près à égalité, le reste étant négligeable), sont ici : 

- l'écran du client,
- le réseau du client,
- le réseau du serveur. -->

### Effet de l'introduction d'une base de données

Afin de réduire l'impact énérgétique du réseau, nous stockons désormais les données de l'application (`v2.0.0`) dans une base de données (*CouchDB*).
Cette évolution nous permet, lors de l'affichage d'une vidéo, de charger une seule vidéo plutôt que les plus de 2000.

A METTRE A JOUR
|                    | cpu (s)    | screen (s) | mem (B) | disk (B) | network (B) |
| ------------------ | ---------- | ---------- | --------| -------- | ----------- |
| Navigateur | <del>0,133</del><br/><add>0,0754</add>| 17,6 | <del>1,56e+8</del><br/><add>1,24e+8</add> | 0,00 | <del>1,22e+7</del><br/><add>3,64e+5</add> |
| Serveur Web | <del>0,000856</del><br/><add>0,000210</add> | 0,00 | 5,56e+6  | 0,00 | <del>1,22e+7</del><br/><add>3,62e+5</add>
| Base de données | <del>0</del><br/><add>0,0357</add> | 0,00 | <del>0</del><br/><add>1,27e+8</add> | 0,00 | <del>0</del><br/><add>1,80e+3</add>

__Tab.8__: Effet sur l'utilisation des ressources de l'introduction d'une base de données dans l'application, lors de la consultation d'une vidéo.

<!-- Cette amélioration (cf. Tab.8) est assez spectaculaire avec notamment (pour les valeurs significatives) : 

- une réduction de 97% de la quantité de données chargées par le client,
- une réduction de 51% de la charge du CPU sur le client,
- une réduction de 24% de la mémoire vive utilisée par le client,
- une utilisation des ressources par la base de données négligeable excepté une consommation très importante de mémoire vive (16 fois la quantité nécessaire pour le serveur Web). -->

 (a)              | cpu (Wh)   | mem (Wh)   | disk (Wh) | network (Wh)       | screen (Wh) | total (Wh)   |
| --------------- | ---------- | ---------- | --------- | ------------------ | ----------- | ------------ | 
| Navigateur      | 0,0027     | 0,000058   | 0,0       | 0,062 | 0,069 | 0,13  |
| Serveur Web     | <del>0,000061</del><br/>0,0000043 | <del>0,000020</del><br/>0,0000029 | 0,0 | <mark><del>0,063</del></mark><br/>0,0019 | 0,0 | <del>0,063</del><br/>0,0019 |
| Base de données | <del>0</del><br/>0,0033 | <del>0</del><br/>0,000066 | 0,0 | <del>0</del><br/><mark>0,064</mark> | 0,0 | <del>0</del><br/>0,067 |

| (b)             | cpu (Wh)   | mem (Wh)   | disk (Wh) | network (Wh)       | screen (Wh)        | total (Wh) |
| --------------- | ---------- | ---------- | --------- | ------------------ | ------------------ | ---------- | 
| Navigateur      | <del>0,0035</del><br/>0,00094 | <del>0,000065</del><br/>0,000046 | 0,0 | <del><mark>0,062</mark></del><br/>0,0019 | <mark>0,072</mark> | <del>0,14</del><br/>0,075 |
| Serveur Web     | <del>0,000074</del><br/>0,0000037 | <del>0,000021</del><br/>0,0000029 | 0,0 | <del><mark>0,063</mark></del><br/>0,0019 | 0,0 | <del>0,064</del><br/>0,0019 |
| Base de données | <del>0</del><br/>0,00062 | <del>0</del><br/>0,000065 | 0,0 | <del>0</del><br/>0,0000092 | 0,0 | <del>0</del><br/>0,00070 |

__Tab.9__: Effet sur la consommation énergétique de l'introduction d'une base de données dans l'application, lors de la consultation de l'accueil (premier tableau) et d'une vidéo (second tableau).

<!-- Pour la consultation d'un article, cette forte diminution de l'utilisation des ressources se traduit par une consommation énérgétique estimée (cf. Tab.9b) quasiment minimale puisqu'à peine supérieure à celle de l'écran.

Concernant la consultation des titres (cf. Tab.9a), par contre, l'ajout de la base de données a eu pour seul effet notable de remplacer la consommation du réseau du serveur Web par celle du réseau de la base de données.
Pour réduire cette consommation, nous devons maintenant réduire drastiquement la quantité de données chargées par la page des titres du journal. -->

## Développement du service

Une fois notre scénario prioritaire établi, nous avons fait évoluer notre service pour répondre aux objectifs fixés initialement. Nous avons implémenté plusieurs fonctionnalités clés afin de transformer notre prototype en une véritable plateforme de vidéo en ligne.

### Refonte de l'architecture Backend

Pour garantir la pérennité du projet, nous avons d'abord repensé notre architecture. Initialement, le frontend requêtait directement la base de données **CouchDB**. Cette approche présentait des failles de sécurité majeures, le client (accessible à l'utilisateur) ayant un accès trop direct à la couche de données.

L'introduction d'un backend est devenue indispensable pour supporter nos nouveaux besoins : le système d'authentification et l'upload de fichiers. Nous avons choisi **Express (Node.js)** pour remplir les missions suivantes :

* **Intermédiation des données :** Le backend récupère, trie et traite les données de la base avant de les transmettre au frontend, sécurisant ainsi les flux.
* **Système d'authentification :** Mise en place d'un tunnel *Login/Register*. La gestion de l'état utilisateur (via Context et LocalStorage) permet de conditionner l'ajout de vidéos, de commentaires et la personnalisation des profils.

![Page d'authentification](./docs/auth.png)<br>
__FigX__: Page d'authentification  <br>

* **Gestion des médias :** Prise en charge de l'upload des vidéos, des miniatures et des photos de profil.

![Modal d'upload de vidéo](./docs/upload.png)<br>
__FigX__: Modal d'upload de vidéo <br> 

### Modernisation de l'interface utilisateur (UI)

Nous avons procédé à une mise à jour visuelle profonde en enrichissant notre bibliothèque CSS. Notre conviction est que **l'éco-responsabilité ne doit pas se faire au détriment de l'expérience utilisateur.**

Une interface soignée améliore l'accessibilité et la clarté de l'information. Cette refonte a permis d'harmoniser les parcours suivants :
* Pages d'accueil (Vidéos et Chaînes).
* Lecteur vidéo dédié.
* Espaces de gestion des chaînes.

![Page d'accueil finale](./docs/home_final.png)<br>
__Fig1__: Page d'accueil finale<br>
![Page vidéo finale](./docs/video_final.png)<br>
__Fig2__: Page de vidéo finale<br>
![Page vidéo finale](./docs/video_final_1.png)<br>
__Fig2__: Page de vidéo - commentaire<br>
![Page chaine finale](./docs/channel_final.png)<br>
__Fig3__: Page de chaine finale<br>

### Traitement vidéo avec FFmpeg

Pour la manipulation des fichiers médias, nous avons intégré **ffmpeg-fluent** à notre image backend. La première fonctionnalité déployée est la **génération automatique de miniatures**.

Si l'utilisateur ne fournit pas d'image de couverture, le serveur utilise FFmpeg pour extraire une capture d'écran au milieu de la vidéo. Bien que pratique, cette fonctionnalité soulève des questions en matière d'éco-conception :
> **Note sur l'éco-conception :** L'exécution de processus de traitement vidéo sur le serveur peut être énergivore. Bien que décidée dans l'enthousiasme du développement pour tester les capacités de l'outil, cette fonction mériterait d'être optimisée (par exemple, en limitant la résolution de l'extraction) pour rester cohérente avec nos engagements environnementaux.

## Amélioration du service en matière d'éco-conception

Une fois le service fonctionnel, nous avons concentré nos efforts sur l'optimisation des ressources et la réduction de l'empreinte carbone de l'application, en intervenant sur deux axes majeurs.

### 1. La dénormalisation des données

Initialement, nos données suivaient un modèle relationnel classique. Cependant, ce choix architectural s'est révélé inefficace avec **CouchDB**, qui est une base de données NoSQL orientée documents ne supportant pas les jointures (JOIN).

**Le problème identifié :**
Pour afficher une simple liste de 6 vidéos avec le nom de leur auteur, le backend devait effectuer :
1. Une requête pour récupérer les 6 vidéos.
2. Six requêtes supplémentaires (ou une requête filtrée complexe) pour récupérer les profils utilisateurs correspondants.

Cette multiplication des allers-retours entre le serveur et la base de données (I/O) augmentait inutilement la consommation énergétique du CPU et la latence réseau.

**Comparaison des solutions :**

| Solution | Avantages | Inconvénients |
| :--- | :--- | :--- |
| **Design Views** | Utilise les fonctions natives de CouchDB. | Exploite un comportement instable (`include_docs`), récupère trop de données inutiles et rend la recherche par Regex complexe. |
| **Dénormalisation** | **Une seule requête** suffit pour obtenir toutes les infos d'affichage. | Duplication des données et nécessité de mettre à jour plusieurs documents en cas de modification de profil. |

**Arbitrage technique :**
Nous avons opté pour la **dénormalisation**. Les objets "Vidéo" et "Commentaire" embarquent désormais un objet "User" simplifié (nom, ID, avatar). 

#### Vidéo
```json
{
  "_id": "v0",
  "type": "video",
  "user" : {
    "id_user": "u123",
    "name": "Nom Prénom",
    "avatar": "uploads/avatars/default.png"
  },
  "date": "2024-10-07 14:30:00",
  "name": "Titre de la vidéo",
  "desc": "Description courte du contenu...",
  "path": "uploads/videos/videoTest.mp4",
  "thumbnail": "uploads/thumbnails/default.png",
  "views": 4500
}
```
#### Commentaire
```json
{
  "_id": "c0",
  "type": "comment",
  "user" : {
    "id_user": "u123",
    "name": "Nom Prénom",
    "avatar": "uploads/avatars/default.png"
  },
  "id_video": "v456",
  "date": "2025-01-12 10:15:00",
  "content": "Message de l'utilisateur..."
}
```
* **Résultat :** Le poids de la base est passé de 3.9 MB à 4.5 MB (+15%).
* **Bénéfice Éco :** Cette légère hausse du stockage est largement compensée par la suppression massive de requêtes HTTP et de traitements superflus côté backend, réduisant ainsi la charge serveur globale.

### 2. La fonctionnalité "Mode Podcast" (Audio-only)

La vidéo est le média le plus énergivore du web. Pour répondre à cet enjeu, nous avons développez une fonctionnalité de **Mode Podcast**.

![Mode podcast](./docs/podcast.png)<br>
__Fig3__: Mode podcast<br>

L'idée est de dissocier le flux audio du flux vidéo lors de l'upload via **FFmpeg**. Cette fonctionnalité offre deux avantages majeurs pour l'éco-conception :

1.  **Réduction de la bande passante :** L'utilisateur peut choisir de n'écouter que l'audio. Le flux de données est alors divisé par 10 (environ), ce qui est idéal pour une écoute en mobilité ou avec une connexion limitée.
2.  **Sobriété matérielle :** La lecture d'un flux audio seul sollicite beaucoup moins le processeur (CPU/GPU) de l'appareil client, prolongeant ainsi l'autonomie de la batterie et réduisant la consommation électrique.

Cette option permet de transformer notre plateforme de streaming en un service hybride, s'adaptant au besoin réel de l'utilisateur tout en limitant son impact environnemental.
