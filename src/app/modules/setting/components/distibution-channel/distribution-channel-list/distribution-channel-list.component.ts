import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DistibutionChannelService } from '../../../Services/distibution-channel/distibution-channel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-distribution-channel-list',
  templateUrl: './distribution-channel-list.component.html',
  styleUrls: ['./distribution-channel-list.component.css']
})
export class DistributionChannelListComponent {
  distributionDetails:any = []
  selectAll:any=false
  constructor(
    private router:Router,
    private distributionSer: DistibutionChannelService,
    private _snackBar: MatSnackBar
  ){

  }

  
  ngOnInit(): void {
    this.getAllDistributionDetails()
  }

  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  async getAllDistributionDetails(){
    try {
      const result:any = await this.distributionSer.getAllDistibutionChannelDetails();
      console.log(result)
      if(result.status === '1'){
        result.data.map((el:any)=>{
          el.check=false
        })
        this.distributionDetails = result.data;
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
    this.distributionDetails.map((el:any)=>{
        el.check=event.target.checked
    })
    
   
  }
   particularcheck(event:any,index:any){
      console.log(event.target.checked);
      
      this.distributionDetails[index].check=event.target.checked
      const findSelect=this.distributionDetails.find((el:any)=>el.check===false)
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
        const result: any = await this.distributionSer.updateDistibutionChannel(data);
        if (result.status === '1') {
          this._snackBar.open("Deleted Successfully", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.getAllDistributionDetails()
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
