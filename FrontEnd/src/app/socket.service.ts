import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:8887';
  private socket;    

  constructor() {
      this.socket = io(this.url);
  }

  public sendMessage(message:any) {
    this.socket.emit('new-message', message);
}
}
