# book_movie

## Description

book_movie est une application web permettant de gérer des livres et des films. Les utilisateurs peuvent ajouter, modifier, supprimer et consulter des livres et des films via une interface utilisateur intuitive. Le projet utilise Node.js, Express, MongoDB et TailwindCSS pour fournir une solution complète de gestion.

## Fonctionnalités

### Gestion des livres

- Ajouter un livre avec un titre, un auteur, un éditeur et une catégorie.
- Modifier les informations d'un livre existant.
- Supprimer un livre.
- Afficher la liste des livres.

### Gestion des films

- Ajouter un film avec un titre, un réalisateur, des acteurs et une catégorie.
- Modifier les informations d'un film existant.
- Supprimer un film.
- Afficher la liste des films.

### Notifications

- Affichage de notifications (toasts) pour confirmer les actions (ajout, modification, suppression).

## Structure du Projet

```
book_movie/
├── .gitignore
├── jenkinsfile
├── package.json
├── public/
│ ├── css/
│ │ ├── input.css
│ │ └── output.css
│ ├── html/
│ │ ├── adminpanel.html
│ │ ├── connexion.html
│ │ ├── index.html
│ │ └── inscription.html
│ ├── js/
│ │ ├── addcomment.js
│ │ ├── connexion.js
│ │ ├── crudmoviebook.js
│ │ ├── elementdisplay.js
│ │ ├── inscription.js
│ │ └── tmp.js
├── README.md
├── server.js
├── src/
│ ├── controllers/
│ │ ├── bookController.js
│ │ ├── bookNoteController.js
│ │ ├── movieController.js
│ │ ├── movieNoteController.js
│ │ └── userController.js
│ ├── model/
│ │ ├── Book.js
│ │ ├── BookNotes.js
│ │ ├── Movie.js
│ │ └── MovieNotes.js
│ ├── routes/
│ │ └── ...
│ └── tmp.js
└── template/
└── navbar.html
```

## Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- MongoDB (local ou distant)

### Étapes

Clonez le dépôt :

```
git clone https://github.com/lefarmer01600/book_movie.git
cd book_movie
```

Installez les dépendances :

```
npm install
```

Configurez la base de données MongoDB :

- Assurez-vous que MongoDB est en cours d'exécution.
- Modifiez l'URI MongoDB dans le fichier jenkinsfile ou dans votre configuration locale si nécessaire.

Démarrez l'application en mode développement :

```
npm run dev
```

Accédez à l'application dans votre navigateur à l'adresse :

```
http://localhost:3000
```

## Utilisation

### Ajout d'un livre ou d'un film

- Remplissez les champs du formulaire correspondant et cliquez sur "Ajouter".

### Modification

- Cliquez sur le bouton "Modifier" pour ouvrir le formulaire de modification.
- Apportez vos modifications et enregistrez-les.

### Suppression

- Cliquez sur le bouton "Supprimer" pour retirer un livre ou un film.

## Déploiement

Le projet peut être déployé en production via un pipeline Jenkins. Voici les étapes principales définies dans le fichier jenkinsfile :

- Clonage du dépôt.
- Installation des dépendances.
- Vérification du serveur (tests à ajouter ultérieurement).
- Déploiement manuel ou via SCP.

## Technologies Utilisées

### Backend

- Node.js
- Express.js
- MongoDB (via Mongoose)

### Frontend

- HTML, CSS, JavaScript
- TailwindCSS

### Outils

- Jenkins pour l'intégration continue
- Nodemon pour le développement

## Contribuer

Les contributions sont les bienvenues ! Suivez ces étapes pour contribuer :

- Forkez le projet.
- Créez une branche pour votre fonctionnalité :

```
git checkout -b feature/nom-de-la-fonctionnalite
```

- Faites vos modifications et validez-les :

```
git commit -m "Ajout de la fonctionnalité X"
```

- Poussez vos modifications :

```
git push origin feature/nom-de-la-fonctionnalite
```

- Ouvrez une Pull Request.