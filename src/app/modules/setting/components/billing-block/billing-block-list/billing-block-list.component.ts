import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingBlockService } from '../../../Services/billing-block/billing-block.service';

@Component({
  selector: 'app-billing-block-list',
  templateUrl: './billing-block-list.component.html',
  styleUrls: ['./billing-block-list.component.css']
})
export class BillingBlockListComponent implements OnInit{

  billingBlockDeatil:any=[]
  selectAll:any=false


  constructor(
    private router:Router,
    private billingBlockSer:BillingBlockService
  ){}

  ngOnInit(): void {
      this.getBillingDetails()
  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  async getBillingDetails(){
    try {
      const result:any=await this.billingBlockSer.getAllBillingBlockDetails()
      console.log(result);
      if (result.status==='1') {
        this.billingBlockDeatil=result.data
      }
      
    } catch (error) {
      console.error(error);
      
    }
  }

  selectdata(event:any){
    console.log(event.target.checked);
    this.billingBlockDeatil.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.billingBlockDeatil[index].check=event.target.checked
      const findSelect=this.billingBlockDeatil.find((el:any)=>el.check===false)
      console.log(findSelect);
      
      if(findSelect){
        
        this.selectAll=false

      }
      else{
        this.selectAll=true
      }
    }

}
