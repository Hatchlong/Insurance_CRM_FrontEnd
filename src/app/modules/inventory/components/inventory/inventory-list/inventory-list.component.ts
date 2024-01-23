import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit{

  isShowPadding:any=false
  selectAll: any=false;
  
  idleState: any = 'Not Started';
  storgaeLocationDetails: any;
  comapnyCodeDetails:any=[]

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  ngOnInit(): void {
      this.getStorageDetails()
      this.getCompanyDetails()
  }


  constructor(
    private router:Router,
    private plantSer:PlantDataService,
    private _snackBar: MatSnackBar,
    private companySer:CompanyCodeService

    ){}

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    // this.vendorDetails.map((el: any) => {
    //   el.check = event.target.checked
    // })


  }
  particularcheck(event: any, index: any) {
    // this.vendorDetails[index].check = event.target.checked
    // const findSelect = this.vendorDetails.find((el: any) => el.check === false)

    // if (findSelect) {
    //   this.selectAll = false
    // }
    // else {
    //   this.selectAll = true
    // }
  }

  async getStorageDetails() {
    try {
      const result: any = await this.plantSer.getAllStorageLocationsDetails()
      if (result.status === '1') {
        this.storgaeLocationDetails = result.data
      }
    } catch (error: any) {
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
      });

    }
  }

  
async getCompanyDetails(){
  try {
    const result: any = await this.companySer.getAllCompanyCodeDetails()
    if (result.status === '1') {
      this.comapnyCodeDetails = result.data
    }
  } catch (error: any) {
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
    });

  }
}


}
