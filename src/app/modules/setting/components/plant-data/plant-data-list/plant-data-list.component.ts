import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';

@Component({
  selector: 'app-plant-data-list',
  templateUrl: './plant-data-list.component.html',
  styleUrls: ['./plant-data-list.component.css']
})
export class PlantDataListComponent {

  plantDataDetails: any=[]

  constructor(
    private router:Router,
    private plantDataSer: PlantDataService
  ){}

  ngOnInit(url:any): void{
this.getAllPlantDataDetails()
}

  nextPage(url:any){
    this.router.navigate([`${url}`])
  }
  checks=false;
  selectAll(e:any){
    if(e.target.checked==true){
      this.checks=true;
    }else{
      this.checks=false;
    }
  }

  async getAllPlantDataDetails(){
    try {
      const result:any = await this.plantDataSer.getAllPlantData();
      console.log(result)
      if(result.status === '1'){
        this.plantDataDetails = result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
