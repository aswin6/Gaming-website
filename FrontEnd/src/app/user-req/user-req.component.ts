import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-req',
  templateUrl: './user-req.component.html',
  styleUrls: ['./user-req.component.scss']
})
export class UserReqComponent implements OnInit {


  userlists: any


  constructor(private router: Router, private _heroService: HeroService, public _auth: HeroService
  ) { }




  paymentHandler: any = null;

  success: boolean = false

  failure: boolean = false

  partyname: any

  user: any

  ngOnInit(): void {
    // this.getParty()
    this.userData()
    this.userLists1()
  }

  userData() {
    let email = this._heroService.getEmail()
    this._heroService.getUserDetail(email).
      subscribe(res => {
        this.user = res
      })
  }




  singlePro() {
    this.router.navigate(['/ProPlayer'])
  }

  profile() {
    this.router.navigate(['/profile'])
  }

  userLists() {
    this.router.navigate(['/userLists'])
  }

  userReq() {
    this.router.navigate(['/userReq'])
  }

  party() {
    this.router.navigate(['/party'])
  }

  reqlists() {
    this.router.navigate(['/requests'])

  }



  proReq() {
    let email = this._auth.getEmail()
    this._auth.reqPro(email)
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

  // joinParty() {
  //   this._heroService.joinParty()
  //     .subscribe(res => {
  //       console.log('success')
  //       this.router.navigate(['/twitch'])
  //     })
  // }

  // getParty() {
  //   this._heroService.getParty()
  //     .subscribe(res => {
  //       this.partyname = res

  //     })
  // }

  userLists1() {
    this._heroService.getAllUsers()
      .subscribe(res => {
        this.userlists = res
      })

  }
  logout() {
    localStorage.clear()
    this.router.navigate(['/']);
  }
}
