# Réservation de salle
Ce projet est constitué d'un backend et d'un front end permettant la réservation de salles de la M2L.

## Prérequis
Le projet nécessite le téléchargement et l'installation de [Node](https://nodejs.org/en/) et de [MongoDB](https://www.mongodb.org/).

1. En commande, se rendre dans le dossier `PPE2\Production\Maquette` du projet
2. Executer `npm install`
3. En commande, se rendre dans le dossier d'installation de mongoDB (pour windows, le chemin par défaut est `C:\Program Files\MongoDB\Server\3.2\bin`)
4. Executer `mongod`, ceci lance la base de donnée

## Lancer le projet
Pour lancer le projet pour le développement : 

Si `webpack-dev-server` ne se trouve pas dans votre variable path, executer `npm install -g webpack-dev-server`

1. En commande, se rendre dans le dossier `PPE2\Production\Maquette` du projet
2. Executer `Node server`, ceci lance le serveur
3. Executer `webpack-dev-server` dans une nouvelle fenêtre, ceci lance le serveur de développement

Le projet sera servi sur le port 8080.

## Version production
Pour créer la version production minifiée du front end :

Si `webpack` ne se trouve pas dans votre variable path, executer `npm install -g webpack`

1. En commande, se rendre dans le dossier `PPE2\Production\Maquette` du projet
2. Executer `webpack --optimize--minimize --config webpack.prod.config.js`

La version minifiée du code se trouve dans le dossier `PPE2\Production\Maquette\public` du projet.

Si le serveur n'est pas lancé, executez `Node server` dans le dossier `PPE2\Production\Maquette` du projet.

Le projet sera servi sur le port 1000. Vous pouvez le changer dans le fichier de [configuration](https://github.com/metaxiii/PPE2/blob/master/PPE2/Production/Maquette/server/common/config.js).