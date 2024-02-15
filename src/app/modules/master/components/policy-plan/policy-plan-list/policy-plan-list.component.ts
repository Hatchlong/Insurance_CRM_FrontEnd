import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PolicyPlanService } from '../../../services/policy-plan/policy-plan.service';

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
    this.getAllPolicyPlanDetail()

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
  async getAllPolicyPlanDetail() {
    try {
      const result: any = await this.policyPlanSer.getAllPolicyPlan()
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


  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.policyPlanSer.updatePolicyPlanDetail(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPolicyPlanDetail()
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
      this.policyPlanDetail = this.allPolicyPlanDetail;
      return;
    }

    this.policyPlanDetail = this.allPolicyPlanDetail.filter((obj: any) =>
    ((obj.policyCode.toUpperCase()).includes(filterValue) || (obj.policyName.toUpperCase()).includes(filterValue)))
  }



  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.policyPlanDetail = this.allPolicyPlanDetail.filter((obj: any) =>
      ((obj.policyCode.toUpperCase()).includes(filterValue) || (obj.policyName.toUpperCase()).includes(filterValue))   ) 

  }




}
