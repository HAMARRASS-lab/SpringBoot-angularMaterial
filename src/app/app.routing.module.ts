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
import {AuthorizationGuard} from "./guards/authorization.guard";
import {StudentDetailsComponent} from "./student-details/student-details.component";
import {NewPaymentComponent} from "./new-payment/new-payment.component";
import {PaymentDetailsComponent} from "./payment-details/payment-details.component";




const routes: Routes = [

  {path: "login", component :LoginComponent},
  {path: "admin", component :AdminTemplateComponent,
    // canActivate: [AuthGuard],
    children : [
      {path: "home", component :HomeComponent},
      {path: "profile", component :ProfileComponent},
      {path: "payments", component :PaymentComponent},
      {path: "loadStudent", component :LoadStudentComponent
      , canActivate : [AuthorizationGuard], data : {roles: ['ADMIN']}
      },
      {path: "loadPayment", component :LoadPaymentComponent},
      {path: "dashboard", component :DashboardComponent},
      {path: "students", component :StudentComponent},
      {path: "student-details/:code", component :StudentDetailsComponent},
      {path: "new-payment/:code", component :NewPaymentComponent},
      {path: "payment-details/:id", component :PaymentDetailsComponent},

    ]},

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
