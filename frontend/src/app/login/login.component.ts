import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { loginResponse, serverResponse } from '../models/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  role:string = ""
  section = 1
  register = false

  loginForm = this.builder.group({
    user_id:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required),
  })


  ngOnInit(): void {
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('cur_company_section')
    sessionStorage.removeItem('cur_company')
    sessionStorage.removeItem('cur_user_data')
    sessionStorage.removeItem('cur_action')    
    sessionStorage.setItem('cur_page', 'login')
    this.role = sessionStorage.getItem('user_role')!
  }

  constructor(
    private builder:FormBuilder, 
    private toastr:ToastrService,
    private service:AppService,
    private router:Router
  ){ }

  proceedLogin(){
    let data = {
      username : this.loginForm.value.user_id,
      password : this.loginForm.value.password,
      user_role : this.role
    }
    this.service.login(data).subscribe(
      (res:loginResponse)=>{
        if(res.success){
          sessionStorage.setItem('user_id', this.loginForm.value.user_id!)
          sessionStorage.setItem('cur_user_data', JSON.stringify(res.user_data))
          this.toastr.success(res.message)
          console.log(res)

          if(this.role == 'Company') this.router.navigate(['company'])
          else this.router.navigate(['student'])
        }
        else{
          this.toastr.error(res.message)
        }
      },
      err=>{
        this.toastr.error(err.error.message)
      }
    )

  }

  goBack(){
    this.router.navigate([''])
  }

  proceedSignUp(){
    this.register = true
  }

  handleRegisterPopup(flag:any){
    this.register = flag
  }

}
