import { Component } from "@angular/core";
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { RoomService } from "./services/room.service";
import { HttpClient } from "@angular/common/http";
import * as response from "@angular/common/http";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "roomReservation";

  constructor(
    private router: Router,
    private roomService: RoomService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    const firebaseConfig = {
      apiKey: "AIzaSyAi166eN85pNTSc_xzGOQApA3rl33g9kgY",
      authDomain: "stationf-6f2b1.firebaseapp.com",
      databaseURL: "https://stationf-6f2b1.firebaseio.com",
      projectId: "stationf-6f2b1",
      storageBucket: "",
      messagingSenderId: "443404514933",
      appId: "1:443404514933:web:987b694cd39b4569"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.roomService.getListRooms();
    this.httpClient.get("http://localhost:3000/test").subscribe(
      (data: any) => {
        console.log('yes');
        this.openSnackBar(data);
      },
      error => {
        console.log(error);
        this.openSnackBar('Impossible de communiquer avec le serveur.');
      }
    );
  }

  openSnackBar(data) {
    this._snackBar.open(data, 'Undo', {
      duration: 3000
    });
  }
}
