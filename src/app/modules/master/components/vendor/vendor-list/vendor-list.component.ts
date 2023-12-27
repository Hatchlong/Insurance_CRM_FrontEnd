import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../../services/vendor/vendor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit{

vendorDetails: any = []
selectAll:any=false

vendorTypeDetail: any = []

selectedFile: any = '';
allVendorDetails:any = []
isShowPadding:any = false
totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
sampleJson = {
   
  "vendorName": "Test",
  "vendorTypeId": "1",
  "vendorTypeName":"A",
  "vendorId":"123",
  "addressCountry": "zam",
  "language": "english",
  "modeOfTransport": "1",
  "incrementTreams": "1",
  "country": "1",
  "createdOn": "1",
  "createdBy": "1",
  "changedOn": "1",
  "changedBy": "1",
  "financialData":[{
      "vatRegistrationNo":"1"
  },{
    "vatRegistrationNo":"2"  
  }]
}

  constructor(
    private router:Router,
    private vendorSer : VendorService,
    private _snackBar: MatSnackBar
  ){ }

   ngOnInit(): void{
    this.getAllVendorData()
    this.getVendorType()
  }

  nextPage(url: any){
    this.router.navigate([`${url}`])
  }
  
  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.vendorDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.vendorDetails[index].check = event.target.checked
    const findSelect = this.vendorDetails.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }


   //get data into list
   async getAllVendorData(){
    try {
      const result:any = await this.vendorSer.getAllVendorDetails();
      console.log(result)
      if(result.status === '1'){
        result.data.map((el:any)=>{
          el.check=false
        })
        this.allVendorDetails = result.data
        this.vendorDetails = result.data;
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
      });
    }
  }

    async deleteRecords(data: any) {
      try {
        data.isActive = "C"
        const result: any = await this.vendorSer.updateVendor(data);
        console.log(result)
        if (result.status === '1') {
          this._snackBar.open("Deleted Successfully", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.getAllVendorData() 
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


    // File Upload

  // importHandle(inputId: any) {
  //   inputId.click()
  // }


  // // File Input
  // handleFileData(event: any) {
  //   console.log(event.target.files[0]);
  //   this.selectedFile = event.target.files[0];
  //   this.uploadFile()
  // }

  // async uploadFile() {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', this.selectedFile);
  //     const result: any = await this.vendorSer.fileUploadVendor(formData);
  //     if (result.status === '1') {
  //       this._snackBar.open(result.message, '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-success',
  //       });
  //       this.getAllVendorData(this.page, this.itemsPerPage)
  //       return;
  //     }
  //     if (result.status === '0') {
  //       this._snackBar.open(result.message, '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-error',
  //       });
  //     }
  //   } catch (error: any) {

  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });
  //   }

  // }




    downloadExcel(): void {
   
      const sampleRecord = [this.sampleJson]
      this.vendorSer.exportToExcel(sampleRecord, 'vendor_master', 'Sheet1');
    }

    exportExcel(): void {
      this.vendorSer.exportToExcel(this.vendorDetails, 'vendor', 'Sheet1');
    }


    // async handleDeleteMuliple() {
    //   try {
    //     const filterData = this.vendorDetails.filter((el: any) => el.check === true)
    //     filterData.map((el: any) => {
    //       el.isActive = "C"
    //     })
    //     const result: any = await this.vendorSer.updateVendorMany(filterData);
    //     if (result.status === '1') {
    //       this._snackBar.open("Deleted Successfully", '', {
    //         duration: 5 * 1000, horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //         panelClass: 'app-notification-success',
    //       });
    //       this.getAllVendorData(this.page, this.itemsPerPage)
    //       return;
    //     }
    //     if (result.status === '0') {
    //       this._snackBar.open("Deleted Unsuccessfully", '', {
    //         duration: 5 * 1000, horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //         panelClass: 'app-notification-error',
    //       });
    //     }
  
    //   } catch (error: any) {
    //     console.error(error)
    //     this._snackBar.open('Something went wrong', '', {
    //       duration: 5 * 1000, horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: 'app-notification-error',
    //     });
    //   }
    // }
  


    
  handleFilter(event:any){
    if(!event.target.value){
      this.vendorDetails = this.allVendorDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allVendorDetails.filter((obj:any) => ((obj.vendorId.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.vendorName.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.vendorDetails = isStringIncluded
  }

  handleFilter1(event:any){
    if(!event.target.value){
      this.vendorTypeDetail = this.allVendorDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allVendorDetails.filter((obj:any) => ((obj.vendorTypeName === event.target.value)));
    console.log(isStringIncluded, "table filter")
    this.vendorDetails = isStringIncluded
  }

  async getVendorType() {
    try {
      const result: any = await this.vendorSer.getVendorTypesDetails()
      if (result.status === '1') {
        this.vendorTypeDetail = result.data
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