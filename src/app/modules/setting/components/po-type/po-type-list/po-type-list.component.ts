import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoTypeService } from '../../../Services/po-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-po-type-list',
  templateUrl: './po-type-list.component.html',
  styleUrls: ['./po-type-list.component.css']
})
export class PoTypeListComponent implements OnInit{
  potypeDetail:any=[]
  selectAll:any=false

  constructor(
    private router: Router,
    private poTypeSer: PoTypeService,
    private _snackBar:MatSnackBar
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllPoTypeDetails()
  }

  selectdata(event: any) {
    console.log(event.target.checked);
    this.potypeDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.potypeDetail[index].check = event.target.checked
    const findSelect = this.potypeDetail.find((el: any) => el.check === false)
    console.log(findSelect);

    if (findSelect) {

      this.selectAll = false

    }
    else {
      this.selectAll = true
    }
  }



 
  //get data into list
  async getAllPoTypeDetails() {
    try {
      const result: any = await this.poTypeSer.getAllPoType();
      console.log(result);
      if (result.status === '1') {
        result.data.map((el:any)=>{
          el.check=false
        })
        this.potypeDetail = result.data
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

  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.poTypeSer.updatePoType(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPoTypeDetails()
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


}
