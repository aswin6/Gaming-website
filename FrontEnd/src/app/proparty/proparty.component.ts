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

email:any

  constructor(
    private router: Router,
    private _heroService: HeroService
  ) { }



  ngOnInit(): void {
    this.email = this._heroService.getEmail()
   console.log(  this.email)
  }

  SignUpForm: any = new FormGroup({
    'game': new FormControl('')

  })

  pro(){
    let SignUpData = this.SignUpForm.value;
    console.log(SignUpData)
    this._heroService.partyGo(SignUpData,this.email)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/dashboard'])

      }
      )
  }

}
