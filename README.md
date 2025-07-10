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
- Node.js (v18 ou supérieur)
- PostgreSQL (v14 ou supérieur)
- Docker et Docker Compose (pour le déploiement conteneurisé)
- Kafka (pour la communication inter-services)

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
cp .env.example .env .env.test
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
- Authentification par token JWT avec expiration
- Validation stricte des données entrantes avec Vine
- Protection CORS configurée
- Vérification des rôles et permissions
- Double authentification pour les administrateurs (token + matricule)
- Hachage des mots de passe avec Argon2
- Rate limiting sur les routes sensibles
- Logs de sécurité pour les tentatives d'accès non autorisées

## Monitoring
- Logs d'API
- Logs d'erreurs
- Métriques Prometheus
- Dashboard Grafana pour la visualisation

## Tests
```bash
# Exécuter tous les tests
npm test
```

## Docker
### Services de base
```bash
docker-compose up -d
```

