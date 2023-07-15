import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  cur_user_data!:any;
  jobs_lst:any[] = []
  section = ''
  job_type_filter = 'All'
  job_category_filter: string = 'All'
  job_status_filter = 'OnGoing'

  ngOnInit(): void {
      this.cur_user_data = JSON.parse(sessionStorage.getItem('cur_user_data')!)
      this.jobs_lst =[1, 2, 3, 4, 5, 6]
      this.section = 'All Jobs'
  }

  changeFilter(job_type_filter:string, job_category_filter:string){
    this.job_type_filter = job_type_filter
    this.job_category_filter = job_category_filter
  }

  FilterByStatus(status:string){
    this.job_status_filter = status
  }


}
