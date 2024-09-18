import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  public payments : any;
 public  dataSource :any ;
 public displayedColumns  = ['id', 'date','amount','type','status','firstName'];
  constructor(private  http : HttpClient) {
  }

@ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;

  ngOnInit(): void {
    this.http.get("http://localhost:8087/payments")
      .subscribe({
        next : value => {
            this.payments =value;
            this.dataSource= new  MatTableDataSource(this.payments);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort=this.sort;            },
        error : err => {
          console.log(err);
        }
      })
  }

}
