import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit {

  constructor(private router: Router, private hero: HeroService) { }


  userlists: any
  ngOnInit(): void {
    this.hero.getReq()
      .subscribe(res=>{
        this.userlists = res
        console.log(res)
      })

  }


  profile() {
    this.router.navigate(['/profile'])

  }
}
