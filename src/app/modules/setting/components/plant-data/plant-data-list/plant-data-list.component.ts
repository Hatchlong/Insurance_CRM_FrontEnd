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
  allPlantDetails:any = []
  selectedFile: any = ''; 


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
        result.data.map((el: any) => {
          el.check = false
        })
        this.allPlantDetails=result.data
        this.plantDataDetails = result.data;
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

  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.plantDataSer.updatePlantData(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPlantDataDetails()
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
     
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleFilter(event:any){
    if(!event.target.value){
      this.plantDataDetails = this.allPlantDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allPlantDetails.filter((obj:any) => ((obj.plantCode.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.name1.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.plantDataDetails = isStringIncluded
  }

}
