# Service de Gestion des Clients - PayeTonKawa

## À propos

Ce service fait partie de l'architecture microservices de PayeTonKawa, une plateforme de vente de café en ligne. Il est responsable de la gestion des clients, incluant l'inscription, la mise à jour des informations personnelles et la suppression des comptes.

## Fonctionnalités

- Création de nouveaux comptes clients
- Consultation des informations clients
- Mise à jour des données clients
- Suppression de comptes clients
- Communication événementielle via Kafka

## Technologies Utilisées

- Node.js 20
- AdonisJS 6
- PostgreSQL
- Kafka pour la communication événementielle
- Docker et Docker Compose pour la conteneurisation

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Node.js 20 ou supérieur (pour le développement local)
- npm (gestionnaire de paquets Node.js)

## Installation

### Avec Docker (Recommandé)

1. Clonez le repository :
```bash
git clone [url-du-repo]
cd mspr2_client_service
```

2. Lancez les conteneurs avec Docker Compose :
```bash
docker-compose up -d
```

L'application sera accessible sur `http://localhost:3333`

### Installation Locale (Développement)

1. Installez les dépendances :
```bash
npm install
```

2. Configurez les variables d'environnement :
- Copiez le fichier `.env.example` en `.env`
- Ajustez les variables selon votre environnement

3. Lancez l'application en mode développement :
```bash
npm run dev
```

## API Endpoints

Base URL : `/payetonkawa/api/v1`

### Clients

- `POST /storeCustomer` - Créer un nouveau client
- `GET /customers` - Lister tous les clients
- `GET /customer/:id` - Obtenir les détails d'un client
- `PATCH /updateCustomer/:id` - Mettre à jour un client
- `DELETE /deleteCustomer/:id` - Supprimer un client

## Architecture

Le service utilise une architecture en couches :
- Controllers : Gestion des requêtes HTTP
- Services : Logique métier
- Models : Interaction avec la base de données
- Validators : Validation des données entrantes
- Events : Communication via Kafka

## Tests

Pour exécuter les tests :
```bash
npm run test
```

## Scripts Disponibles

- `npm run dev` : Lance le serveur en mode développement
- `npm run build` : Compile le projet
- `npm start` : Lance le serveur en production
- `npm run lint` : Vérifie le style du code
- `npm run format` : Formate le code
- `npm run typecheck` : Vérifie les types TypeScript

