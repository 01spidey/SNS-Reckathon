import { Component , OnInit} from '@angular/core';
import { AppService } from '../service/app.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  

  ngOnInit(): void {
      this.cur_user_data = JSON.parse(sessionStorage.getItem('cur_user_data')!)
      this.cur_user_id = sessionStorage.getItem('user_id')!
      this.cur_user_role = sessionStorage.getItem('user_role')!
      this.jobs_lst =[1, 2, 3, 4, 5, 6]
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
        if(res.status == 'success'){
          // this.jobs_lst = res.jobs_lst
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

  onCategoryChange(category:string){
    this.job_category_filter = category
    this.changeFilter(this.job_type_filter, this.job_category_filter);
  }

  logout(){
    this.router.navigate(['/login'])
  }


}
