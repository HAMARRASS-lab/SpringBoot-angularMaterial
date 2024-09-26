import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Payment, Student} from "../model/students.model";
import {StudentsService} from "../services/students.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit{


  studentPayments! : Array<Payment> ;
  studentCode: any;

  paymentsDataSource: any ;
  public displayedColumns  = ['id', 'date','amount','type','status','firstName'];

constructor(private activatedRoute: ActivatedRoute, private studentService: StudentsService, private router : Router) {
}

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  ngOnInit(){
  this.studentCode = this.activatedRoute.snapshot.params['code']

this.studentService.getStudentPayments(this.studentCode).subscribe({
next : value => {
  this.studentPayments=value;
  this.paymentsDataSource=new MatTableDataSource<Payment>(this.studentPayments);
},
  error :err => {
  console.log(err)
  }
});
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`);

  }


}
