import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import * as firebase from "firebase";
import { RoomService } from "../../services/room.service";
import { ReservationService } from "../../services/reservation.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  date = new FormControl(new Date());
  minDate = new Date();
  serializedDate = new FormControl(new Date().toISOString());
  dateFormGroup: FormGroup;
  filterFormGroup: FormGroup;
  equipment = new FormControl();
  equipmentList: string[] = ["TV", "Retro Projecteur"];
  searching = false;
  constructor(
    private _adapter: DateAdapter<any>,
    private _formBuilder: FormBuilder,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    //to display date in french
    this._adapter.setLocale("fr");
    this.buildFormsGroup();
    console.log(this.minDate);
    /*
     * Use once to save the rooms in the database.
     * this.rooms was the JSON file
     * firebase.database().ref('/rooms').set(this.rooms.rooms);
     */
  }

  // function that init the form groups
  buildFormsGroup() {
    this.dateFormGroup = this._formBuilder.group({
      dateCtrl: ["", Validators.required],
      startCtrl: ["", Validators.required],
      endCtrl: ["", Validators.required]
    });
    this.filterFormGroup = this._formBuilder.group({
      capacityCtrl: [0]
    });
  }
  search() {
    this.reservationService.roomAviable = [];
    this.reservationService.infoSearch.date = this.dateFormGroup.value.dateCtrl;
    this.reservationService.infoSearch.start = this.dateFormGroup.value.startCtrl;
    this.reservationService.infoSearch.end = this.dateFormGroup.value.endCtrl;
    if (this.filterFormGroup.value) {
      this.reservationService.infoSearch.capacity = this.filterFormGroup.value.capacityCtrl;
    } else {
      this.reservationService.infoSearch.capacity = 0;
    }
    if (this.equipment.value) {
      this.reservationService.infoSearch.equipment = this.equipment.value;
    }

    this.searching = true;
    this.httpClient
    .post("http://localhost:3000/aviable", this.reservationService.infoSearch)
    .subscribe(
      (data: any[]) => {
        console.log(data);
        this.reservationService.roomAviable = data;
        this.searching = false;
      },
      error => {
        console.log(error);
        //this.openSnackBar("Votre recherche n'a pas été enregistré.");
      }
    );
  }
}
