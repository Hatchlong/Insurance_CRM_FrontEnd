import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DivionService } from '../../../Services/divion/divion.service';

@Component({
  selector: 'app-divion-list',
  templateUrl: './divion-list.component.html',
  styleUrls: ['./divion-list.component.css']
})
export class DivionListComponent {

  divisionDetails:any = []

  constructor(
    private router:Router,
    private divionSer: DivionService
  ){ }

  ngOnInit(): void {
    this.getAllDivionDetails()
  }

  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  
  async getAllDivionDetails(){
    try {
      const result:any = await this.divionSer.getAllDivionDetails();
      console.log(result)
      if(result.status === '1'){
        this.divisionDetails = result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }


}
