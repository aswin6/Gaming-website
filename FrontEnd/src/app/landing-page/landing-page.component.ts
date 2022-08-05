import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(    public _auth: HeroService , private _router : Router
    ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear()
    this._router.navigate(['/']);
  }
}
