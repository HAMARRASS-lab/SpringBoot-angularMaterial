import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {Student} from "../model/students.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements  OnInit{

  students! : Array<Student>;
  public  dataSource :any ;
  public displayedColumns  = ['id', 'code','firstName','lastName','programId','action'];
  constructor(private studentService : StudentsService, private router: Router) {
  }
  // students: Student[] = [];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe({
      next : (value :Student[]) => {
       this.students=value;
        this.dataSource= new  MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      }, error :err => {
        console.log(err)
      }
    })
  }
  studentPayments(student:Student){
// this.router.navigateByUrl(`/admin/student-details/${student.code}`);
    this.router.navigateByUrl("/admin/student-details/"+student.code);

  }

}
