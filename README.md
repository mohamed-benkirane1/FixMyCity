FixMyCity 🏙️

Plateforme citoyenne de signalement et de gestion des problèmes urbains

📌 Présentation du projet

FixMyCity est une application web permettant aux citoyens de signaler des problèmes urbains (routes dégradées, déchets, éclairage public, etc.) et aux autorités de suivre, traiter et résoudre ces signalements.

L’objectif du projet est d’améliorer la communication entre les citoyens et les administrations locales grâce à une plateforme moderne, sécurisée et facile à utiliser.

Ce projet a été réalisé dans le cadre d’un Projet de Fin d’Année (PFA).

🧱 Architecture générale

Le projet est composé de deux parties principales :

Back-end : API REST sécurisée (Node.js + Express + MongoDB)

Front-end : Application web (React)

Le front-end communique avec le back-end via des requêtes HTTP (API REST).

⚙️ Technologies utilisées
Back-end

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

bcryptjs

Multer (upload d’images)

dotenv

Front-end

React.js

JavaScript (ES6)

HTML5 / CSS3

Fetch API

📁 Structure du projet
FixMyCity/
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.js
│   │   ├── ReportController.js
│   │   └── UserController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── UserModel.js
│   │   └── ReportModel.js
│   │
│   ├── routes/
│   │   ├── AuthRoute.js
│   │   ├── ReportRoute.js
│   │   └── UserRoute.js
│   │
│   ├── uploads/
│   │
│   └── index.js
│
├── front-end/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Reports.jsx
│   │   ├── MyReports.jsx
│   │   ├── ReportNew.jsx
│   │   ├── ReportDetails.jsx
│   │   ├── About.jsx
│   │   ├── Forbidden.jsx
│   │   └── NotFound.jsx
│   │
│   └── components/
│
├── .env.example
├── package.json
├── README.md
└── .gitignore

🔐 Authentification et rôles

L’authentification est basée sur JWT (JSON Web Token).

Rôles utilisateurs :

citoyen

créer un compte

se connecter

créer un signalement

consulter ses propres signalements

agent

consulter tous les signalements

mettre à jour le statut des signalements

admin

gérer les rôles

contrôler les accès

Les routes sont protégées par des middlewares d’authentification et de gestion des rôles (RBAC).

📝 Gestion des signalements

Un signalement contient :

titre

description

type de problème

image (optionnelle)

latitude et longitude

statut (recu, en_cours, resolu)

utilisateur créateur

Fonctionnalités :

création d’un signalement

affichage de tous les signalements

affichage des signalements personnels

mise à jour du statut (agent/admin)

🌐 Front-end (React)

Le front-end permet :

l’inscription et la connexion des utilisateurs

l’affichage des signalements

la création de nouveaux signalements

la gestion des pages protégées selon le rôle

l’affichage des erreurs (403, 404)

La communication avec le back-end se fait via fetch API avec transmission du JWT dans les headers.

🚀 Installation et lancement
1️⃣ Cloner le projet
git clone https://github.com/ton-repo/FixMyCity.git
cd FixMyCity

2️⃣ Installation du back-end
npm install


Créer le fichier .env à partir de .env.example :

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/fixmycity
JWT_SECRET=your_jwt_secret


Lancer le serveur :

npm run dev


Le back-end est accessible sur :

http://localhost:4000

3️⃣ Installation du front-end
cd front-end
npm install
npm start


Le front-end est accessible sur :

http://localhost:3000

🔌 Principales routes API
Authentification

POST /api/auth/register

POST /api/auth/login

Signalements

POST /api/reports

GET /api/reports

GET /api/reports/mine

GET /api/reports/:id

PUT /api/reports/:id/status

🧪 Tests

Les tests de l’API sont réalisés avec Postman :

création de compte

connexion et récupération du JWT

accès aux routes protégées

vérification des rôles

🛡️ Sécurité

mots de passe hashés (bcrypt)

authentification JWT

contrôle d’accès par rôle (RBAC)

protection des routes sensibles

gestion centralisée des erreurs
