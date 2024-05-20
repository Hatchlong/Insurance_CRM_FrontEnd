import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApplyPolicyService } from '../../../services/apply-policy/apply-policy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-policy-list',
  templateUrl: './apply-policy-list.component.html',
  styleUrls: ['./apply-policy-list.component.css']
})
export class ApplyPolicyListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  applyPolicyDetail: any = []
  isShowPadding: any = false
  allapplyPolicyDetail: any = []
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
    private applyPolicySer: ApplyPolicyService

  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllapplyPolicyDetail(this.filterText, this.page, this.itemsPerPage)

  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.applyPolicyDetail.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    this.applyPolicyDetail[index].check = event.target.checked
    const findSelect = this.applyPolicyDetail.find((el: any) => el.check === false)
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
    this.getAllapplyPolicyDetail(this.filterText, this.records, this.itemsPerPage)
  }


  //get all detail of agent from the database
  async getAllapplyPolicyDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.applyPolicySer.getAllApplyPolicyDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.applyPolicyDetail = result.data
        this.allapplyPolicyDetail = result.data
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
          const result: any = await this.applyPolicySer.updateApplyPolicyDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllapplyPolicyDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllapplyPolicyDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllapplyPolicyDetail(this.filterText, this.records, this.itemsPerPage)
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
          const filterData = this.applyPolicyDetail.filter((el: any) => el.check === true)
          filterData.map((el: any) => {
            el.isActive = "C"
          })
          const result: any = await this.applyPolicySer.updatedManyApplyPolicy(filterData);
          if (result.status === '1') {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllapplyPolicyDetail(this.filterText, this.records, this.itemsPerPage)
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
      this.applyPolicyDetail = this.allapplyPolicyDetail;
      return;
    }

    this.applyPolicyDetail = this.allapplyPolicyDetail.filter((obj: any) =>
      ((obj.customerName.toUpperCase()).includes(filterValue)))
  }



  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.applyPolicyDetail = this.allapplyPolicyDetail.filter((obj: any) =>
      ((obj.customerName.toUpperCase()).includes(filterValue)))

  }


}
