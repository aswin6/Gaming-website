import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ProfileForm: any = new FormGroup({
    'email': new FormControl(''),

  })

  gameTeams:any=['Activision','Battlenet']



  profile(){

  }
}
