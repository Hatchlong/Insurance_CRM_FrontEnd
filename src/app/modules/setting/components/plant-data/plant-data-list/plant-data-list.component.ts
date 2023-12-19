import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private plantDataSer: PlantDataService,
    private _snackBar:MatSnackBar
  ){}

  ngOnInit(url:any): void{
this.getAllPlantDataDetails()
}

  nextPage(url:any){
    this.router.navigate([`${url}`])
  }
 
  selectdata(event: any) {
    this.plantDataDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.plantDataDetails[index].check = event.target.checked
    const findSelect = this.plantDataDetails.find((el: any) => el.check === false)
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
      if(result.status === '1'){
        this.plantDataDetails = result.data;
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

}
