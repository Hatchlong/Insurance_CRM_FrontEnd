import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAccountAGService } from '../../../Services/customer-account-AG/customer-account-ag.service';

@Component({
  selector: 'app-customer-acc-list',
  templateUrl: './customer-acc-list.component.html',
  styleUrls: ['./customer-acc-list.component.css']
})
export class CustomerAccListComponent {
  customerAccountDetails:any = []
  
  constructor(
    private router:Router,
    private customerAccountSer : CustomerAccountAGService
  ){ }
  ngOnInit(): void {
    this.getAllCustomerAccountDetails()
  }

  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  async getAllCustomerAccountDetails(){
    try {
      const result:any = await this.customerAccountSer.getAllCustomerAccountDetails();
      console.log(result)
      if(result.status === '1'){
        this.customerAccountDetails = result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }


  
}
