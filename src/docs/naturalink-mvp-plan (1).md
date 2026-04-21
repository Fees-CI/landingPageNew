# 🌿 NATURALINK — MVP Plan Technique
### Premier Label Intelligent Made in Côte d'Ivoire
> **Domaine :** [naturalink.ink](https://naturalink.ink) | **Stack :** Next.js Fullstack | **Format :** Série de prompts de développement

---

> ⚠️ **Note importante sur ce document**
> Ce plan est conçu comme une **série de prompts de développement**.  
> Les features blockchain et IA affichées dans l'UI sont des **données mockées / statiques** — elles donnent l'apparence d'un système avancé sans implémentation réelle.  
> Objectif : **shipper vite, avoir un produit qui claque visuellement et fonctionne de bout en bout.**

---

## 🎯 Vision

Naturalink est le **premier système de traçabilité produit** conçu en Côte d'Ivoire. Ce MVP repose sur trois piliers :

1. **Génération d'identité produit** — QR code stylisé + UUID unique par lot
2. **Scanner QR immersif** — interface caméra soignée, UI éclatante, expérience mobile-first
3. **Page publique de traçabilité** — timeline de la chaîne de valeur + section invendus

---

## ⚡ Architecture MVP

### Stack Technique

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Frontend + Backend | **Next.js 14 (App Router)** | Fullstack unifié |
| Base de données | **PostgreSQL via Prisma** | Persistance |
| QR Stylisé | **@liquid-js/qr-code-styling** | Signature visuelle propriétaire |
| Scan QR | **html5-qrcode** | Lecture caméra côté client |
| UI / Styles | **Tailwind CSS** | Design system rapide |
| Hébergement | **Vercel** | Déploiement continu |

---

## 🧱 Modèle de Données (simplifié)

### 3 tables suffisent

**`Product`**
```sql
id          UUID PRIMARY KEY
name        TEXT NOT NULL
origin      TEXT DEFAULT 'Côte d\'Ivoire'
category    TEXT        -- ex: Cacao, Café, Textile, Cosmétique
createdAt   TIMESTAMP
```

**`Batch`** — lot traçable
```sql
id          UUID PRIMARY KEY
productId   FK → Product
uniqueCode  UUID UNIQUE   -- identifiant scanné dans le QR
qrCode      TEXT          -- data URL du QR stylisé (base64)
colorSeed   TEXT          -- couleur dérivée du code, pour l'UI
createdAt   TIMESTAMP
```

**`TraceEvent`** — historique affiché sur la page publique
```sql
id          UUID PRIMARY KEY
batchId     FK → Batch
step        TEXT    -- 'Production' | 'Transport' | 'Transformation' | 'Distribution' | 'Invendu'
actor       TEXT    -- nom ou organisation (peut être fictif en démo)
location    TEXT    -- ville
note        TEXT    -- description libre
timestamp   TIMESTAMP
```

> 💡 Les données `actor`, `location`, `note` peuvent être **pré-remplies ou mockées** pour les démos. La structure reste réelle et prête à être alimentée par de vraies données.

---

## 🗂️ Structure Next.js

```
/app
  /dashboard          ← Backoffice : création produit + batch
  /scan               ← Scanner QR (UI immersive)
  /track/[code]       ← Page publique traçabilité + invendus

/components
  StyledQR.tsx        ← Générateur QR @liquid-js avec logo + couleurs
  QRScanner.tsx       ← Scanner caméra full UI (le plus soigné du projet)
  TraceTimeline.tsx   ← Timeline verticale des événements
  TrustBadge.tsx      ← Badge "Vérifié Naturalink" (mock visuel)
  UnsoldSection.tsx   ← Section redirection invendus (données statiques)

/lib
  prisma.ts           ← Client Prisma
  qr.ts               ← Logique couleur dynamique + génération QR
  mock-data.ts        ← Données fictives pour blockchain badge + score

/app/api
  /product/route.ts         POST — Créer un produit
  /batch/route.ts           POST — Créer un batch + QR
  /trace/route.ts           POST — Ajouter une étape traçabilité
  /track/[code]/route.ts    GET  — Retourner toute la chaîne
```

---

## 📋 SÉRIE DE PROMPTS DE DÉVELOPPEMENT

---

### 🔵 PROMPT 1 — Setup projet

```
Crée un projet Next.js 14 avec App Router, TypeScript et Tailwind CSS.
Configure Prisma avec PostgreSQL.
Crée le schéma Prisma avec 3 models : Product, Batch, TraceEvent.

Product : id (uuid), name, origin (défaut "Côte d'Ivoire"), category, createdAt
Batch : id (uuid), productId (FK), uniqueCode (uuid unique), qrCode (text), colorSeed (text), createdAt
TraceEvent : id (uuid), batchId (FK), step (text), actor (text), location (text), note (text), timestamp

Ajoute un fichier .env.example avec DATABASE_URL et NEXT_PUBLIC_URL.
```

---

### 🔵 PROMPT 2 — API Routes

```
Dans /app/api, crée les routes suivantes en Next.js App Router :

POST /api/product → crée un produit en base
POST /api/batch → crée un batch, génère un UUID pour uniqueCode, calcule colorSeed depuis le hash du code
POST /api/trace → ajoute un TraceEvent lié à un batch
GET /api/track/[code] → retourne le batch avec son product et tous ses TraceEvents triés par timestamp ASC

Utilise Prisma pour toutes les opérations. Retourne du JSON propre avec status 200/201/400/404 selon les cas.
```

---

### 🔵 PROMPT 3 — Génération QR Stylisé

```
Installe @liquid-js/qr-code-styling.

Crée un composant React client StyledQR.tsx qui :
- prend en prop : code (string)
- génère une couleur primaire unique avec cette fonction :
  function getColorFromCode(code) {
    const hash = code.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `hsl(${hash % 360}, 70%, 40%)`
  }
- initialise QRCodeStyling avec :
  - width: 300, height: 300
  - data: `${process.env.NEXT_PUBLIC_URL}/track/${code}`
  - image: "/logo.png" (logo Naturalink centré)
  - dotsOptions: { color: primaryColor, type: "rounded" }
  - backgroundOptions: { color: "#ffffff" }
  - cornersSquareOptions: { type: "extra-rounded", color: "#0A2540" }
  - cornersDotOptions: { type: "dot", color: "#FF6B00" }
  - imageOptions: { crossOrigin: "anonymous", margin: 6 }
- rend le QR dans un div ref
- expose une méthode download() qui télécharge le QR en PNG nommé naturalink-{code}.png

Important : ce composant est "use client" uniquement.
```

---

### 🔵 PROMPT 4 — Dashboard Backoffice (`/dashboard`)

```
Crée la page /dashboard avec une UI Tailwind propre et sobre (fond blanc, accents vert foncé #0A2540).

Section 1 — Créer un produit :
- Champs : Nom, Origine (pré-rempli "Côte d'Ivoire"), Catégorie (select : Cacao, Café, Textile, Cosmétique, Autre)
- Bouton "Créer le produit" → POST /api/product

Section 2 — Générer un batch :
- Select produit (chargé depuis la DB)
- Bouton "Générer le QR Code"
- POST /api/batch → affiche le composant StyledQR avec le code généré
- Bouton "Télécharger PNG"
- Affiche l'URL : https://naturalink.ink/track/[code] avec bouton copier

Section 3 — Ajouter une étape traçabilité :
- Select batch
- Champs : Étape (select : Production/Transport/Transformation/Distribution/Invendu), Acteur, Localisation, Note
- Bouton "Enregistrer l'étape"
```

---

### 🔵 PROMPT 5 — Scanner QR (UI Immersive) ⭐ LA PAGE STAR

```
Installe html5-qrcode.

Crée la page /scan avec une UI SPECTACULAIRE, mobile-first, en mode plein écran.

DESIGN ATTENDU :

Fond global :
- background: linear-gradient(180deg, #0A1628 0%, #0F2140 100%)
- min-height: 100vh, overflow: hidden

Header centré (padding-top: 48px) :
- Logo Naturalink blanc, height 36px
- Titre : "Scanner un produit" — couleur blanc, font-size 22px, font-weight 700
- Sous-titre : "Pointez la caméra vers le QR code Naturalink" — couleur #94A3B8, font-size 14px

Zone de scan (centrée verticalement) :
- Conteneur relatif 280×280px, margin: 40px auto
- L'élément caméra html5-qrcode (#qr-reader) est rendu dans ce conteneur, z-index: 0, opacity visible
- Par-dessus (z-index: 10), superposer le cadre SVG des 4 coins :
  - 4 coins en forme de L, couleur #00E5A0, épaisseur 3px, longueur 28px, border-radius 4px
  - Positionnés aux 4 coins du conteneur en position absolute
- Par-dessus (z-index: 11), la ligne de scan animée :
  - div 100% width, height 2px
  - background: linear-gradient(90deg, transparent 0%, #00E5A0 50%, transparent 100%)
  - box-shadow: 0 0 12px #00E5A0, 0 0 4px #00E5A0
  - Animation CSS : monte de 0% à 100% de top en 2s, boucle infinie

Animation CSS de la ligne :
@keyframes scanLine {
  0%   { top: 0%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

Indicateurs de statut (sous la zone de scan) :
- État "scanning" : point vert #00E5A0 pulsant + texte "Recherche en cours..." en blanc
- État "success" : icône ✅ + texte "Code détecté ! Redirection..." en vert
- État "error" : icône ⚠️ + texte "Autorisez l'accès à la caméra" + bouton "Réessayer"

Halo autour de la zone de scan :
- box-shadow: 0 0 60px rgba(0, 229, 160, 0.08) sur le conteneur

Bouton retour (bas de page) :
- Texte "← Retour à l'accueil" — couleur white, opacity: 0.4, font-size 13px, pas de fond

COMPORTEMENT :
- Au montage : initialise Html5QrcodeScanner, fps 10, qrbox 250, SCAN_TYPE_CAMERA uniquement
- onScanSuccess : setState("success") → setTimeout 700ms → window.location.href = decodedText
- Nettoyage propre sur unmount avec scanner.clear()
- Masquer les éléments HTML natifs injectés par html5-qrcode (boutons, textes) via CSS global :
  #qr-reader__scan_region img { display: none }
  #qr-reader__dashboard { display: none }
  #qr-reader__header_message { display: none }

Ce scanner doit être la page la plus aboutie visuellement du projet.
```

---

### 🔵 PROMPT 6 — Page Traçabilité Publique (`/track/[code]`)

```
Crée la page dynamique /track/[code] (server component).

Charge les données via GET /api/track/[code].

UI Design (mobile-first, moderne) :

Header :
- Fond #0A2540, padding 24px
- Logo Naturalink blanc + nom du produit en grand blanc (font-size 24px, font-weight 700)
- Origine en badge vert clair (#00E5A0 bg à 15%, text #00E5A0) : "🇨🇮 Côte d'Ivoire"

Badge "Vérifié Naturalink" :
- Pastille verte avec ✅, texte "Certifié Naturalink", bg #ECFDF5, text #059669, border 1px #A7F3D0
- Affiché sous le header

Score de confiance (MOCK) :
- Calcul : Math.min(events.length * 20, 100)
- Barre de progression avec dégradé #00E5A0 → #0A2540
- Texte : "🛡️ Score de confiance : XX%"

Badge Blockchain (MOCK VISUEL UNIQUEMENT) :
- Fond #EFF6FF, icône 🔐, texte "Ancré blockchain"
- Hash fictif généré depuis le code (toujours le même pour ce code) : premiers 6 chars + "..." + derniers 4 chars
- PAS de lien cliquable — juste l'affichage visuel
- Texte sous le hash : "Vérification immuable — Powered by Naturalink"

Timeline verticale des TraceEvents :
- Ligne verticale colorée #E2E8F0 qui relie les cartes
- Chaque étape = carte blanche, rounded-2xl, shadow-sm, padding 16px
- Icône selon step : 🌱 Production | 🚚 Transport | 🏭 Transformation | 📦 Distribution | ♻️ Invendu
- Contenu carte : step en bold, acteur, lieu (🗺️ location), date formatée, note en italique gris

Section Invendus (si step "Invendu" présent) :
- Fond #F0FFF4, bordure gauche 4px #22C55E
- Titre : "♻️ Redirection — Réduction des pertes"
- Affiche acteur, lieu, note de l'événement Invendu
- Badge statut : "En cours de traitement" ou "Redistribué" selon la note
- Message : "Naturalink accompagne les producteurs dans la réduction du gaspillage."

Footer :
- Texte centré gris : "Propulsé par Naturalink — naturalink.ink"
- Lien vers /scan : bouton "Scanner un autre produit"
```

---

### 🔵 PROMPT 7 — UI Polish Final

```
Revois l'ensemble de l'application et applique ces règles globales :

1. Toutes les pages ont une meta viewport mobile-first
2. Boutons principaux : bg #00E5A0, text #0A2540, font-weight 600, rounded-xl, hover:scale-105 transition-transform duration-200
3. Boutons secondaires : border-2 border-#0A2540, text #0A2540, bg transparent, hover:bg-#0A2540/5
4. Typographie : Google Fonts Inter, import dans layout.tsx
5. Cartes : bg white, rounded-2xl, shadow-md, padding 20px
6. Page /scan : vérifier compatibilité iOS Safari (getUserMedia HTTPS obligatoire)
7. Ajouter un spinner de chargement Naturalink : cercle animé couleur #00E5A0, utilisé sur tous les fetches
8. Sur mobile, la timeline /track/[code] doit être scrollable, pas de débordement horizontal
9. Favicon : /logo.png
10. Chaque page a un <title> : "Naturalink — [nom de la page]"
11. Sur la page /scan, cacher tous les éléments UI natifs de html5-qrcode via CSS (boutons, headers, messages)
12. Ajouter transition de page douce entre /scan et /track/[code] (flash blanc 300ms)
```

---

## 🎨 Design System Naturalink

| Élément | Valeur |
|---------|--------|
| Couleur primaire | `#0A2540` (bleu nuit) |
| Couleur accent | `#00E5A0` (vert néon) |
| Couleur highlight | `#FF6B00` (orange CI) |
| Fond clair | `#F8FAFC` |
| Fond scanner | `#0A1628` |
| Texte principal | `#0A2540` |
| Texte secondaire | `#64748B` |
| Police | Inter (Google Fonts) |
| Border radius cartes | `16px` |
| Border radius boutons | `12px` |

---

## 📷 Scanner QR — Spécifications UI Détaillées

Le scanner est **la feature la plus visible** du produit — c'est ce que l'utilisateur final voit en premier. Il doit être **irréprochable**.

### Éléments visuels obligatoires

| Élément | Spec |
|---------|------|
| Fond page | `#0A1628` full-screen, dégradé vers `#0F2140` |
| Cadre scan | `280×280px`, coins en L `#00E5A0`, épaisseur `3px` |
| Halo du cadre | `box-shadow: 0 0 60px rgba(0,229,160,0.08)` |
| Ligne animée | `2px`, glow `#00E5A0`, animation `2s` boucle |
| Header | Logo blanc + titre `22px` + sous-titre gris |
| Statut | Point pulsant + texte selon l'état |
| Retour | Texte blanc `opacity: 0.4`, bas de page |

### Animation ligne de scan

```css
@keyframes scanLine {
  0%   { top: 0%;   opacity: 0; }
  10%  { top: 5%;   opacity: 1; }
  90%  { top: 95%;  opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00E5A0, transparent);
  box-shadow: 0 0 12px #00E5A0, 0 0 4px rgba(0,229,160,0.6);
  animation: scanLine 2s ease-in-out infinite;
  pointer-events: none;
  z-index: 11;
}
```

### États du scanner

| État | Visuel |
|------|--------|
| `init` | Spinner `#00E5A0` centré + "Activation caméra..." |
| `scanning` | Ligne animée + point pulsant + "Prêt à scanner" |
| `success` | Flash blanc rapide + "✅ Code détecté !" + redirection |
| `error` | Icône ⚠️ + message + bouton "Réessayer" |

---

## 🔁 Flow Complet MVP

```
[Dashboard /dashboard]
  ↓ Créer produit + batch
  ↓ Générer QR stylisé Naturalink (@liquid-js)
  ↓ Télécharger PNG → imprimer sur packaging
        ↓
[Consommateur scanne le QR]
  ↓ Ouvre naturalink.ink/scan
  ↓ Interface caméra immersive (fond sombre + cadre néon)
  ↓ Ligne de scan animée
  ↓ Détection → flash → redirection
        ↓
[Page /track/[code]]
  ↓ Header produit + badge "Vérifié Naturalink"
  ↓ Score confiance (nb étapes × 20%)
  ↓ Badge blockchain (hash mock, visuel uniquement)
  ↓ Timeline : 🌱 → 🚚 → 🏭 → 📦
  ↓ Section ♻️ invendus si applicable
  ↓ Footer Naturalink
```

---

## 🚀 Roadmap 7 Jours

| Jour | Prompt | Livrable |
|------|--------|----------|
| **Jour 1** | Prompt 1 | Next.js + Prisma + Schéma DB |
| **Jour 2** | Prompt 2 | API Routes backend |
| **Jour 3** | Prompt 3 + 4 | StyledQR + Dashboard backoffice |
| **Jour 4** | Prompt 5 | ⭐ **Scanner QR — UI immersive** |
| **Jour 5** | Prompt 6 | Page traçabilité publique |
| **Jour 6** | Section Invendus + mock blockchain | Expérience complète |
| **Jour 7** | Prompt 7 | UI Polish + Deploy Vercel 🚀 |

---

## ⚡ Résumé Exécutif

| Pilier | Ce qu'on construit réellement |
|--------|-------------------------------|
| 🆔 **Identité produit** | UUID + QR stylisé `@liquid-js` + couleur unique par lot |
| 📷 **Scanner immersif** | Caméra full-screen, cadre néon animé, états visuels soignés |
| 🔗 **Page de vérité** | Timeline DB réelle + badges visuels (blockchain = mock) |
| ♻️ **Invendus** | Section traçabilité sur step "Invendu" + redirection partenaires |
| 🎨 **Design** | UI éclatante Tailwind, mobile-first, palette Côte d'Ivoire |

> **Simple. Rapide. Puissant. Made in Côte d'Ivoire. 🇨🇮**
> *naturalink.ink*

---

## 📌 Nota Bene — À intégrer dans les prompts

---

### NB 1 — Remplacement des boutons CTA du header

Les deux boutons centraux du header de la page d'accueil ("Voir la vidéo" et "Demander une démo") sont à remplacer par les deux actions réelles du produit.

**Bouton A — côté producteur (action principale)**
- Label : **"Tracer un produit"**
- Sous-texte discret : *Pour producteurs, marques et coopératives*
- Action : redirige vers `/dashboard`
- Style : bouton plein, couleur primaire `#0A2540`

**Bouton B — côté consommateur (action secondaire)**
- Label : **"Vérifier un produit"**
- Sous-texte discret : *Pour les consommateurs*
- Action : redirige vers `/scan`
- Style : bouton contour, même couleur

Ces deux labels reflètent exactement ce que fait le produit — pas de jargon, pas de promesse floue. Un producteur comprend immédiatement ce qu'il doit faire. Un consommateur aussi.

> Prompt à utiliser :
> ```
> Dans le header de la page d'accueil, remplace les boutons "Voir la vidéo" et "Demander une démo"
> par deux boutons côte à côte :
>
> Bouton 1 (plein, bg #0A2540, text blanc) :
>   Label principal : "Tracer un produit"
>   Sous-label : "Producteurs · Marques · Coopératives"
>   → redirige vers /dashboard
>
> Bouton 2 (contour, border #0A2540, text #0A2540) :
>   Label principal : "Vérifier un produit"
>   Sous-label : "Consommateurs"
>   → redirige vers /scan
>
> Sur mobile : les deux boutons sont empilés verticalement, pleine largeur.
> Sur desktop : côte à côte, largeur auto, centrés.
> ```

---

### NB 2 — Sections sous le header : épurer le design, sortir du rendu "IA"

Les sections qui suivent le header ne doivent pas ressembler à du contenu généré automatiquement. Pas de blocs de texte denses, pas de listes à puces en cascade, pas de cartes génériques avec icônes emoji alignées en grille 3×3. Ce type de mise en page se reconnaît immédiatement comme du travail d'IA — et ça casse la crédibilité du produit.

**Ce qu'on évite :**
- Sections "Nos fonctionnalités" avec 6 cartes icon + titre + texte
- Titres en majuscules entourés d'emojis
- Textes de 4 lignes qui expliquent ce que l'icône montre déjà
- Grilles symétriques qui semblent auto-générées
- Fond alterné blanc / gris clair sur chaque section

**Ce qu'on vise à la place :**
- **Une seule idée forte par section**, peu de texte, beaucoup d'espace blanc
- **Typographie grande et confiante** — un titre court, une ligne d'accroche, c'est tout
- **Des contrastes clairs** — une section sombre, une section claire, pas de répétition mécanique
- **Du concret visible** — une capture du QR stylisé, le scanner en fonctionnement, la timeline réelle
- **Asymétrie** — texte à gauche + visuel à droite, ou visuel pleine largeur avec texte superposé

> Prompt à utiliser :
> ```
> Refais les sections sous le header de la page d'accueil avec les contraintes suivantes :
>
> Règles absolues :
> - Maximum 2 phrases par section
> - Pas de grille de fonctionnalités avec icônes
> - Pas de liste à puces
> - Beaucoup d'espace blanc (padding vertical minimum 80px par section)
> - Typographie grande : titres en font-size 36–48px, poids 700
> - Chaque section a UN seul message, pas trois
>
> Structure des sections (dans l'ordre) :
>
> Section 1 — Le QR code Naturalink
>   Visuel : affiche un exemple de QR stylisé (composant StyledQR avec un code démo)
>   Titre : "Une identité unique pour chaque produit."
>   Accroche : "Généré en un clic. Scannable par tous."
>   Pas d'autres éléments.
>
> Section 2 — La chaîne de traçabilité
>   Layout : texte à gauche, capture de la timeline à droite
>   Titre : "De la ferme à l'étagère."
>   Accroche : "Chaque étape enregistrée, visible par le consommateur final."
>
> Section 3 — La redirection des invendus
>   Fond sombre #0A2540, texte blanc
>   Titre : "Les invendus ne disparaissent pas. Ils sont redirigés."
>   Accroche : "Naturalink ferme la boucle de la chaîne de valeur."
>
> Ton général : sobre, direct, sans fioritures. On parle à des professionnels.
> ```

---

### NB 3 — Section vitrine des produits tracés sur la landing page

**Nom retenu : "Produits certifiés"**

Alternatives possibles selon le ton souhaité :
- "Déjà tracés" — direct, factuel, montre de l'activité
- "Sur la chaîne" — poétique, ivoirien
- "Certifiés Naturalink" — institutionnel, rassurant pour les acheteurs

La section affiche en temps réel les derniers lots tracés sur la plateforme. Elle sert de preuve sociale : le consommateur voit que le système est vivant, utilisé, réel.

**Design de la section :**
- Titre sobre : `"Produits certifiés"` + sous-titre : `"Tracés et vérifiables en temps réel"`
- Pas de grille. Un défilement horizontal de cartes (scroll horizontal sur mobile, visible sur desktop)
- Chaque carte = 1 batch tracé :
  - Le QR stylisé miniature (160×160px)
  - Nom du produit
  - Catégorie (badge pill : Cacao / Café / Textile…)
  - Origine : "🇨🇮 Côte d'Ivoire"
  - Nombre d'étapes tracées : "4 étapes · Vérifié"
  - Lien discret : "Voir la traçabilité →" → `/track/[code]`
- Les cartes les plus récentes apparaissent en premier
- Limite d'affichage : 8 derniers batches publics

> Prompt à utiliser :
> ```
> Sur la page d'accueil, ajoute une section "Produits certifiés" après les sections de présentation.
>
> Données : fetch GET /api/track/latest → retourne les 8 derniers batches avec leur produit et
> le nombre de TraceEvents associés. Créer cette route si elle n'existe pas.
>
> Layout :
> - Titre : "Produits certifiés" en font-size 32px, font-weight 700, couleur #0A2540
> - Sous-titre : "Tracés et vérifiables en temps réel" en gris #64748B, font-size 16px
> - Conteneur : scroll horizontal (overflow-x: auto, scrollbar masquée), gap 16px
> - Pas de grid. flex-row, nowrap.
>
> Carte produit (largeur fixe 200px, hauteur auto) :
> - Fond blanc, rounded-2xl, shadow-sm, border 1px solid #F1F5F9
> - padding 16px
> - QR miniature : composant StyledQR width=160 height=160, centré
> - Nom produit : font-weight 600, font-size 15px, couleur #0A2540, margin-top 12px
> - Badge catégorie : pill bg #F0FFF4, text #16A34A, font-size 12px
> - Origine : "🇨🇮 Côte d'Ivoire" text #64748B, font-size 12px
> - Étapes : "X étapes · Vérifié ✓" text #00E5A0, font-size 12px, font-weight 600
> - Lien : "Voir →" couleur #0A2540, font-size 13px, hover underline
>
> Sur mobile : scroll horizontal naturel, première carte partiellement visible pour signaler le scroll.
> Sur desktop : les cartes s'affichent sur une ligne, scroll si nécessaire.
> Pas de pagination. Pas de bouton "Voir plus". Simple et propre.
> ```

---

### NB 4 — Téléchargement du QR code en PDF sticker imprimable

Le PDF généré n'est pas un document classique. C'est un **sticker prêt à imprimer**, format physique, pensé pour être collé sur un emballage, un sac, une étiquette produit.

**Format du sticker PDF :**
- Taille page : 85×55mm (format carte de visite / étiquette standard)
- Ou : 62×62mm (format étiquette carrée, compatible imprimantes thermiques)
- Orientation : portrait
- Fond blanc, pas de marges excessives

**Contenu du sticker (de haut en bas) :**
```
[Logo Naturalink — petit, centré, 20px de haut]
[QR Code stylisé — 160×160px, centré]
[Nom du produit — font-weight 700, font-size 10pt]
[Origine — "🇨🇮 Côte d'Ivoire" — font-size 8pt, gris]
[URL courte — "naturalink.ink/track/XXXX" — font-size 7pt, gris clair]
[Ligne fine séparatrice]
["Certifié Naturalink ✓" — font-size 7pt, vert #00E5A0]
```

**Technologie recommandée :** `jsPDF` + `html2canvas` (côté client, pas de serveur nécessaire)

**Flow utilisateur dans le dashboard :**
1. Le batch est généré, le QR s'affiche
2. Sous le QR : deux boutons côte à côte
   - `↓ Télécharger PNG` — export image brute
   - `↓ Télécharger Sticker PDF` — export sticker imprimable
3. Clic sur "Sticker PDF" → génère le PDF en mémoire → déclenche le téléchargement → `naturalink-sticker-[code].pdf`

> Prompt à utiliser :
> ```
> Dans le dashboard, après l'affichage du QR stylisé, ajoute un bouton "↓ Sticker PDF".
>
> Installe : npm install jspdf html2canvas
>
> Crée un composant StickerPDF.tsx ("use client") qui :
>
> 1. Rend un div masqué (#sticker-preview) avec ce contenu exact :
>    - Logo /logo.png centré, height 20px
>    - QR Code (canvas du composant StyledQR), centré, 160×160px
>    - Nom du produit en font-weight 700, font-size 10pt, centré
>    - Texte "Côte d'Ivoire" en gris, font-size 8pt
>    - URL "naturalink.ink/track/[code]" en gris clair, font-size 7pt
>    - Ligne hr fine (#E2E8F0)
>    - Texte "Certifié Naturalink ✓" en #00E5A0, font-size 7pt
>    Style du div : width 240px, padding 16px, bg blanc, font-family Inter, text-align center
>    Ce div est position: absolute, left: -9999px (hors écran, pas visible)
>
> 2. Sur clic du bouton :
>    - html2canvas(document.getElementById('sticker-preview'), { scale: 3 })
>      → scale 3 pour haute résolution impression
>    - const pdf = new jsPDF({ unit: 'mm', format: [62, 85], orientation: 'portrait' })
>    - pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 62, 85)
>    - pdf.save(`naturalink-sticker-${code}.pdf`)
>
> Boutons finaux sous le QR (côte à côte) :
>   [↓ Image PNG]   [↓ Sticker PDF]
>   Style : petits boutons, contour #0A2540, font-size 13px, rounded-lg
> ```
