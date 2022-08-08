import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { TwitchComponent } from './twitch/twitch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StripeComponent } from './stripe/stripe.component';
import { SingleProComponent } from './single-pro/single-pro.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { PropartyComponent } from './proparty/proparty.component';
import { StreamComponent } from './stream/stream.component';
import { RequestsComponent } from './requests/requests.component';
import { SocketComponent } from './socket/socket.component';
import { LoadingComponent } from './loading/loading.component';
import { UserReqComponent } from './user-req/user-req.component';

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
    path:'loading',
    component:LoadingComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent  
  },
  {
    path:'payment',
    component:StripeComponent  
  },
  {
    path:'ProPlayer',
    component:SingleProComponent  
  },
  {
    path:'profile',
    component:ProfileComponent  
  },
  {
    path:'userLists',
    component:UserListsComponent  
  },
  {
    path:'userReq',
    component:UserReqComponent  
  },
  {
    path:'party',
    component:PropartyComponent  
  },
  {
    path:'stream',
    component:StreamComponent  
  },
  {
    path:'requests',
    component:RequestsComponent  
  },{
    path:'socket',
    component:SocketComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
