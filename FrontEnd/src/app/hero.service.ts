import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  server_address: string = "http://localhost:8887/api"

  constructor(private http: HttpClient) {}




  signupGo(data:any){
    return this.http.post<any>(`${this.server_address}/signUp`, data);
  }
}
