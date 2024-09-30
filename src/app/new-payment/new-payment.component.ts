import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {paymentType} from "../model/students.model";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements  OnInit{

  isUploading = false;
  paymentFormGroup ! : FormGroup;
  studentCode!: string;
  // paymentTypes: string[] = ['CASH', 'CHECK', 'TRANSFER', 'DEPOSIT'];
  paymentTypes: string[]=[];
   pdfFileUrl : string='';
   showProgress : boolean=false;


  constructor( private fb : FormBuilder, private activatedRoute: ActivatedRoute, private studentService: StudentsService) {
  }
  ngOnInit(): void {
    for(let elt in  paymentType){
      let value =paymentType[elt];
      if(typeof value==='string'){
        this.paymentTypes.push(value);
      }

    }
    this.studentCode=this.activatedRoute.snapshot.params['code']
    this.paymentFormGroup=this.fb.group({
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type: this.fb.control(''),
      studentCode : this.fb.control(this.studentCode),
      fileName : this.fb.control(''),
      fileSource : this.fb.control('')
    })
  }

  selectedFile(event: any) {
    if(event.target.files.length>0){
      let file = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource:file,
        fileName : file.name
      });
      this.pdfFileUrl = URL.createObjectURL(file);
    }
  }
  savePayment() {
    this.showProgress=true;
    let date = new Date(this.paymentFormGroup.value.date);
    let formattedDate=(date.getMonth()+1)+"-"+date.getDate()+'-'+date.getFullYear();
    let formData  = new FormData();
    formData.set('file', this.paymentFormGroup.value.fileSource);
    formData.set('date', formattedDate);
    formData.set('amount', this.paymentFormGroup.value.amount);
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);

    this.studentService.savePayment(formData).subscribe({

      next : value =>{
        this.showProgress=false;
        alert('Payment saved successfully')
      },
      error :err=>{
        console.log(err);
        alert('Error saving payment. Please try again.');
      }

    })
  }


  afterLoadComplete($event: any) {
    console.log(event)
  }

}
