import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncTermService } from '../../../Services/inc-term/inc-term.service';

@Component({
  selector: 'app-inco-term-list',
  templateUrl: './inco-term-list.component.html',
  styleUrls: ['./inco-term-list.component.css']
})
export class IncoTermListComponent implements OnInit {

  incTermDetail: any = []
  selectAll:any=false
  
  constructor(
    private router: Router,
    private incTermSer: IncTermService
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllDetails()
  }

  async getAllDetails() {
    try {
      const result: any = await this.incTermSer.getAllIncTermsDetails()
      console.log(result);
      if (result.status === '1') {
        this.incTermDetail = result.data
      }
    } catch (error) {
      console.error(error);

    }
  }

  selectdata(event:any){
    console.log(event.target.checked);
    this.incTermDetail.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.incTermDetail[index].check=event.target.checked
      const findSelect=this.incTermDetail.find((el:any)=>el.check===false)
      console.log(findSelect);
      
      if(findSelect){
        
        this.selectAll=false

      }
      else{
        this.selectAll=true
      }
    }

}
