import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { serverResponse } from '../models/model';

@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrls: ['./register-popup.component.scss']
})
export class RegisterPopupComponent implements OnInit {

  user_role = ''
  @Output() popup_closed = new EventEmitter<boolean>();

  company_signup = false
  student_signup = false

  ngOnInit(): void {
    this.user_role = sessionStorage.getItem('user_role')!
    if(this.user_role == 'Company') this.company_signup = true
    else this.student_signup = true
  }

  constructor(
    private service : AppService,
    private builder : FormBuilder,
    private toastr:ToastrService
  ) {  }

  CompanySignUpForm = this.builder.group({
      company:this.builder.control('', Validators.required),
      type:this.builder.control('', Validators.required),
      category : this.builder.control('', Validators.required),
      username : this.builder.control('', Validators.required),
      password : this.builder.control('', Validators.required),
      hr_name : this.builder.control('', Validators.required),
      mail : this.builder.control('', Validators.compose(
        [Validators.required, Validators.email]
      )),
      phone : this.builder.control('', Validators.compose(
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      )),

  });

  // username = models.CharField(max_length=50, null=False)
  //   password = models.CharField(max_length=50, null=False)
  //   name = models.CharField(max_length=50, null=False)
  //   mail = models.EmailField(null=False)
  //   phone = models.CharField(max_length=50, null=False)
  //   college = models.CharField(max_length=50, null=False)
  //   cgpa = models.FloatField(null=False)
  //   batch = ArrayField(models.IntegerField(), null=False)
  //   degree
  StudentSignUpForm = this.builder.group({
    username : this.builder.control('', Validators.required),
    password : this.builder.control('', Validators.required),
    
    name : this.builder.control('', Validators.required),
    mail : this.builder.control('', Validators.compose(
      [Validators.required, Validators.email]
    )),
    phone : this.builder.control('', Validators.required),
    
    college : this.builder.control('', Validators.required),
    cgpa : this.builder.control('', Validators.required),
    start_year : this.builder.control('', Validators.compose(
      [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(4), Validators.maxLength(4)]
    )),
    end_year : this.builder.control('', Validators.compose(
      [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(4), Validators.maxLength(4)]
    )),
    stream : this.builder.control('', Validators.required),
    degree : this.builder.control('', Validators.required),
  })

  proceedSignUp(){
    if(this.user_role == 'Company') this.proceedCompanySignUp()
    else this.proceedStudentSignUp()
  }

  proceedCompanySignUp(){
    if(this.CompanySignUpForm.valid){
      let data = this.CompanySignUpForm.value

      let formData = {
        company:data.company,
        type:data.type,
        category:data.category,
        hr_name:data.hr_name,
        mail : data.mail,
        phone : data.phone,
        username:data.username,
        password:data.password,
        user_role : this.user_role
      }


      this.service.register(formData).subscribe(
        (res:serverResponse)=>{
          if(res.success){
            this.toastr.success('Successfully Registered')
            this.closePopup()
          }
        })
      
    }else this.toastr.error('Form Invalid!!')
  }

  proceedStudentSignUp(){
    if(this.StudentSignUpForm.valid){
      let data = this.StudentSignUpForm.value

      //       college = formdata['college']
      //       cgpa = formdata['cgpa']
      //       batch = formdata['batch']
      //       degree = formdata['degree']
      //       stream = formdata['stream']
      let formData = {
        name : data.name,
        mail : data.mail,
        phone : data.phone,
        username:data.username,
        password:data.password,
        college : data.college,
        cgpa : data.cgpa,
        batch : [data.start_year, data.end_year],
        stream : data.stream,
        degree : data.degree,
        user_role : this.user_role
      }

      this.service.register(formData).subscribe(
        (res:serverResponse)=>{
          if(res.success){
            this.toastr.success('Successfully Registered')
            this.closePopup()
          }else this.toastr.warning(res.message)
        })
      }
  }

  closePopup(){
    this.popup_closed.emit(false)
  }



}
