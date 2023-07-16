import { Component , OnInit} from '@angular/core';
import { AppService } from '../service/app.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { serverResponse } from '../models/model';

export interface filter_options{
  job_type_filter: string,
  job_category_filter: string,
}

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  cur_user_data!:any;
  cur_user_id : string = ''
  cur_user_role : string = ''

  jobs_lst:any[] = []
  section = ''
  job_type_filter = 'All'
  job_category_filter: string = 'All'
  job_status_filter = 'OnGoing'

  confirmPopup = false
  jobData!:any;
  

  ngOnInit(): void {
      this.cur_user_data = JSON.parse(sessionStorage.getItem('cur_user_data')!)
      this.cur_user_id = sessionStorage.getItem('user_id')!
      this.cur_user_role = sessionStorage.getItem('user_role')!
      // this.jobs_lst =[1, 2, 3, 4, 5, 6]
      this.section = 'All Jobs'

      this.changeFilter(this.job_type_filter, this.job_category_filter);

  }

  constructor(
    private service : AppService,
    private builder : FormBuilder,
    private toastr:ToastrService,
    private router: Router
  ) {  }

  changeFilter(job_type_filter:string, job_category_filter:string){
    this.job_type_filter = job_type_filter
    this.job_category_filter = job_category_filter

    let data = {
      job_type_filter: this.job_type_filter,
      job_category_filter: this.job_category_filter,
      username : this.cur_user_id,
      role : this.cur_user_role
    }

    this.service.getJobs(data).subscribe(
      (res:any)=>{
        console.log(res)

        if(res.success){
          // console.log(res.jobs_lst)
          this.jobs_lst = res.jobs
          this.toastr.success('Filter Applied Successfully')
        }
        else{
          // this.toastr.error(res.message)
        }
      },
      (err:any)=>{
        this.toastr.error('Server Not Responding')
      }
    )

    console.log(this.job_type_filter, this.job_category_filter)

  }

  FilterByStatus(status:string){
    this.job_status_filter = status
  }

  convertDate(date_str:string):string{
    const dateObj = new Date(date_str);
    const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
    return formattedDate;
  }

  handleConfirmPopup(flag:any){
    this.confirmPopup = flag
  }

  applyJob(pk:number){
    this.jobData = {
      job_id : pk,
      username : this.cur_user_id,
    }
    this.confirmPopup = true
  }

  saveJob(pk:number){
    this.jobData = {
      job_id : pk,
      username : this.cur_user_id,
    }
    this.service.saveJob(this.jobData).subscribe(
      (res:serverResponse)=>{
        if(res.success){
          
          this.toastr.success('Job saved successfully')
        }else this.toastr.warning('Something went wrong')
      },
      err=>{
        this.toastr.error('Something went wrong')
      }
    )
  }

  onCategoryChange(category:string){
    this.job_category_filter = category
    this.changeFilter(this.job_type_filter, this.job_category_filter);
  }

  convertJobID(id:number):string{
    let id_str = id.toString()
    if(id_str.length<6){
      let diff = 6 - id_str.length
      let str = ''
      for(let i=0; i<diff; i++){
        str += '0'
      }
      id_str =  str+id_str
    }

    return id_str
  }

  logout(){
    this.router.navigate(['/login'])
  }


}
