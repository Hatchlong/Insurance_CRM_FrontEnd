import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { YearOfManufactureService } from '../../../services/year-of-manufacture/year-of-manufacture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-year-of-manufacture-list',
  templateUrl: './year-of-manufacture-list.component.html',
  styleUrls: ['./year-of-manufacture-list.component.css']
})
export class YearOfManufactureListComponent {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  selectAll: any = false
  yearOfManufactureDetail: any = []
  allyearOfManufactureDetail: any = []
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
    private yearManuSer: YearOfManufactureService
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllyearOfManufactureDetail(this.filterText, this.page, this.itemsPerPage)
  }

  async getAllyearOfManufactureDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.yearManuSer.getAllyearOfManfactureDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.yearOfManufactureDetail = result.data
        this.allyearOfManufactureDetail = result.data
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
      this.yearOfManufactureDetail = this.allyearOfManufactureDetail;
      return;
    }

    this.yearOfManufactureDetail = this.allyearOfManufactureDetail.filter((obj: any) =>
      ((obj.year.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.yearOfManufactureDetail = this.allyearOfManufactureDetail.filter((obj: any) =>
      ((obj.year.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllyearOfManufactureDetail(this.filterText, this.records, this.itemsPerPage)
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
          const result: any = await this.yearManuSer.updateyearOfManfactureDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllyearOfManufactureDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllyearOfManufactureDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllyearOfManufactureDetail(this.filterText, this.records, this.itemsPerPage)
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

}
