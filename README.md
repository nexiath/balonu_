# Balonu

Bienvenue sur le repository du projet **Balonu**, une plateforme web dédiée à la présentation et à la gestion des manifestations de montgolfières dans la magnifique région de la Cappadoce.

## À propos du Projet

Ce projet vise à fournir une expérience utilisateur complète pour les personnes souhaitant participer à des manifestations de montgolfières en Cappadoce. Il couvre à la fois le backend, qui gère la logique métier et la base de données, et le frontend, qui offre une interface utilisateur intuitive et réactive.

## Fonctionnalités

- **Calendrier des Événements :** Consultez le calendrier pour les prochaines manifestations.
- **Réservation en Ligne :** Réservez votre place pour une aventure inoubliable en montgolfière.
- **Informations Touristiques :** Découvrez la Cappadoce, son histoire et ses sites touristiques.
- **Galerie :** Parcourez les photos des précédentes manifestations.
- **Contact et Support :** Contactez-nous pour toute question ou assistance.

## Technologies Utilisées

- **Backend :** Node.js / Express.js
- **Frontend :** React.js avec une approche responsive design
- **Base de données :** MongoDB
- **Authentification :** JWT pour une connexion sécurisée
- **APIs :** Intégration de Google Maps pour les localisations des manifestations

## Installation

Pour installer et lancer le projet en local, suivez ces étapes :

```bash
# Cloner le dépôt
git clone https://github.com/nexiath/balonuu.git

# Naviguer dans le répertoire du projet
cd API_Balonu

# Installer les dépendances du backend
cd API_Balonu
npm install

# Installer les dépendances du frontend
cd ../balonu
npm install

# Lancer le serveur backend
node index.js

# Dans un nouveau terminal, lancer l'application frontend
cd ../balonu
npm run serve
