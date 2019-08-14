import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ReservationService {
  // we're gone put the form's info in this var
  infoSearch = {
    date: "",
    start: "",
    end: "",
    capacity: 0,
    equipment: []
  };
  roomAviable = [];

  constructor() {}
}
