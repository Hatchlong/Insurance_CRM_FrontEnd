import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DivionService } from '../../../Services/divion/divion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-divion-list',
  templateUrl: './divion-list.component.html',
  styleUrls: ['./divion-list.component.css']
})
export class DivionListComponent {

  divisionDetails:any = []
  selectAll:any=false
  
  constructor(
    private router:Router,
    private divionSer: DivionService,
    private _snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.getAllDivionDetails()
  }

  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  
  async getAllDivionDetails(){
    try {
      const result:any = await this.divionSer.getAllDivionDetails();
      console.log(result)
      if(result.status === '1'){
        this.divisionDetails = result.data;
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

  selectdata(event:any){
    console.log(event.target.checked);
    this.divisionDetails.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.divisionDetails[index].check=event.target.checked
      const findSelect=this.divisionDetails.find((el:any)=>el.check===false)
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
        const result: any = await this.divionSer.updateDivion(data);
        if (result.status === '1') {
          this._snackBar.open("Deleted Successfully", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.getAllDivionDetails()
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
