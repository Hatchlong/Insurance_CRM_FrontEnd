import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentTermService } from '../../../Services/payment-term/payment-term.service';

@Component({
  selector: 'app-payment-terms-list',
  templateUrl: './payment-terms-list.component.html',
  styleUrls: ['./payment-terms-list.component.css']
})
export class PaymentTermsListComponent implements OnInit{

  paymentDetails:any=[]
   
  constructor(
    private router:Router,
    private paymentSer:PaymentTermService
  ){}
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
      this.getAllPayment()
  }
 
  checks=false;
  selectAll(e:any){
    if(e.target.checked==true){
      this.checks=true;
    }else{
      this.checks=false;

    }
  }
  async getAllPayment(){
    try {
      const result:any = await this.paymentSer.getAllPaymentTerm();
      console.log(result)
      if(result.status === '1'){
        this.paymentDetails = result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
