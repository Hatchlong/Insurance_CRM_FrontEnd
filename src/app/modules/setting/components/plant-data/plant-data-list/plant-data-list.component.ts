import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-plant-data-list',
  templateUrl: './plant-data-list.component.html',
  styleUrls: ['./plant-data-list.component.css']
})
export class PlantDataListComponent {

<<<<<<< HEAD
  plantDataDetails: any=[]
  selectAll:any=false
  allPlantDetails:any = []
  selectedFile: any = ''; 

=======
  plantDataDetails: any = [];
  allPlantDataDetails: any = []
  selectAll: any = false;
  selectedFile: any = false;
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "plantCode": "T123",
    "name1": "sdf",
    "name2": "sdf",
    "languageName": "English",
    "address": "sdf",
    "countryName": "Zambia",
    "cityId": "2",
    "contactPersonName": "3",
    "contactNumber": 123456,
    "timeZoneName": "UTC",
    "searchTerm": "fghj",
    "customerNo_plant": "frgh",
    "vendorNumberPlant": "fghj",
    "purchaseOrganizationName": "por12",
    "salesOrganizationName": "Sales Organization",
    "taxIndicatorName": "Taxable",
    "stoargeLocationName": "Scrap yard",
  }
>>>>>>> 66204a757e1731cdcd76d4e5d133b1162599c5b0

  constructor(
    private router: Router,
    private plantDataSer: PlantDataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(url: any): void {
    this.getAllPlantDataDetails(this.page, this.itemsPerPage)
  }

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  selectdata(event: any) {
    this.selectAll = event.target.checked;
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
  async getAllPlantDataDetails(page: any, itemsPerPage: any) {
    try {
<<<<<<< HEAD
      const result:any = await this.plantDataSer.getAllPlantData();
      if(result.status === '1'){
        result.data.map((el: any) => {
          el.check = false
        })
        this.allPlantDetails=result.data
=======
      const result: any = await this.plantDataSer.getAllplantdataDetailsPage(page, itemsPerPage);
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.allPlantDataDetails = result.data
>>>>>>> 66204a757e1731cdcd76d4e5d133b1162599c5b0
        this.plantDataDetails = result.data;
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
        this.getAllPlantDataDetails(this.page, this.itemsPerPage)
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

<<<<<<< HEAD
  handleFilter(event:any){
    if(!event.target.value){
      this.plantDataDetails = this.allPlantDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allPlantDetails.filter((obj:any) => ((obj.plantCode.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.name1.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.plantDataDetails = isStringIncluded
  }

=======
  // File Upload
  importHandle(inputId: any) {
    inputId.click()
  }


  // File Input
  handleFileData(event: any) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    this.uploadFile()
  }

  async uploadFile() {
    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.plantDataSer.fileUploadPlantData(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPlantDataDetails(this.page, this.itemsPerPage)
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
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

  exportExcel(): void {
    this.plantDataDetails.map((el: any) => {
      delete el._id;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    this.plantDataSer.exportToExcel(this.plantDataDetails, 'Plant_data_records', 'Sheet1');
  }


  downloadExcel(): void {
    this.plantDataDetails.map((el: any) => {
      delete el._id;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const sampleRecord = [this.sampleJson]
    this.plantDataSer.exportToExcel(sampleRecord, 'Plant_data_sample', 'Sheet1');
  }


  async handleDeleteMuliple() {
    try {
      const filterData = this.plantDataDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.plantDataSer.updatePlantDataMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPlantDataDetails(this.page, this.itemsPerPage)
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
      console.error(error)
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  handleFilter(event: any) {
    if (!event.target.value) {
      this.plantDataDetails = this.allPlantDataDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allPlantDataDetails.filter((obj: any) => ((obj.plantCode.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.name1.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.plantDataDetails = isStringIncluded
  }


  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page - 1) * this.itemsPerPage;
    this.getAllPlantDataDetails(records, this.itemsPerPage)
  }

>>>>>>> 66204a757e1731cdcd76d4e5d133b1162599c5b0
}
