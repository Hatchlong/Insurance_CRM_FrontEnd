import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../../services/vendor/vendor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  vendorDetail: any = []
  allVendorDetail: any = []
  selectAll: any = false
  page?: number = 0;
  itemsPerPage = 10;
  records: any = 0
  selectedFilter: any = 'O'

  filterText: any = {
    active: 'O',
    text: ""
  };


  constructor(private router: Router,
    private _snackBar: MatSnackBar,

    private vendorSer: VendorService) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllVendorDetail(this.filterText, this.page, this.itemsPerPage)
  }

  //get all detail of agent from the database
  async getAllVendorDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.vendorSer.getAllVendorDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.vendorDetail = result.data
        this.allVendorDetail = result.data
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
    this.vendorDetail.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    this.vendorDetail[index].check = event.target.checked
    const findSelect = this.vendorDetail.find((el: any) => el.check === false)
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

  handleFilterDetails() {
    this.getAllVendorDetail(this.filterText, this.records, this.itemsPerPage)
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
          const result: any = await this.vendorSer.updateVendorDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllVendorDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllVendorDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllVendorDetail(this.filterText, this.records, this.itemsPerPage)
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
          const filterData = this.vendorDetail.filter((el: any) => el.check === true)
          filterData.map((el: any) => {
            el.isActive = "C"
          })
          const result: any = await this.vendorSer.updateVendorDetailsMany(filterData);
          if (result.status === '1') {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllVendorDetail(this.filterText, this.records, this.itemsPerPage)
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


  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.vendorDetail = this.allVendorDetail;
      return;
    }

    this.vendorDetail = this.allVendorDetail.filter((obj: any) =>
      ((obj.insurerId.toUpperCase()).includes(filterValue) || (obj.insurerName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.vendorDetail = this.allVendorDetail.filter((obj: any) =>
      ((obj.insurerId.toUpperCase()).includes(filterValue) || (obj.insurerName.toUpperCase()).includes(filterValue)))

  }




}
