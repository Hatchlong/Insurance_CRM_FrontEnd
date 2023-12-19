import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatusService } from '../../../Services/order-status/order-status.service';

@Component({
  selector: 'app-order-status-list',
  templateUrl: './order-status-list.component.html',
  styleUrls: ['./order-status-list.component.css']
})
export class OrderStatusListComponent implements OnInit{

  
  orderStatusDetail:any=[]
  selectAll:any=false
  
  constructor(
    private router:Router,
    private orderStatusSer:OrderStatusService
  ){

  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
      this.getAllDetails()
  }

  //get all details of order status

  async getAllDetails(){
    try {
      const result:any=await this.orderStatusSer.getAllOrderStatusDetails()
      console.log(result);
      if(result.status==='1'){
        this.orderStatusDetail=result.data
      }

    } catch (error) {
      console.error(error);
      
    }
  }

  selectdata(event:any){
    console.log(event.target.checked);
    this.orderStatusDetail.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.orderStatusDetail[index].check=event.target.checked
      const findSelect=this.orderStatusDetail.find((el:any)=>el.check===false)
      console.log(findSelect);
      
      if(findSelect){
        
        this.selectAll=false

      }
      else{
        this.selectAll=true
      }
    }

}
