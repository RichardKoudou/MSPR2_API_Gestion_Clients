# Service de Gestion des Clients

Ce service gère l'authentification et les opérations CRUD pour les clients de l'application.

## Fonctionnalités

### Gestion des Utilisateurs
- Création de compte (Particulier ou Professionnel)
- Authentification sécurisée
- Modification des informations personnelles
- Suppression de compte
- Déconnexion sécurisée

### Rôles Utilisateurs
- **Particulier** : Accès aux fonctionnalités de base
- **Professionnel** : Accès aux fonctionnalités de base avec informations entreprise (SIRET)
- **Admin** : Accès à toutes les fonctionnalités avec code d'authentification spécial

## Configuration Requise
- Node.js
- PostgreSQL
- Docker (optionnel)

## Installation

1. Cloner le repository
```bash
git clone [url-du-repo]
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Modifier les variables dans .env selon votre environnement
```

4. Lancer les migrations
```bash
node ace migration:run
```

## Démarrage

### Développement
```bash
node ace serve --watch
```

### Production
```bash
node server.js
```

## Routes API

### Authentification
- POST `/login` : Connexion utilisateur
- POST `/logout` : Déconnexion utilisateur (requiert authentification)

### Gestion des Utilisateurs
- POST `/customers` : Création d'un nouveau client
- GET `/customers/:id` : Récupération des informations d'un client
- PUT `/customers/:id` : Modification des informations d'un client
- DELETE `/customers/:id` : Suppression d'un client

### Administration
- GET `/customers` : Liste tous les clients (réservé aux administrateurs)
  - Requiert le rôle 'admin'
  - Nécessite un code administrateur valide

## Sécurité
- Authentification par token JWT
- Validation des données entrantes
- Protection CORS
- Vérification des rôles
- Double authentification pour les actions administrateur

## Monitoring
- Logs d'API
- Logs d'erreurs
- Métriques Prometheus

## Tests
```bash
npm test
```

## Docker
```bash
docker-compose up -d
```

