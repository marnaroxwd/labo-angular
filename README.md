# 🎮 Labo Angular

Ce projet a été générer en utilisant [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.
## 📌 Description

Ce projet est une application frontend développée avec Angular.
Il est **connecté à une API backend Express** disponible ici :
👉 https://github.com/marnarox/labo-api-express

L’application permet de gérer et consulter des **tournois**, avec des fonctionnalités différentes selon que l’utilisateur est connecté ou administrateur.

---

## 🔗 Lien avec le backend

Ce projet dépend directement de l’API Express.

⚠️ Important :

* Le backend doit être **lancé avant le frontend**
* La base de données doit être **seedée**
* Le frontend communique avec l’API via des requêtes HTTP

### Configuration `.env`

Il est nécessaire de configurer correctement le fichier `.env` :

```env
API_URL=http://localhost:PORT
```

👉 Le `PORT` doit correspondre au port utilisé par le backend Express.

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/marnarox/labo-angular
cd labo-angular
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le projet

```bash
ng serve
```

Application disponible sur :
👉 http://localhost:4200/

---

## 🔐 Authentification

L’application propose :

* un système de **login**
* un système de **register**

L’authentification est gérée avec :

* un **JWT (JSON Web Token)**
* un **interceptor Angular** pour ajouter automatiquement le token aux requêtes

---

## 🛡️ Sécurité et gestion des requêtes

Plusieurs mécanismes sont en place :

* **Guards Angular**
  → protègent les routes (ex : dashboard admin)

* **JWT Interceptor**
  → ajoute le token aux requêtes HTTP

* **Error Interceptor**
  → gère les erreurs globales

* **Loading Interceptor**
  → gère l’état de chargement

---

## 🧭 Navigation et pages

### 🏠 Page d’accueil

* Affiche la liste de tous les tournois

### 📄 Page détail d’un tournoi

* Affiche les informations d’un tournoi
* Le contenu change selon :

  * utilisateur non connecté
  * utilisateur connecté
  * administrateur

Fonctionnalités :

* inscription à un tournoi
* boutons dynamiques selon :

  * état du tournoi
  * statut utilisateur

---

### 🔑 Dashboard (Admin uniquement)

Accessible uniquement si connecté en tant qu’administrateur.

Fonctionnalités :

* consulter la liste des tournois
* supprimer des tournois
* accéder à un tournoi pour le démarrer

---

## ❌ Gestion des erreurs

L’application gère :

* erreurs **404 (page non trouvée)**
* erreurs **500 (erreur serveur)**

---

## ⚙️ Fonctionnement global

1. L’utilisateur accède à l’application Angular
2. Les données sont récupérées depuis l’API Express
3. Les actions (login, inscription, gestion tournoi) passent par le backend
4. Le frontend adapte l’affichage selon :

   * authentification
   * rôle utilisateur
   * état des tournois

---

## ⚠️ Prérequis importants

Avant de lancer le projet :

* ✅ Lancer le backend `labo-api-express`
* ✅ Configurer le `.env`
* ✅ Vérifier le port de l’API
* ✅ Seeder la base de données

---

## 🛠️ Commandes utiles

```bash
ng serve     # lancer le serveur
ng build     # build du projet
ng test      # tests unitaires (Vitest)
```

---

## 🚧 Améliorations prévues

* Finition du CSS de la page détail
* Finition du CSS de la filter bar
* Ajout du routage pour l’édition d’un tournoi
* Ajout du listing des membres dans le dashboard

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre d’un laboratoire Angular à.
