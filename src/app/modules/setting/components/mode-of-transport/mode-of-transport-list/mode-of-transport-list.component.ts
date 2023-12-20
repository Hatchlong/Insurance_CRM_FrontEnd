import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeOfTransportService } from '../../../Services/mode-of-transport/mode-of-transport.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mode-of-transport-list',
  templateUrl: './mode-of-transport-list.component.html',
  styleUrls: ['./mode-of-transport-list.component.css']
})
export class ModeOfTransportListComponent implements OnInit {

  modeOfDetails: any = []
  selectAll:any = false

  constructor(
    private router: Router,
    private motSer: ModeOfTransportService,
    private _snackBar:MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.getMotDetails()
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  // get all details of mode of transport

  async getMotDetails() {
    try {
      const result: any = await this.motSer.getAllModeOfTransportDetails()
      console.log(result);
      if (result.status === '1') {
        this.modeOfDetails = result.data
      }
    } catch (error:any) {
      if (error.error.message) {
       this._snackBar.open(error.error.message, '', {
         duration: 5 * 1000, horizontalPosition: 'center',
         verticalPosition: 'top',
         panelClass: 'app-notification-error',
       });
     }
     this._snackBar.open('Something went wrong', '', {
       duration: 5 * 1000, horizontalPosition: 'center',
       verticalPosition: 'top',
       panelClass: 'app-notification-error',
     });;
   }

  }

  selectdata(event:any){
    console.log(event.target.checked);
    this.modeOfDetails.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.modeOfDetails[index].check=event.target.checked
      const findSelect=this.modeOfDetails.find((el:any)=>el.check===false)
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
        const result: any = await this.motSer.updatedModeOfTransportDetails(data);
        if (result.status === '1') {
          this._snackBar.open("Deleted Successfully", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.getMotDetails()
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
  
  
}
