import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';

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
    private purchaseSer: PurchaseOrgService
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
    } catch (error) {
      console.log(error);
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

 
}
