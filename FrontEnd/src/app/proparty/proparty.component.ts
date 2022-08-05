import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-proparty',
  templateUrl: './proparty.component.html',
  styleUrls: ['./proparty.component.css']
})
export class PropartyComponent implements OnInit {

  constructor(
    private router: Router,
    private _heroService: HeroService
  ) { }


  SignUpForm: any = new FormGroup({
    'game': new FormControl(''),

  })
  ngOnInit(): void {

   
  }

  pro(){
    let SignUpData = this.SignUpForm.value;
    console.log(SignUpData)
    this._heroService.partyGo(SignUpData)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/dashboard'])

      }
      )
  }

}
