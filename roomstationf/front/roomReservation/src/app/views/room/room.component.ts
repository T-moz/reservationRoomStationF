import { Component, OnInit, Input } from "@angular/core";
import { RoomService } from "../../services/room.service";
import { ReservationService } from "../../services/reservation.service";

import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent implements OnInit {
  @Input() index: number;

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  openSnackBar(data) {
    this._snackBar.open(data, "Undo", {
      duration: 3000
    });
  }
  reserver() {
    let data = {
      date: this.reservationService.infoSearch.date,
      start: this.reservationService.infoSearch.start,
      end: this.reservationService.infoSearch.end,
      created: Date.now(),
      room: this.index
    };
    this.httpClient
      .post("http://localhost:3000/makeAreservation", data)
      .subscribe(
        data => {
          console.log(data);
          this.reservationService.roomAviable = [];
          this.openSnackBar(data);
          setTimeout(() => {
            this.openSnackBar("Est ce que ça compte pour une annimation ?");
          }, 4000);
        },
        error => {
          console.log(error);
          // this.openSnackBar("Votre réservation n'a pas été enregistré.");
        }
      );
  }
}
