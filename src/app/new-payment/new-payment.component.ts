import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements  OnInit{

  paymentFormGroup ! : FormGroup;

  constructor( private fb : FormBuilder) {
  }
  ngOnInit(): void {
    this.paymentFormGroup=this.fb.group({
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type: this.fb.control(''),
      studentCode : this.fb.control(''),
      file : this.fb.control('')
    })
  }



}
