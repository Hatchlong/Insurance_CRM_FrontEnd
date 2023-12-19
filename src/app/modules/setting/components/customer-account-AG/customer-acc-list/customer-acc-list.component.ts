import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAccountAGService } from '../../../Services/customer-account-AG/customer-account-ag.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-acc-list',
  templateUrl: './customer-acc-list.component.html',
  styleUrls: ['./customer-acc-list.component.css']
})
export class CustomerAccListComponent {
  customerAccountDetails:any = []
  selectAll:any = false
  
  constructor(
    private router:Router,
    private customerAccountSer : CustomerAccountAGService,
    private _snackBar: MatSnackBar
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
    } catch (error:any) {
       if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  selectdata(event:any){
    console.log(event.target.checked);
    this.customerAccountDetails.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.customerAccountDetails[index].check=event.target.checked
      const findSelect=this.customerAccountDetails.find((el:any)=>el.check===false)
      console.log(findSelect);
      
      if(findSelect){
        
        this.selectAll=false

      }
      else{
        this.selectAll=true
      }
    }
  
}
