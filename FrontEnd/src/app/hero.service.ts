import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode"


interface MyToken {
  role: string;
  email: number;
  superadmin: number;
 
  // whatever else is in the JWT.
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  server_address: string = "http://localhost:8887/api"

  constructor(private http: HttpClient) {}

//! Token related

  //Admin Role Check
  isPro(): boolean {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.role === 'professional' ? true : false;
  }

   //SuperAdmin Role Check
   isSuperAdmin(): boolean {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.role === 'super' ? true : false;
  }
   //normal Role Check
   isNormal(): boolean {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.role === 'normal' ? true : false;
  }

   //email Role Check
   getEmail() {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.email;
  }

   //check Presence of Token  
   isLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  //retrive Token for token interception
  getToken() {
    return localStorage.getItem('accessToken')
  }


  //!Signup related

  signupGo(data:any){
    return this.http.post<any>(`${this.server_address}/auth/signUp`, data);
  }
  discordSign(){
    return this.http.get<any>(`${this.server_address}/auth/discord`);
  }

  googleSave(data:any){
    return this.http.post<any>(`${this.server_address}/auth/googleSave`, data);
  }

  makePayment(stripeToken: any){
    return this.http.post<any>(`${this.server_address}/stripe`,{token:stripeToken});
  }

  OTPGo(data:any,email:any){
    return this.http.post<any>(`${this.server_address}/auth/verifyOTP`, {data,email});
  }


  //req pro

  reqPro(email:any){
    return this.http.post<any>(`${this.server_address}/reqPro`, {email:email});

  }

  coach(email:any){
    return this.http.post<any>(`${this.server_address}/coach`, {email:email});

  }

  getCoach(){
    return this.http.get<any>(`${this.server_address}/coach`);
  }



  getReq(){
    return this.http.get<any>(`${this.server_address}/reqPro`);
  }
  partyGo(data:any){
    return this.http.post<any>(`${this.server_address}/party`,{data});

  }

  getParty(){
    return this.http.get<any>(`${this.server_address}/party`,);

  }

  joinParty(){
    return this.http.get<any>(`${this.server_address}/joinparty`,);

  }
}
