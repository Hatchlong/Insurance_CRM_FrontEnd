import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncTermService } from '../../../Services/inc-term/inc-term.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inco-term-list',
  templateUrl: './inco-term-list.component.html',
  styleUrls: ['./inco-term-list.component.css']
})
export class IncoTermListComponent implements OnInit {

  incTermDetail: any = []
  selectAll: any = false

  constructor(
    private router: Router,
    private incTermSer: IncTermService,
    private _snackBar: MatSnackBar
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllDetails()
  }

  async getAllDetails() {
    try {
      const result: any = await this.incTermSer.getAllIncTermsDetails()
      console.log(result);
      if (result.status === '1') {
        this.incTermDetail = result.data
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

  selectdata(event: any) {
    console.log(event.target.checked);
    this.incTermDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.incTermDetail[index].check = event.target.checked
    const findSelect = this.incTermDetail.find((el: any) => el.check === false)
    console.log(findSelect);

    if (findSelect) {

      this.selectAll = false

    }
    else {
      this.selectAll = true
    }
  }

  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.incTermSer.updatedIncTermsDetails(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllDetails()
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
