import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements  OnInit{
  paymentId : any;
  pdfFileUrl: any


  constructor(private  studentService: StudentsService,private activatedRoute :ActivatedRoute) {
  }
  ngOnInit(): void {

    this.paymentId= this.activatedRoute.snapshot.params['id'];
    this.studentService.getPaymentDetails(this.paymentId).subscribe({
      next : value => {
          let blob: Blob = new Blob([value], {type :' application/pdf'});
          this.pdfFileUrl= window.URL.createObjectURL(blob);
      }, error :err =>{
        console.log(err)
    }
    })
  }


  afterLoadComplete($event:any) {
    console.log(event)

  }
}
