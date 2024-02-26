import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FinancialPeriodService } from '../../../services/financial-period/financial-period.service';

@Component({
  selector: 'app-financial-period-list',
  templateUrl: './financial-period-list.component.html',
  styleUrls: ['./financial-period-list.component.css']
})
export class FinancialPeriodListComponent implements OnInit{

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  selectAll: any = false
  financialPeriodDetail: any = ''
  financialDetail:any = ''
  allFinancialDetails: any = ''
  page?: number = 0;
  itemsPerPage = 10;
 

  constructor(private router: Router,
    private _snackBar:MatSnackBar,
    private financialSer: FinancialPeriodService
    ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllFinancialDetail(this.page,this.itemsPerPage)
  }

 //get all detail of rto state code from the database
 async getAllFinancialDetail(page:any,itemsPerPage:any) {
  try {
    const result: any = await this.financialSer.getAllfinancialPeriodDetailsPage(page,itemsPerPage)
    if (result.status === '1') {
      result.data.map((el: any) => {
        el.check = false
      })
      this.financialDetail = result.data
      this.allFinancialDetails = result.data
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

 //delete 
 async deleteRecords(data: any) {
  try {
    data.isActive = "C"
    const result: any = await this.financialSer.updateFinancialDetail(data);
    if (result.status === '1') {
      this._snackBar.open("Deleted Successfully", '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-success',
      });
      this.getAllFinancialDetail(this.page,this.itemsPerPage)
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

handleFilter(event: any) {
  const filterValue = event.target.value.toUpperCase();
  if (!filterValue) {
    this.financialDetail = this.allFinancialDetails;
    return;
  }

  this.financialDetail = this.allFinancialDetails.filter((obj: any) =>
    ((obj.periodCode.toUpperCase()).includes(filterValue)))
}
filterData() {
  const filterValue = this.searchInput.nativeElement.value.toUpperCase();
  this.financialDetail = this.allFinancialDetails.filter((obj: any) =>
    ((obj.periodCode.toUpperCase()).includes(filterValue)))

}


selectdata(event: any) {
  console.log(event.target.checked)
  this.selectAll = event.target.checked;
  console.log(typeof this.selectAll)
  this.financialDetail.map((el: any) => {
    el.check = event.target.checked
  })


}

particularcheck(event: any, index: any) {
  this.financialDetail[index].check = event.target.checked
  const findSelect = this.financialDetail.find((el: any) => el.check === false)

  if (findSelect) {
    this.selectAll = false
  }
  else {
    this.selectAll = true
  }
}

async handleDeleteMuliple() {
  try {
    const filterData = this.financialDetail.filter((el: any) => el.check === true)
    filterData.map((el: any) => {
      el.isActive = "C"
    })
    const result: any = await this.financialSer.updatedManyFinancialPeriodDetails(filterData);
    if (result.status === '1') {
      this._snackBar.open("Deleted Successfully", '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-success',
      });
      this.getAllFinancialDetail(this.page, this.itemsPerPage)
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

}
