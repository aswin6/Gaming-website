import { Component, OnInit } from '@angular/core';
declare const Twitch: any;

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})
export class TwitchComponent implements OnInit {



  constructor() { }

  ngOnInit() {
    var options = {
        width: 854,
        height: 480,
        channel: "ashinamanulla",
        video: "<video ID>",
        collection: "<collection ID>",
      };
      var player = new Twitch.Player("twichTest", options);
      player.setVolume(0.5);
   }

}
