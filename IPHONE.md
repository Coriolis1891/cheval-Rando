# Installer Sentiers à Cheval sur votre iPhone (compte Apple gratuit)

L'application iPhone utilise le même code que le site. Elle ajoute surtout le **GPS en arrière-plan** :
l'enregistrement et le guidage continuent quand le téléphone est verrouillé dans la poche.

## Une seule fois : préparer le Mac

1. **Xcode** : installez-le depuis l'App Store (gratuit, environ 10 Go). Ouvrez-le une fois et acceptez la licence.
2. **Node.js** : téléchargez la version « LTS » sur https://nodejs.org et installez-la.
3. Dans Xcode : menu **Xcode → Settings → Accounts → +** → *Apple ID* → connectez-vous avec votre compte développeur.

## Récupérer le projet et ouvrir Xcode

Ouvrez l'application **Terminal** et collez ces lignes, une par une :

```bash
cd ~/Desktop
git clone https://github.com/Coriolis1891/cheval-Rando.git
cd cheval-Rando
npm install
npm run ios
```

Xcode s'ouvre sur le projet « App ». La première fois, il télécharge des composants (1 à 3 minutes, barre de progression en haut).

## Installer sur l'iPhone

1. Branchez l'iPhone au Mac avec un câble. Sur l'iPhone : **Se fier à cet ordinateur**.
2. Dans Xcode, colonne de gauche : cliquez sur **App** (icône bleue tout en haut), puis la cible **App**, onglet **Signing & Capabilities**.
3. **Team** : choisissez votre nom (*Personal Team*).
   Si Xcode signale que l'identifiant est déjà pris, changez **Bundle Identifier** (par exemple `com.votreprenom.sentierscheval`).
4. En haut de la fenêtre, à côté de « App », choisissez **votre iPhone** dans la liste des appareils.
5. Appuyez sur **▶** (ou Cmd + R).
6. La première fois, sur l'iPhone :
   - **Réglages → Confidentialité et sécurité → Mode développeur** → activer (l'iPhone redémarre) ;
   - **Réglages → Général → VPN et gestion de l'appareil** → votre compte → **Faire confiance**.
   Puis appuyez de nouveau sur ▶ dans Xcode.

## À savoir

- Avec le compte gratuit, l'application **expire au bout de 7 jours** : rebranchez l'iPhone et appuyez sur ▶ pour la réinstaller (vos parcours sont conservés).
- Position : au premier enregistrement, autorisez la localisation. Pour l'enregistrement poche verrouillée, choisissez **« Toujours »** si iOS le propose
  (ou Réglages → Sentiers Cheval → Position → Toujours).
- Pour récupérer une mise à jour du code : dans le Terminal, `cd ~/Desktop/cheval-Rando`, puis `git pull`, puis `npm run ios`, puis ▶.
