import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginResponse, serverResponse } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  // URL = "http://127.0.0.1:8000";
  URL = ' https://171b-203-223-191-6.ngrok-free.app'

  constructor(
    private http:HttpClient,
    private router:Router) { }

  test(){
    return this.http.get(`${this.URL}/test`)
  }

  register(data:any){
    return this.http.post<serverResponse>(`${this.URL}/register`, data)
  }

  login(data:any){
    return this.http.get<loginResponse>(`${this.URL}/login`, {params:data})
  }


  addJob(data:any){
    return this.http.post<serverResponse>(`${this.URL}/publish_job`, data)
  }

  getJobs(data:any){
    return this.http.get<serverResponse>(`${this.URL}/get_jobs`, {params:data})
  }

  applyJob(data:any){
    return this.http.post<serverResponse>(`${this.URL}/apply_job`, data)
  }

  saveJob(data:any){
    return this.http.post<serverResponse>(`${this.URL}/save_job`, data)
  }


}
