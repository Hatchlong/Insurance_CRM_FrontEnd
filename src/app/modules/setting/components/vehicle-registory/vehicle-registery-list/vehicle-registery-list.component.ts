import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleCategoryService } from '../../../services/vehicle-category/vehicle-category.service';

@Component({
  selector: 'app-vehicle-registery-list',
  templateUrl: './vehicle-registery-list.component.html',
  styleUrls: ['./vehicle-registery-list.component.css']
})
export class VehicleRegisteryListComponent {

  
    @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


    isShowPadding: any = false
    selectAll: any = false
    vehicleCategoryDetail:any=[]
    allvehicleCategoryDetail:any=[]
  
  
    constructor(private router: Router,
      private vehicleCategorySer:VehicleCategoryService,
      private _snackBar:MatSnackBar) { }
  
    handleSideBar(event: any) {
      this.isShowPadding = event
    }
    nextPage(url: any) {
      this.router.navigate([`${url}`])
    }
    ngOnInit(): void {
        this.getAllVehicleCategoryDetail()
    }
  
    async getAllVehicleCategoryDetail(){
      try {
        const result:any=await this.vehicleCategorySer.getAllVehicleCategoryDetail()
        if (result.status==='1') {
          result.data.map((el: any) => {
            el.check = false
          })
          this.vehicleCategoryDetail = result.data
          this.allvehicleCategoryDetail = result.data
          if (result.data.length === 0) {
            this.selectAll = false
          }
        }
      } catch (error) {
        this._snackBar.open('Something went wrong', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });;
      }
    }
    
    selectdata(event: any) {
      console.log(event.target.checked)
      this.selectAll = event.target.checked;
      console.log(typeof this.selectAll)
      this.vehicleCategoryDetail.map((el: any) => {
        el.check = event.target.checked
      })
  
  
    }
    particularcheck(event: any, index: any) {
      this.vehicleCategoryDetail[index].check = event.target.checked
      const findSelect = this.vehicleCategoryDetail.find((el: any) => el.check === false)
  
      if (findSelect) {
        this.selectAll = false
      }
      else {
        this.selectAll = true
      }
    }
  
    
    handleFilter(event: any) {
      const filterValue = event.target.value.toUpperCase();
      if (!filterValue) {
        this.vehicleCategoryDetail = this.allvehicleCategoryDetail;
        return;
      }
  
      this.vehicleCategoryDetail = this.allvehicleCategoryDetail.filter((obj: any) =>
      ((obj.vehicleCategory.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue) ))
    }
    filterData() {
      const filterValue = this.searchInput.nativeElement.value.toUpperCase();
      this.vehicleCategoryDetail = this.allvehicleCategoryDetail.filter((obj: any) =>
        ((obj.vehicleCategory.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue) )   ) 
  
}
}