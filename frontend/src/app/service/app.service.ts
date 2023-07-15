import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  URL = "http://127.0.0.1:8000";

  constructor(
    private http:HttpClient,
    private router:Router) { }

  test(){
    return this.http.get(`${this.URL}/test`)
  }


}
