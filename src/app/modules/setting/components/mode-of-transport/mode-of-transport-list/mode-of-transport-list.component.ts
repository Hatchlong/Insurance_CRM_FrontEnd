import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeOfTransportService } from '../../../Services/mode-of-transport/mode-of-transport.service';

@Component({
  selector: 'app-mode-of-transport-list',
  templateUrl: './mode-of-transport-list.component.html',
  styleUrls: ['./mode-of-transport-list.component.css']
})
export class ModeOfTransportListComponent implements OnInit {

  modeOfDetails: any = []
  selectAll:any = false

  constructor(
    private router: Router,
    private motSer: ModeOfTransportService
  ) { }
  
  ngOnInit(): void {
    this.getMotDetails()
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  // get all details of mode of transport

  async getMotDetails() {
    try {
      const result: any = await this.motSer.getAllModeOfTransportDetails()
      console.log(result);
      if (result.status === '1') {
        this.modeOfDetails = result.data
      }
    } catch (error) {
      console.error(error);
    }

  }

  selectdata(event:any){
    console.log(event.target.checked);
    this.modeOfDetails.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.modeOfDetails[index].check=event.target.checked
      const findSelect=this.modeOfDetails.find((el:any)=>el.check===false)
      console.log(findSelect);
      
      if(findSelect){
        
        this.selectAll=false

      }
      else{
        this.selectAll=true
      }
    }
  
}
