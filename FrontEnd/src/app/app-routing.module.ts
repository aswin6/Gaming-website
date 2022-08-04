import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { TwitchComponent } from './twitch/twitch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StripeComponent } from './stripe/stripe.component';

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
  },
  {
    path:'dashboard',
    component:DashboardComponent  
  },
  {
    path:'payment',
    component:StripeComponent  
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
