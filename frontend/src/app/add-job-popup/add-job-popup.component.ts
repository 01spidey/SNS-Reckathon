import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppService } from '../service/app.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { serverResponse } from '../models/model';

@Component({
  selector: 'app-add-job-popup',
  templateUrl: './add-job-popup.component.html',
  styleUrls: ['./add-job-popup.component.scss']
})
export class AddJobPopupComponent {
  cur_user_data!:any;
  cur_user_id : string = ''
  cur_user_role : string = ''

  add_job_popup = false
  job_type:string = ''

  @Output() close_popup = new EventEmitter<boolean>();
  

  ngOnInit(): void {
      this.cur_user_data = JSON.parse(sessionStorage.getItem('cur_user_data')!)
      this.cur_user_id = sessionStorage.getItem('user_id')!
      this.cur_user_role = sessionStorage.getItem('user_role')!
  }

  addJobForm = this.builder.group({
    job_role: ['', Validators.required],
    job_type: ['', Validators.required],
    duration: ['', Validators.pattern("^[0-9]*$")],
    location: ['', Validators.required],
    salary : ['', Validators.pattern("^[0-9]*$")],
    job_desc : ['', Validators.required],
});

  constructor(
    private service : AppService,
    private builder : FormBuilder,
    private toastr:ToastrService,
    private router: Router
  ) {  }

  publishJob(){
    if(this.addJobForm.valid){
      let data = {
        company : this.cur_user_data.company,
        job_role : this.addJobForm.value.job_role,
        job_type : this.addJobForm.value.job_type,
        duration : this.addJobForm.value.duration,
        location : this.addJobForm.value.location,
        salary : this.addJobForm.value.salary,
        job_desc : this.addJobForm.value.job_desc,
        username : this.cur_user_id,
        role : this.cur_user_role
      }
      
      console.log(data)
      this.service.addJob(data).subscribe(
        (res:serverResponse)=>{
          if(res.success){
            this.toastr.success(res.message)
            this.closePopup()
          }
          else{
            this.toastr.error(res.message)
          }
        }
      )
    }else this.toastr.error('Form Invalid!!')
  }

  closePopup(){
    this.close_popup.emit(false);
  }
}
