import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
declare const Twitch: any;

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})
export class TwitchComponent implements OnInit {


  constructor(private hero: HeroService,) { }

  ngOnInit() {

    let TwitchID = localStorage.getItem('twitch')
    console.log('Twitch' ,TwitchID)


    var options = {
      width: 854,
      height: 480,
      channel: TwitchID,
      video: "<video ID>",
      collection: "<collection ID>",
    };
    var player = new Twitch.Player("twichTest", options);
    player.setVolume(0.5);
  }

}
