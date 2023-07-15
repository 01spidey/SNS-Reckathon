import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  cur_user_data!:any;
  jobs_lst:any[] = []

  ngOnInit(): void {
      this.cur_user_data = JSON.parse(sessionStorage.getItem('cur_user_data')!)
      this.jobs_lst =[1, 2, 3, 4, 5, 6]
  }

}
