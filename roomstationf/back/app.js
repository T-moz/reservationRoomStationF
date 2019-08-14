const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

// init firebase
var firebase = require("firebase");
var firebaseConfig = {
  apiKey: "AIzaSyAi166eN85pNTSc_xzGOQApA3rl33g9kgY",
  authDomain: "stationf-6f2b1.firebaseapp.com",
  databaseURL: "https://stationf-6f2b1.firebaseio.com",
  projectId: "stationf-6f2b1",
  storageBucket: "",
  messagingSenderId: "443404514933",
  appId: "1:443404514933:web:987b694cd39b4569"
};
firebase.initializeApp(firebaseConfig);

// ----------------------------------------------------------------

/*
 * déclaration des end points
 */

// il faut bien apprendre...
app.get("/", (req, res) => res.send("Hello World!"));

// Test à l'initialisation du client, si la connexion au serveur fonctionne
app.get("/test", (req, res) => {
  res.send(JSON.stringify("Connection to server is working!"));
});

// enregistre une reservation
app.post("/makeAreservation", (req, res) => {
  firebase
    .database()
    .ref("/reservations")
    .push(req.body)
    .then(
      () => {
        res.send(JSON.stringify("Votre réservation a bien été enregistré."));
      },
      error => {
        //res.send(JSON.stringify(error))
      }
    );
});

// Rechercher les salle disponibles

app.post("/aviable", (req, res) => {
  let data = req.body;
  let roomsDispo = [
    "disponible",
    "disponible",
    "disponible",
    "disponible",
    "disponible"
  ];
  firebase
    .database()
    .ref("/reservations")
    .orderByChild("date")
    .equalTo(data.date)
    .once("value")
    .then(
      reservations => {
        // ce n'est pas optimal de faire une request à la suite d'une autre, mais je manque de temps
        firebase
          .database()
          .ref("rooms")
          .once("value")
          .then(
            rooms => {
              if (reservations.val()) {
                  const theresa = reservations.val()
                for (let resa in theresa) {
                  const areservation = theresa[resa];
                  let aRoom = rooms.val()[areservation.room];
                  console.log(aRoom);
                  // On calcule quelles sont les salles disponibles
                  // dabors l'horraire de début
                  let resStartsplit = areservation.start.split(":");
                  let resStart =
                    parseInt(resStartsplit[0]) +
                    parseInt(resStartsplit[1]) / 100;
                  let aRoomStartsplit = data.start.split(":");
                  let aRoomStart =
                    parseInt(aRoomStartsplit[0]) +
                    parseInt(aRoomStartsplit[1]) / 100;
                  // ensuite l'horraire de fin
                  let resEndsplit = areservation.end.split(":");
                  let resEnd =
                    parseInt(resEndsplit[0]) + parseInt(resEndsplit[1]) / 100;
                  let aRoomEndsplit = data.end.split(":");
                  let aRoomEnd =
                    parseInt(aRoomEndsplit[0]) +
                    parseInt(aRoomEndsplit[1]) / 100;

                  if (
                    (resEnd <= aRoomStart || resStart >= aRoomEnd) &&
                    aRoomStart < aRoomEnd
                  ) {
                    roomsDispo[areservation.room] = "disponible";
                  } else {
                    roomsDispo[areservation.room] = "indisponible";
                  }
                }
              }
              // Maintenant on verifie les critères de recherche
              for (let aRoomId in rooms.val()) {
                  if (roomsDispo[aRoomId] !== 'indisponible') {
                    if (data.capacity > rooms.val()[aRoomId].capacity) {
                        roomsDispo[aRoomId] = "notGood";
                      }
                      // à refactorer
                      if (data.equipment.length > 0) {
                        if (rooms.val()[aRoomId].equipements) {
                          // le test { name: 'TV' } == { name: 'TV' } retourne false, je dois donc extraitre 'TV' de l'objet { name: 'TV' }
                          let equipements = [];
                          for (let object of rooms.val()[aRoomId].equipements) {
                              equipements.push(object.name);
                          }
                          if (equipements.indexOf(data.equipment[0]) > -1) {
                            if (data.equipment[1]) {
                              if (equipements[1]) {
                                console.log('bon équipements')
                              } else {
                                roomsDispo[aRoomId] = "notGood";
                              }
                            }
                          } else {
                            roomsDispo[aRoomId] = "notGood";
                          }
                        } else {
                          roomsDispo[aRoomId] = "notGood";
                        }
                      }
                  }
              }
              res.send(JSON.stringify(roomsDispo));
            },
            error => {
              console.log(error);
            }
          );
      },
      error => {
        console.log(error);
      }
    );
});

// ------------------------------------------------------------------------------

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
