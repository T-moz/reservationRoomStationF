# reservationRoomStationF
Système de réservation de salle.

Installation

run npm install in folder roomstationf/back

run npm install in folder roomstationf/front/roomReservation

run npm install -g @angular/cli in folder roomstationf/front/roomReservation

Pour pouvoir établir une connexion entre le serveur et le client, il faut désactiver la sécurité du navigateur.
par exemple allez dans le dossier d'installation de chrome, et tapez la commande suvante :
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

Il est nécéssare de lancer le client dans cette fenetre non sécurisé du navigateur.

Pour lancer le serveur :
run node app.js in folder roomstationf/back

pour lancer le client:
un ng serve --open in folder roomstationf/front/roomReservation
