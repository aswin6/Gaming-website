import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
    
  
} from '@abacritt/angularx-social-login';
import {NgxStripeModule} from 'ngx-stripe'


// component 
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PartyCardComponent } from './party-card/party-card.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { TwitchComponent } from './twitch/twitch.component';
import { LoginComponent } from './login/login.component';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StripeComponent } from './stripe/stripe.component';
import { SingleProComponent } from './single-pro/single-pro.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { PropartyComponent } from './proparty/proparty.component';
import { StreamComponent } from './stream/stream.component';
import { RequestsComponent } from './requests/requests.component';
import { SocketComponent } from './socket/socket.component';
import { SocketService } from './socket.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PartyCardComponent,
    PlayerCardComponent,
    TwitchComponent,
    LoginComponent,
    DashboardComponent,
    StripeComponent,
    SingleProComponent,
    ProfileComponent,
    AboutUsComponent,
    UserListsComponent,
    PropartyComponent,
    StreamComponent,
    RequestsComponent,
    SocketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51LT4FJSBGyD7UYjV7Uzl35ECOGv6TAtzwwYlAokpfqWpLNoXEZq1Ov3RoijNAxrN5fRhYqxzedauoF7tyFlbgr9q002zPPPLTa')

    
  ],
  providers: [HeroService,SocketService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('175613608118-or5k2udnug8clivm7enruru42qnk6qd4.apps.googleusercontent.com'),
          }        
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
      
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
