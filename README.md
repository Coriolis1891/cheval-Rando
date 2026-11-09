# Sentiers à Cheval 🐴

Application mobile (web installable, « PWA ») pour préparer et suivre des **randonnées à cheval** sur les chemins, avec un **niveau de difficulté** et une **durée estimée** pour chaque parcours.

## Fonctionnalités

- **Boucle par durée ou par distance** : « je veux une balade de 2 h » → l'application calcule la distance correspondant à votre allure et propose une vraie boucle (sans allers-retours), ou choisissez directement les kilomètres (4 à 60 km). Bouton « ↻ Autre » pour une autre proposition.
- **A → B** avec étapes : départ + arrivée (adresse, coordonnées, « ma position » ou toucher la carte), étapes ajoutées en touchant la carte.
- **Profil de calcul « cheval »** (BRouter, `profiles/cheval.brf`) : privilégie chemins équestres, pistes et chemins de terre ; évite le bitume, les routes, les escaliers, les voies interdites aux chevaux (`horse=no`) et les barrières infranchissables (échaliers, tourniquets, chicanes, grilles à bétail).
- **Niveau cavalier & cheval** : 🌱 Débutant (chemins larges, pentes douces), 🐎 Confirmé (sentiers étroits, pentes marquées), 🏔️ Expert (sentiers techniques et de montagne).
- **Allure** : 🚶 au pas (≈ 5,5 km/h), 🐴 pas et trot (≈ 7,5 km/h), 💨 sportive (≈ 10 km/h). Sur route, on compte toujours au pas.
- **Difficulté du parcours** 🟢 Facile · 🔵 Moyen · 🔴 Difficile · ⚫ Très difficile, calculée à partir de la distance, du dénivelé, de la pente maximale et des passages techniques, avec le détail (km, D+, pente max, bitume, routes fréquentées) et une alerte si le parcours dépasse votre niveau.
- **Durée** : temps en selle (plat, montées, descentes au pas, passages techniques) + pauses conseillées (15 min toutes les 1 h 30, repas au-delà de 4 h 30). Choisissez votre **heure de départ** : l'application donne l'heure d'arrivée et vous prévient si vous rentrez après le **coucher du soleil**.
- **Mes parcours** filtrables par **difficulté** et par **durée** (< 2 h, 2–4 h, > 4 h).
- **Lieux utiles** (OpenStreetMap) le long du parcours : 🪣 eau pour les chevaux (abreuvoirs, sources, puits), 🐴 centres équestres, gîtes et barres d'attache, 🩺 vétérinaires et maréchaux-ferrants, points de vue, patrimoine, pique-nique…
- **Signalements** pendant la balade (⚠️) : arbre tombé, barrière/échalier/clôture, interdit aux chevaux (contourné par les calculs suivants), sol dangereux, boue/gué profond, chiens… avec alerte vocale à l'approche et « Toujours là ? » au passage.
- **Guidage virage par virage** (voix, vue 3D), **cartes hors ligne** (Plan IGN), **partage** par lien, **export/import GPX**, **enregistrement GPS** de vos balades et **historique** automatique.
- Fonds de carte : Plan IGN (par défaut), photos aériennes IGN, OpenStreetMap, topographique.

Tout est stocké sur le téléphone (pas de compte, pas de serveur à vous).

> Les durées et difficultés sont des estimations : adaptez toujours la sortie à la condition de votre cheval, à la météo et à l'état des chemins.

## Mettre l'application en ligne (gratuit, 2 minutes)

L'app doit être servie en **HTTPS** pour la géolocalisation et l'installation. Au choix :

**Netlify Drop (le plus simple)** : allez sur https://app.netlify.com/drop et glissez-déposez le dossier `cheval-sentiers`. Vous obtenez une adresse `https://xxx.netlify.app`.

**GitHub Pages** : créez un dépôt, envoyez-y le contenu du dossier, puis *Settings → Pages → Deploy from branch (main, /root)*.

## L'installer sur le téléphone

- **Android (Chrome)** : ouvrez l'adresse → menu ⋮ → « Installer l'application » / « Ajouter à l'écran d'accueil ».
- **iPhone (Safari)** : ouvrez l'adresse → bouton Partager → « Sur l'écran d'accueil ».

## Tester sur l'ordinateur

```
cd cheval-sentiers
python3 -m http.server 8000
```
puis ouvrez http://localhost:8000

## Services utilisés (gratuits, sans clé)

| Rôle | Service |
|---|---|
| Calcul d'itinéraire | [BRouter](https://brouter.de) — profil `cheval.brf` écrit pour la randonnée équestre |
| Recherche d'adresse | [Géoplateforme IGN](https://geoservices.ign.fr/documentation/services/services-geoplateforme/geocodage) (France) + [Photon](https://photon.komoot.io) (monde), interrogés en parallèle |
| Points d'intérêt | [Overpass API](https://overpass-api.de) (OpenStreetMap, 4 serveurs essayés en cascade) + [Wikipédia](https://fr.wikipedia.org) (lieux géolocalisés) |
| Vue 3D | [MapLibre GL](https://maplibre.org) (chargé seulement au guidage 3D) + relief [AWS Terrain Tiles](https://registry.opendata.aws/terrain-tiles/) (données ouvertes) |
| Cartes | Plan IGN, photos aériennes IGN, OpenStreetMap, OpenTopoMap (Géoplateforme, seul fond utilisé pour le hors ligne : les serveurs OpenStreetMap interdisent le téléchargement en masse) |

Chaque requête a un délai maximum et peut être annulée (bouton « Annuler »). Ce sont des services communautaires : merci d'en faire un usage raisonnable. Pour un usage intensif (beaucoup d'utilisateurs), il faudrait héberger son propre serveur BRouter.

## Structure

```
index.html            interface
style.css             styles (mobile d'abord, panneau latéral sur grand écran)
app.js                logique (carte, calcul, boucle, difficulté, durée, POI, sauvegarde, GPX)
extras.js             navigation guidée, cartes hors ligne, partage, import GPX
rides.js              enregistrement GPS de trajets, Mes créations, Historique
reports.js            signalements (carte, guidage, historique)
sw.js                 service worker (ouverture hors ligne)
manifest.webmanifest  installation sur l'écran d'accueil
profiles/cheval.brf   profil de calcul BRouter « cheval »
icons/                icônes
```

---
Powered by **F.CHAZE**
