import { Component } from '@angular/core';
import { AppService } from '../service/app.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-dash-board',
  templateUrl: './company-dash-board.component.html',
  styleUrls: ['./company-dash-board.component.scss']
})
export class CompanyDashBoardComponent {

  cur_user_data!:any;
  cur_user_id : string = ''
  cur_user_role : string = ''

  jobs_lst:any[] = []
  section = ''
  job_type_filter = 'All'
  job_category_filter: string = ''
  job_status_filter = 'OnGoing'
  add_job_popup = false

  

  ngOnInit(): void {
      this.cur_user_data = JSON.parse(sessionStorage.getItem('cur_user_data')!)
      this.cur_user_id = sessionStorage.getItem('user_id')!
      this.cur_user_role = sessionStorage.getItem('user_role')!
      this.jobs_lst =[]
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
      role : this.cur_user_data.company    
    }

    this.service.getJobs(data).subscribe(
      (res:any)=>{
        if(res.success){
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

  convertDate(date_str:string):string{
    const dateObj = new Date(date_str);
    const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
    return formattedDate;
  }

  viewApplicants(){

  }

  closeApplication(){

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

  handleAddJobPopup(flag:any){
    this.add_job_popup = flag
  }

  openAddJobPopup(){
    this.add_job_popup = true
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
