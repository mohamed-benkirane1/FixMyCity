# FixMyCity - Frontend

Application React moderne pour signaler et gérer les problèmes urbains.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 16+ et npm (ou yarn)
- Backend FixMyCity démarré sur `http://localhost:5000`

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

### Build de production

```bash
npm run build
```

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Badge.jsx       # Badge de statut
│   ├── Button.jsx      # Bouton réutilisable
│   ├── Card.jsx        # Carte conteneur
│   ├── EmptyState.jsx  # État vide
│   ├── ErrorState.jsx  # État d'erreur
│   ├── FiltersBar.jsx # Barre de filtres et recherche
│   ├── Header.jsx      # En-tête de navigation
│   ├── Footer.jsx      # Pied de page
│   ├── Loader.jsx      # Indicateur de chargement
│   └── ReportCard.jsx  # Carte de signalement
├── context/            # Contextes React
│   └── AuthContext.js  # Contexte d'authentification
├── services/           # Services API
│   ├── api.js          # Instance axios centralisée
│   ├── auth.service.js # Service d'authentification
│   └── report.service.js # Service des signalements
├── styles/             # Design system
│   └── variables.css   # Variables CSS globales
└── pages/              # Pages de l'application
    ├── Home.jsx
    ├── Reports.jsx
    ├── MyReports.jsx
    ├── ReportDetails.jsx
    ├── ReportNew.jsx
    ├── Dashboard.jsx
    ├── Login.jsx
    └── Register.jsx
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet frontend :

```env
# URL de l'API backend (optionnel en développement grâce au proxy)
REACT_APP_API_URL=http://localhost:5000/api

# En production, utilisez l'URL complète de votre backend
# REACT_APP_API_URL=https://api.votredomaine.com/api
```

**Note** : En développement, le proxy configuré dans `setupProxy.js` redirige automatiquement `/api` vers `http://localhost:5000`. Vous n'avez donc pas besoin de définir `REACT_APP_API_URL` en développement.

### Proxy de développement

Le fichier `setupProxy.js` configure un proxy pour rediriger les requêtes `/api` vers le backend local (`http://localhost:5000`). Cela évite les problèmes CORS en développement.

## 🐛 Troubleshooting

### Problème : Les signalements ne se chargent pas

**Symptômes** :
- Liste vide
- Erreur dans la console du navigateur
- Message "Erreur lors du chargement des signalements"

**Solutions** :

1. **Vérifier que le backend est démarré**
   ```bash
   # Le backend doit être accessible sur http://localhost:5000
   curl http://localhost:5000/api/reports
   ```

2. **Vérifier le token d'authentification**
   - Ouvrez les DevTools (F12) → Onglet Application → Local Storage
   - Vérifiez qu'un token existe avec la clé `token`
   - Si absent, reconnectez-vous

3. **Vérifier l'URL de l'API**
   - Ouvrez les DevTools → Onglet Network
   - Vérifiez que les requêtes partent vers `/api/reports` (proxy) ou vers l'URL configurée
   - En développement, les requêtes doivent utiliser le proxy (`/api`)

4. **Vérifier les erreurs CORS**
   - Si vous voyez des erreurs CORS, vérifiez que le proxy fonctionne
   - Redémarrez le serveur de développement : `npm start`

5. **Vérifier le format de la réponse**
   - Le backend doit retourner `{ reports: [...] }` ou `{ report: {...} }`
   - Le service `api.js` gère automatiquement différents formats

### Problème : Erreur 401 (Non autorisé)

**Cause** : Token manquant ou expiré

**Solution** :
1. Déconnectez-vous et reconnectez-vous
2. Vérifiez que le token est bien sauvegardé dans localStorage
3. Vérifiez que le backend accepte le format `Bearer <token>`

### Problème : Erreur 403 (Accès interdit)

**Cause** : Rôle utilisateur insuffisant

**Solution** :
- Vérifiez que votre compte a le bon rôle (citoyen, agent, admin)
- Certaines routes nécessitent des rôles spécifiques :
  - `/api/reports` : agent ou admin
  - `/api/reports/mine` : citoyen
  - `/api/reports/:id/status` : agent ou admin

### Problème : Les images ne s'affichent pas

**Cause** : URL d'image incorrecte

**Solution** :
1. Vérifiez que `REACT_APP_API_URL` est correctement configuré
2. Les images sont servies par le backend à `/uploads/<filename>`
3. L'URL complète est : `${REACT_APP_API_URL}/uploads/<filename>`
4. En développement avec proxy : `/api/uploads/<filename>`

### Problème : Timeout des requêtes

**Cause** : Backend trop lent ou inaccessible

**Solution** :
1. Vérifiez que le backend répond rapidement
2. Le timeout est configuré à 30 secondes dans `api.js`
3. Augmentez le timeout si nécessaire dans `src/services/api.js`

### Problème : Erreur "Network Error" ou "ECONNREFUSED"

**Cause** : Backend non démarré ou URL incorrecte

**Solution** :
1. Vérifiez que le backend est démarré : `http://localhost:5000`
2. Vérifiez la configuration du proxy dans `setupProxy.js`
3. Vérifiez `REACT_APP_API_URL` dans `.env`

## 📝 Endpoints API utilisés

- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/auth/profile` - Profil utilisateur
- `GET /api/reports` - Liste tous les signalements (agent/admin)
- `GET /api/reports/mine` - Mes signalements (citoyen)
- `GET /api/reports/:id` - Détails d'un signalement
- `POST /api/reports` - Créer un signalement (citoyen)
- `PUT /api/reports/:id/status` - Mettre à jour le statut (agent/admin)

## 🎨 Design System

Le projet utilise un design system basé sur CSS Modules et variables CSS :

- **Variables CSS** : `src/styles/variables.css`
- **Composants** : CSS Modules pour chaque composant
- **Pas de Tailwind** : Utilisation de CSS vanilla avec variables

### Variables principales

- Couleurs : `--color-primary`, `--color-success`, `--color-error`, etc.
- Espacements : `--spacing-xs` à `--spacing-3xl`
- Rayons : `--radius-sm` à `--radius-full`
- Ombres : `--shadow-sm` à `--shadow-xl`

## 🔐 Authentification

L'authentification utilise JWT stocké dans `localStorage` :

- Token : `localStorage.getItem('token')`
- User : `localStorage.getItem('user')`

Le token est automatiquement ajouté aux requêtes via l'intercepteur axios dans `api.js`.

## 📱 Responsive

L'application est entièrement responsive :

- Mobile : < 640px
- Tablet : 640px - 1024px
- Desktop : > 1024px

## 🧪 Tests

```bash
npm test
```

## 📦 Build

```bash
# Build de production
npm run build

# Les fichiers optimisés seront dans le dossier build/
```

## 🚀 Déploiement

1. Configurez `REACT_APP_API_URL` avec l'URL de production de votre backend
2. Build : `npm run build`
3. Déployez le contenu du dossier `build/` sur votre serveur web

## 📄 Licence

Ce projet fait partie de FixMyCity.
