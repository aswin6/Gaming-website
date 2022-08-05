import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-single-pro',
  templateUrl: './single-pro.component.html',
  styleUrls: ['./single-pro.component.scss']
})
export class SingleProComponent implements OnInit {

  constructor(
    private router: Router,
    private _heroService: HeroService,
    public _auth: HeroService
  ) { }
  ngOnInit(): void {
  }


  coachReq() {
    let email = this._auth.getEmail()
    this._auth.coach(email)
      .subscribe(
        {
          next: (res) => {
            if (res) {

              Swal.fire({
                icon: 'success',
                title: 'Request Send',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/dashboard'])
              })

            }
          },
          error: (err) => {
            if (err.status === 409) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])

              })
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Network Error. Please try again',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.router.navigate(['/login'])

              })
            }
          }
        }

      )
  }

}
