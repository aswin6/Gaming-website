import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {

  message: any;

  constructor(private socketService: SocketService) {
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }


  ngOnInit() {


  }


}
