import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Room } from '../models/Room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms;
  constructor() { }

  // get the list of rooms from database
  getListRooms() {
    firebase.database().ref('/rooms').once('value').then( (data) => {
      if (data.val()) {
        this.rooms = data.val();
        console.log(this.rooms);
      }
      else {
        console.log('failed to fetch rooms !');
      }
    });
  }
}
