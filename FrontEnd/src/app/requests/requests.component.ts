import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(private router: Router, private hero: HeroService, public _auth:HeroService) { }

  userlists: any
  ngOnInit(): void {
    this.hero.getCoach()
      .subscribe(res=>{
        this.userlists = res
        console.log(res)
      })

  }


  profile() {
    this.router.navigate(['/profile'])
  }

  approve(id:any){
    this.hero.sendLinkApprove(id)
    .subscribe(res=>{
      this.userlists = res
      console.log(res)
    })

  }
  reject(id:any){

    this.hero.sendLinkReject(id)
    .subscribe(res=>{
      this.userlists = res
      console.log(res)
    })


  }

}
