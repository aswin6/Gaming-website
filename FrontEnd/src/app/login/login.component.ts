import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { HeroService } from '../hero.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modal: boolean = false
  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  constructor(private authService: SocialAuthService,
    private router: Router,
    private _heroService: HeroService
  ) { }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);

      if (this.socialUser != null) {

        // save to DB 
        this._heroService.googleSave(this.socialUser)
        .subscribe(
          {
            next: (res) => {
              if (res) {
  
                Swal.fire({
                  icon: 'success',
                  title: 'Sign Up successfully',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  this.router.navigate(['/login'])
                  this.modal = false
                })
  
              }
            },
            error: (err) => {
              if (err.status === 409) {
                Swal.fire({
                  icon: 'error',
                  title: 'Email ID already registered',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  this.router.navigate(['/login'])
                  this.modal = false
  
                })
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'ENetwork Error. Please try again',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  this.router.navigate(['/login'])
                  this.modal = false
          
                })
              }
            }
          }
  
        )
       

      }
      else {
        console.log("no", this.socialUser)
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res, "res")
        this.router.navigate(['/'])
      })
  }

  signInWithDiscord(){
    this._heroService.discordSign()
    .subscribe(res=>{
      console.log(res)
    })
  }

  signOut(): void {
    this.authService.signOut();
  }
  switch() {
    this.modal = !this.modal

  }


  signIn(){
    this.router.navigate(['/dashboard'])
  }

  // login

  SignUpForm: any = new FormGroup({
    'username': new FormControl(''),
    'email': new FormControl(''),
    'password': new FormControl('')
  })

  SignUp() {

    let SignUpData = this.SignUpForm.value;
    this._heroService.signupGo(SignUpData)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              Swal.fire({
                icon: 'success',
                title: 'Sign Up successfully',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])
                this.modal = false
              })

            }
          },
          error: (err) => {
            if (err.status === 409) {
              Swal.fire({
                icon: 'error',
                title: 'Email ID already registered',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])
                this.modal = false

              })
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'ENetwork Error. Please try again',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])
                this.modal = false
        
              })
            }
          }
        }

      )


  }



}
