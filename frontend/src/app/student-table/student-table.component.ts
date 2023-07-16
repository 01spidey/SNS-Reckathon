import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {

  @Input() popup_data:any = {}
  @Output() close_popup = new EventEmitter<any>()

  

}
