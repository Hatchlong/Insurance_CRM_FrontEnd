import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InsuranceTypeService } from '../../../services/insurance-type/insurance-type.service';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insurance-type-list',
  templateUrl: './insurance-type-list.component.html',
  styleUrls: ['./insurance-type-list.component.css']
})
export class InsuranceTypeListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  insuranceTypeDetail: any = []
  selectAll: any = false
  allInsuranceTypeDetail: any = []
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
  //     this.rtoDetails = this.allInsuranceTypeDetail
  //   }
  //   console.log(event.target.value)
  //   const isStringIncluded = this.allInsuranceTypeDetail.filter((obj: any) => ((obj.rtoStateCode.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.description.toUpperCase()).includes(event.target.value.toUpperCase())));
  //   this.rtoDetails = isStringIncluded
  // }


  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private insuranceTypeSer: InsuranceTypeService
  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllinsuranceTypeDetail(this.filterText, this.page, this.itemsPerPage)
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.insuranceTypeDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.insuranceTypeDetail[index].check = event.target.checked
    const findSelect = this.insuranceTypeDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  // handleFilterDetails() {
  //   this.getAllinsuranceTypeDetail(this.filterText, this.records, this.itemsPerPage)
  // }

  //   //download sample data
  // downloadExcel(): void {
  //   const sampleRecord = [this.sampleJson]
  //   this.insuranceTypeSer.exportToExcel(sampleRecord, 'RTOState', 'Sheet1')
  // }

  // //export rto state code data
  // exportExcel(): void {
  //   this.insuranceTypeSer.exportToExcel(this.insuranceTypeDetail, 'RTOState', 'Sheet1');
  // }


  //get all detail of rto state code from the database
  async getAllinsuranceTypeDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.insuranceTypeSer.getAllInsuranceTypeDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.insuranceTypeDetail = result.data
        this.allInsuranceTypeDetail = result.data
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
      this.insuranceTypeDetail = this.allInsuranceTypeDetail;
      return;
    }

    this.insuranceTypeDetail = this.allInsuranceTypeDetail.filter((obj: any) =>
      ((obj.insuranceId.toUpperCase()).includes(filterValue) || (obj.insuranceName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.insuranceTypeDetail = this.allInsuranceTypeDetail.filter((obj: any) =>
      ((obj.insuranceId.toUpperCase()).includes(filterValue) || (obj.insuranceName.toUpperCase()).includes(filterValue)))

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
          const result: any = await this.insuranceTypeSer.updateinsuranceTypeDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllinsuranceTypeDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllinsuranceTypeDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllinsuranceTypeDetail(this.filterText, this.records, this.itemsPerPage)
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
          const filterData = this.insuranceTypeDetail.filter((el: any) => el.check === true)
          filterData.map((el: any) => {
            el.isActive = "C"
          })
          const result: any = await this.insuranceTypeSer.updateinsuranceTypeMany(filterData);
          if (result.status === '1') {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllinsuranceTypeDetail(this.filterText, this.records, this.itemsPerPage)
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

  handleFilterDetails() {
    this.getAllinsuranceTypeDetail(this.filterText, this.records, this.itemsPerPage)
 }


}
