import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { LoginComponent } from './login/login.component';
import { CompanyDashBoardComponent } from './company-dash-board/company-dash-board.component';


const routes: Routes = [
  {path : '', component:HomeComponent},
  {path : 'student', component:StudentDashboardComponent},
  {path:'login', component:LoginComponent},
  {path : 'company', component : CompanyDashBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
