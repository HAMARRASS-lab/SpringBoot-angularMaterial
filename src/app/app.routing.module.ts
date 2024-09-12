import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoadStudentComponent} from "./load-student/load-student.component";
import {LoadPaymentComponent} from "./load-payment/load-payment.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {StudentComponent} from "./student/student.component";
import {PaymentComponent} from "./payment/payment.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthGuard} from "./guards/auth.guard";



const routes: Routes = [

  {path: "login", component :LoginComponent},
  {path: "admin", component :AdminTemplateComponent,
    canActivate: [AuthGuard],
    children : [
      {path: "home", component :HomeComponent},
      {path: "profile", component :ProfileComponent},
      {path: "loadStudent", component :LoadStudentComponent},
      {path: "loadPayment", component :LoadPaymentComponent},
      {path: "dashboard", component :DashboardComponent},
      {path: "student", component :StudentComponent},
      {path: "payment", component :PaymentComponent},
    ]},

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
