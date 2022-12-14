import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private _heroService: HeroService,
    public _auth: HeroService
  ) { }

  paymentHandler: any = null;

  success: boolean = false

  failure: boolean = false

  partyname: any

  user:any

  ngOnInit(): void {
    this.invokeStripe()
    this.getParty()
    this.userData()
  }

  userData() {
    let email = this._heroService.getEmail()
    this._heroService.getUserDetail(email).
      subscribe(res => {
        this.user = res
       
      })
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LT4FJSBGyD7UYjV7Uzl35ECOGv6TAtzwwYlAokpfqWpLNoXEZq1Ov3RoijNAxrN5fRhYqxzedauoF7tyFlbgr9q002zPPPLTa',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this._heroService.makePayment(stripeToken).subscribe((data: any) => {
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };

    paymentHandler.open({
      name: 'ggEra',
      description: 'Payment',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LT4FJSBGyD7UYjV7Uzl35ECOGv6TAtzwwYlAokpfqWpLNoXEZq1Ov3RoijNAxrN5fRhYqxzedauoF7tyFlbgr9q002zPPPLTa',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
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

  joinParty(email:any) {
    let data=email
    this._heroService.joinParty(data)
      .subscribe(res => {
        localStorage.setItem('twitch', res.twitchID)
        console.log('partRes',res)

        this.router.navigate(['/twitch'])
      })
  }

  getParty() {
    this._heroService.getParty()
      .subscribe(res => {
        this.partyname = res
        
      })
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/']);
  }
}
