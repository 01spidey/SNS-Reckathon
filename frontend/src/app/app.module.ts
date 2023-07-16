import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ToastrModule} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CommonModule, DatePipe } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { HomeComponent } from './home/home.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterPopupComponent } from './register-popup/register-popup.component';
import { CompanyDashBoardComponent } from './company-dash-board/company-dash-board.component';
import { AddJobPopupComponent } from './add-job-popup/add-job-popup.component';
import { PopupComponent } from 'ag-grid-community';
import { ConfimPopupComponent } from './confim-popup/confim-popup.component';
import { StudentTableComponent } from './student-table/student-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentDashboardComponent,
    LoginComponent,
    RegisterPopupComponent,
    CompanyDashBoardComponent,
    AddJobPopupComponent,
    ConfimPopupComponent,
    StudentTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    MatTooltipModule,
    FormsModule,
    MatSlideToggleModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxUiLoaderModule,
    NgxOtpInputModule
  ],
  providers: [
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
