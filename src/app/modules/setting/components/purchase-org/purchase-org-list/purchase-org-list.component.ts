import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchase-org-list',
  templateUrl: './purchase-org-list.component.html',
  styleUrls: ['./purchase-org-list.component.css']
})
export class PurchaseOrgListComponent implements OnInit {
  purchaseOrgDetails:any= []
  selectAll:any=false

  constructor(
    private router: Router,
    private purchaseSer: PurchaseOrgService,
    private _snackBar :MatSnackBar
  ) { } 
 
  ngOnInit(): void {
    this.getAllPurchaseOrgDetails()
  }
 

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
 


  async getAllPurchaseOrgDetails(){
    try {
      const result:any = await this.purchaseSer.getAllPurchaseOrgDetails();
      console.log(result)
      if(result.status === '1'){
        result.data.map((el:any)=>{
          el.check=false
        })
        this.purchaseOrgDetails = result.data;
      }
    } catch (error:any) {
       if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  
  selectdata(event:any){
    console.log(event.target.checked);
    this.purchaseOrgDetails.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.purchaseOrgDetails[index].check=event.target.checked
      const findSelect=this.purchaseOrgDetails.find((el:any)=>el.check===false)
      console.log(findSelect);
      
      if(findSelect){
        
        this.selectAll=false

      }
      else{
        this.selectAll=true
      }
    }

 
    async deleteRecords(data: any) {
      try {
        data.isActive = "C"
        const result: any = await this.purchaseSer.updatePurchaseOrg(data);
        if (result.status === '1') {
          this._snackBar.open("Deleted Successfully", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.getAllPurchaseOrgDetails()
          return;
        }
        if (result.status === '0') {
          this._snackBar.open("Deleted Unsuccessfully", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
        }
  
      } catch (error: any) {
        console.error(error)
        if (error.error.message) {
          this._snackBar.open(error.error.message, '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
          return
        }
        this._snackBar.open('Something went wrong', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    }
}
