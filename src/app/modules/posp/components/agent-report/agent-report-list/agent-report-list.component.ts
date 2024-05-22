import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PospService } from '../../../services/posp/posp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agent-report-list',
  templateUrl: './agent-report-list.component.html',
  styleUrls: ['./agent-report-list.component.css']
})
export class AgentReportListComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  agentDetail: any = []
  allAgentDetail: any = []
  selectAll: any = false
  selectedCategory: String = ''
  selectedCity: String = ''
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };


  sampleJson = {
    "agentId": "Ag001",
    "agentName": "Abhay",
    "category": "POS Agent",
    "address": "MMB",
    "country": "India",
    "state": "Uttar Pradesh",
    "city": "Sitapur",
    "pinCode": "261203",
    "mobile": "9198003320",
    "mailId": "abhay12@gmail.com",
    "aadharNumber": "452212345465",
    "panNumber": "EETPA2534",
  }

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private agentReportSer: PospService
  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllAgentDetail(this.filterText, this.page, this.itemsPerPage)
  }


  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllAgentDetail(this.filterText, this.records, this.itemsPerPage)
  }


  //download sample data
  downloadExcel(): void {
    // const sampleRecord = [this.sampleJson]
    // this.agentSer.exportToExcel(sampleRecord, 'Agent', 'Sheet1')
  }

  //export agent data
  exportExcel(): void {
    // this.agentSer.exportToExcel(this.agentDetail, 'Agent', 'Sheet1');
  }

  //get all detail of agent from the database
  async getAllAgentDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.agentReportSer.getAllAgentReportDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.agentDetail = result.data
        this.allAgentDetail = result.data
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
          const result: any = await this.agentReportSer.deleteAgentReportDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllAgentDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllAgentDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllAgentDetail(this.filterText, this.records, this.itemsPerPage)
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




  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.agentDetail = this.allAgentDetail;
      return;
    }

    this.agentDetail = this.allAgentDetail.filter((obj: any) =>
      ((obj.policyNumber.toUpperCase()).includes(filterValue) || (obj.insuredName.toUpperCase()).includes(filterValue))
    );
  }


  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.agentDetail = this.allAgentDetail.filter((obj: any) =>
      ((obj.policyNumber.toUpperCase()).includes(filterValue) || (obj.insuredName.toUpperCase()).includes(filterValue)));
  }



}