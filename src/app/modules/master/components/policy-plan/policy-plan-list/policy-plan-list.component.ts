import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PolicyPlanService } from '../../../services/policy-plan/policy-plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-policy-plan-list',
  templateUrl: './policy-plan-list.component.html',
  styleUrls: ['./policy-plan-list.component.css']
})
export class PolicyPlanListComponent implements OnInit {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  policyPlanDetail: any = []
  isShowPadding: any = false
  allPolicyPlanDetail: any = []
  selectAll: any = false
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private policyPlanSer: PolicyPlanService

  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllPolicyPlanDetail(this.filterText, this.page, this.itemsPerPage)

  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.policyPlanDetail.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    this.policyPlanDetail[index].check = event.target.checked
    const findSelect = this.policyPlanDetail.find((el: any) => el.check === false)
    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  //get all detail of agent from the database
  async getAllPolicyPlanDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.policyPlanSer.getAllpolicyPlanDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.policyPlanDetail = result.data
        this.allPolicyPlanDetail = result.data
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

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllPolicyPlanDetail(this.filterText, this.records, this.itemsPerPage)
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
          const result: any = await this.policyPlanSer.updatePolicyPlanDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllPolicyPlanDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllPolicyPlanDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllPolicyPlanDetail(this.filterText, this.records, this.itemsPerPage)
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
          const filterData = this.policyPlanDetail.filter((el: any) => el.check === true)
          filterData.map((el: any) => {
            el.isActive = "C"
          })
          const result: any = await this.policyPlanSer.updatedManypolicyPlanDetails(filterData);
          if (result.status === '1') {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllPolicyPlanDetail(this.filterText, this.records, this.itemsPerPage)
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
      this.policyPlanDetail = this.allPolicyPlanDetail;
      return;
    }

    this.policyPlanDetail = this.allPolicyPlanDetail.filter((obj: any) =>
      ((obj.policyCode.toUpperCase()).includes(filterValue) || (obj.policyName.toUpperCase()).includes(filterValue)))
  }



  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.policyPlanDetail = this.allPolicyPlanDetail.filter((obj: any) =>
      ((obj.policyCode.toUpperCase()).includes(filterValue) || (obj.policyName.toUpperCase()).includes(filterValue)))

  }




}
