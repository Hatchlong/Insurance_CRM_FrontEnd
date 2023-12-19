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
  selectAll:any=false


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
 
  selectdata(event: any) {
    console.log(event.target.checked);
    this.plantDataDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.plantDataDetails[index].check = event.target.checked
    const findSelect = this.plantDataDetails.find((el: any) => el.check === false)
    console.log(findSelect);

    if (findSelect) {

      this.selectAll = false

    }
    else {
      this.selectAll = true
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
