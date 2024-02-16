import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../services/company-code/company-code.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-code-list',
  templateUrl: './company-code-list.component.html',
  styleUrls: ['./company-code-list.component.css']
})
export class CompanyCodeListComponent implements OnInit {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  selectAll: any = false
  companyCodeDetail: any = []
  allCompanyCodeDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;



  constructor(private router: Router,
    private companyCodeSer: CompanyCodeService,
    private _snackBar: MatSnackBar) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllCompanyCodeDetail(this.page, this.itemsPerPage)
  }

  async getAllCompanyCodeDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.companyCodeSer.getAllcompanyCodeDetailsPage(page,itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.companyCodeDetail = result.data
        this.allCompanyCodeDetail = result.data
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

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.companyCodeDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.companyCodeDetail[index].check = event.target.checked
    const findSelect = this.companyCodeDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }


  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.companyCodeDetail = this.allCompanyCodeDetail;
      return;
    }

    this.companyCodeDetail = this.allCompanyCodeDetail.filter((obj: any) =>
      ((obj.companyCode.toUpperCase()).includes(filterValue) || (obj.companyName.toUpperCase()).includes(filterValue) || (obj.mobile.toUpperCase()).includes(filterValue) || (obj.mailId.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.companyCodeDetail = this.allCompanyCodeDetail.filter((obj: any) =>
      ((obj.companyCode.toUpperCase()).includes(filterValue) || (obj.companyName.toUpperCase()).includes(filterValue) || (obj.mobile.toUpperCase()).includes(filterValue) || (obj.mailId.toUpperCase()).includes(filterValue)))

  }


  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.companyCodeSer.updateCompanyCodeDetail(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllCompanyCodeDetail(this.page, this.itemsPerPage)
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
  
  async handleDeleteMuliple() {
    try {
      const filterData = this.companyCodeDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.companyCodeSer.updatedManyCompanyCodeDetails(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllCompanyCodeDetail(this.page, this.itemsPerPage)
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
