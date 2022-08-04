import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { TwitchComponent } from './twitch/twitch.component';

const routes: Routes = [

  {
    path:'',
    component:LandingPageComponent
  },

  {
    path:'twitch',
    component:TwitchComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
