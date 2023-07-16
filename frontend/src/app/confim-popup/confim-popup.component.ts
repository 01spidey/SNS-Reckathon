import { Component , Input, EventEmitter, Output} from '@angular/core';
import { AppService } from '../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { serverResponse } from '../models/model';

@Component({
  selector: 'app-confim-popup',
  templateUrl: './confim-popup.component.html',
  styleUrls: ['./confim-popup.component.scss']
})
export class ConfimPopupComponent {

  @Input() jobData!:any;
  @Output() close_popup = new EventEmitter<boolean>();

  constructor(
    private service:AppService,
    private toastr:ToastrService
  ) { }

  closePopup(){
    this.close_popup.emit(false)
  }

  confirm(){
    console.log(this.jobData)
    this.service.applyJob(this.jobData).subscribe(
      (res:serverResponse)=>{
        if(res.success){
          this.toastr.success('Job applied successfully')
        }else this.toastr.warning('Something went wrong')

        this.close_popup.emit(false)
      },
      err=>{
        this.toastr.error('Something went wrong')
      }
    )
  }


}
