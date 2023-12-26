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

selectedFile: any = '';
allVendorDetails:any = []
isShowPadding:any = false
  constructor(
    private router:Router,
    private vendorSer : VendorService,
    private _snackBar: MatSnackBar
  ){ }

   ngOnInit(): void{
    this.getAllVendorData()
  }

  nextPage(url: any){
    this.router.navigate([`${url}`])
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


  handleSideBar(event: any) {
    this.isShowPadding = event
  }


// selectAll (check-box)
  selectdata(event:any){
    console.log(event.target.checked);
    this.vendorDetails.map((el:any)=>{
        el.check=event.target.checked
    })
  }

   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      this.vendorDetails[index].check=event.target.checked
      const findSelect=this.vendorDetails.find((el:any)=>el.check===false)
      console.log(findSelect);
      
      if(findSelect){
        this.selectAll=false
      }
      else{
        this.selectAll=true
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

    
  handleFilter(event:any){
    if(!event.target.value){
      this.vendorDetails = this.allVendorDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allVendorDetails.filter((obj:any) => ((obj.vendorName.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.addressCountry.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.vendorDetails = isStringIncluded
  }

}