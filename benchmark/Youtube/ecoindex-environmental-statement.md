## Déclaration environnementale : YouTube

**Mesure effectuée le :** Tue 30 Dec 2025

**Méthode :** Référentiel **EcoIndex** (GreenIT.fr)

### Performance Globale

Le site YouTube présente une empreinte environnementale significative, principalement due à la taille des ressources chargées et à la complexité de l'interface.

* **Note EcoIndex moyenne :** 12,91 / 100
* **Grade :** **F** (Performance très faible)
* **Consommation d'eau (pour 1 000 utilisateurs) :** 4.11 Litres
* **Émissions GES (pour 1 000 utilisateurs) :** 2.74 kg CO2e

### Détail des mesures (Top Pages)

| Page | Grade | Score | Eau (cl) | GES (g) | Requêtes | Taille (Ko) | DOM |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Vidéo 2** | **G** | 6.86 | 4.29 | 2.86 | 200 | 14 284 | 7 639 |
| **Retour à l'accueil** | **F** | 10.27 | 4.19 | 2.79 | 144 | 10 538 | 6 519 |
| **Vidéo 1** | **F** | 12.67 | 4.12 | 2.75 | 122 | 9 319 | 7 141 |
| **Accueil** | **F** | 21.86 | 3.84 | 2.56 | 72 | 6 103 | 3 718 |

---

### Analyse des points critiques

D'après les relevés, les principaux facteurs d'impact pour YouTube sont :

1. **Le poids des pages :** Avec des transferts dépassant souvent les **10 Mo** par page, la bande passante est fortement sollicitée.
2. **Complexité du DOM :** Les éléments structurels (plus de 7000 sur l'accueil) demandent une puissance de calcul importante au processeur de l'utilisateur.
3. **Nombre de requêtes :** Jusqu'à **200 requêtes** pour charger une seule page, multipliant les échanges serveur.

### Recommandations d'écoconception (Spécifique Vidéo)

Pour améliorer ces scores, les pistes suivantes sont prioritaires :

* **Désactiver la lecture automatique** (Autoplay) des vidéos.
* **Réduire la résolution par défaut** en fonction de la taille de l'écran.
* **Limiter le "Lazy Loading" infini** sur les suggestions de vidéos qui alourdit le DOM inutilement.
* **Limiter le tracker** dans la vidéo qui apporte des informations peu pertinente, mise en part en cas de sponsorisation d'une vidéo.
* **Optimiser les vignettes (thumbnails)** : utiliser des formats comme WebP compressé.

> **Note :** Cette analyse est une photographie à un instant T. L'impact réel dépend énormément de la durée de visionnage et de la résolution de la vidéo choisie par l'utilisateur (4K vs 480p).