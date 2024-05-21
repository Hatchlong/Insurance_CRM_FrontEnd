import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PolictTypeService } from '../../../services/policy-type/polict-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-policy-type-list',
  templateUrl: './policy-type-list.component.html',
  styleUrls: ['./policy-type-list.component.css']
})
export class PolicyTypeListComponent {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  selectAll: any = false
  policyTypeDetail: any = []
  allpolicyTypeDetail: any = []
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
    private policyTypeSer: PolictTypeService
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllpolicyTypeDetail(this.filterText, this.page, this.itemsPerPage)
  }

  async getAllpolicyTypeDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.policyTypeSer.getAllpolicyTypeDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.policyTypeDetail = result.data
        this.allpolicyTypeDetail = result.data
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
      this.policyTypeDetail = this.allpolicyTypeDetail;
      return;
    }

    this.policyTypeDetail = this.allpolicyTypeDetail.filter((obj: any) =>
      ((obj.policyType.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.policyTypeDetail = this.allpolicyTypeDetail.filter((obj: any) =>
      ((obj.policyType.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllpolicyTypeDetail(this.filterText, this.records, this.itemsPerPage)
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
          const result: any = await this.policyTypeSer.updatepolicyTypeDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllpolicyTypeDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllpolicyTypeDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllpolicyTypeDetail(this.filterText, this.records, this.itemsPerPage)
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
