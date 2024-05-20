import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RtoStateService } from '../../../services/rto-state/rto-state.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rto-state-list',
  templateUrl: './rto-state-list.component.html',
  styleUrls: ['./rto-state-list.component.css']
})
export class RtoStateListComponent implements OnInit {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  rtoStateDetail: any = []
  selectAll: any = false
  allRtoDetails: any = []
  page?: number = 0;
  itemsPerPage = 10;
  records: any = 0
  selectedFilter: any = 'O'

  filterText: any = {
    active: 'O',
    text: ""
  };

  sampleJson = {
    "rtoStateCode": "bike",
    "description": "hero"
  }

  // handleFilter(event: any) {
  //   if (!event.target.value) {
  //     this.rtoDetails = this.allRtoDetails
  //   }
  //   console.log(event.target.value)
  //   const isStringIncluded = this.allRtoDetails.filter((obj: any) => ((obj.rtoStateCode.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.description.toUpperCase()).includes(event.target.value.toUpperCase())));
  //   this.rtoDetails = isStringIncluded
  // }


  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private rtoStateSer: RtoStateService
  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllRtoStateDetail(this.filterText, this.page, this.itemsPerPage)
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.rtoStateDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.rtoStateDetail[index].check = event.target.checked
    const findSelect = this.rtoStateDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  //   //download sample data
  // downloadExcel(): void {
  //   const sampleRecord = [this.sampleJson]
  //   this.rtoStateSer.exportToExcel(sampleRecord, 'RTOState', 'Sheet1')
  // }

  // //export rto state code data
  // exportExcel(): void {
  //   this.rtoStateSer.exportToExcel(this.rtoStateDetail, 'RTOState', 'Sheet1');
  // }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllRtoStateDetail(this.filterText, this.records, this.itemsPerPage)
  }

  //get all detail of rto state code from the database
  async getAllRtoStateDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.rtoStateSer.getAllRtoStateDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.rtoStateDetail = result.data
        this.allRtoDetails = result.data
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


  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.rtoStateDetail = this.allRtoDetails;
      return;
    }

    this.rtoStateDetail = this.allRtoDetails.filter((obj: any) =>
      ((obj.rtoStateCode.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.rtoStateDetail = this.allRtoDetails.filter((obj: any) =>
      ((obj.rtoStateCode.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }



  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to" + " " + (data.isActive === 'O' ? 'Inactive' : 'Active') + " this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.isActive = data.isActive === 'O' ? 'C' : 'O'
          data.disable = true
          const result: any = await this.rtoStateSer.updateRtoStateDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllRtoStateDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllRtoStateDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllRtoStateDetail(this.filterText, this.records, this.itemsPerPage)
        }
      });


    } catch (error: any) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async handleDeleteMuliple() {
    try {
      Swal.fire({
        title: "Are you sure?",
        // text: "Do you really want to"+""+ Active +"these records?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Disable it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const filterData = this.rtoStateDetail.filter((el: any) => el.check === true)
          filterData.map((el: any) => {
            el.isActive = "C"
          })
          const result: any = await this.rtoStateSer.updateRtoStateMany(filterData);
          if (result.status === '1') {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllRtoStateDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        }
      });


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
