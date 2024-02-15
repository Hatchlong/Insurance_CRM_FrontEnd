import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../../../services/agent/agent.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  agentDetail: any = []
  allAgentDetail: any = []
  selectAll: any = false
  selectedCategory: String = ''
  selectedCity: String = ''
  page?: number = 0;
  itemsPerPage = 10;
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
    private agentSer: AgentService,
    private _snackBar: MatSnackBar,

  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllAgentDetail(this.page,this.itemsPerPage)
  }
  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.agentDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.agentDetail[index].check = event.target.checked
    const findSelect = this.agentDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  //download sample data
  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.agentSer.exportToExcel(sampleRecord, 'Agent', 'Sheet1')
  }

  //export agent data
  exportExcel(): void {
    this.agentSer.exportToExcel(this.agentDetail, 'Agent', 'Sheet1');
  }

  //get all detail of agent from the database
  async getAllAgentDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.agentSer.getAllagentDetailsPage(page,itemsPerPage)
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
      data.isActive = "C"
      const result: any = await this.agentSer.updateAgentDetail(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllAgentDetail(this.page,this.itemsPerPage)
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
      const filterData = this.agentDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.agentSer.updateagentMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllAgentDetail(this.page, this.itemsPerPage)
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






  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue && !this.selectedCategory && !this.selectedCity) {
      this.agentDetail = this.allAgentDetail;
      return;
    }

    this.agentDetail = this.allAgentDetail.filter((obj: any) =>
      ((obj.agentId.toUpperCase()).includes(filterValue) || (obj.agentName.toUpperCase()).includes(filterValue) || (obj.mobile).includes(filterValue) || (obj.mailId.toUpperCase()).includes(filterValue)) &&
      (!this.selectedCategory || obj.category.toLowerCase() === this.selectedCategory.toLowerCase()) &&
      (!this.selectedCity || obj.city.toLowerCase() === this.selectedCity.toLowerCase())

    );
  }

  handleCategory(event: any) {
    this.selectedCategory = event.target.value;
    this.filterData();
  }
  handleCity(event: any) {
    this.selectedCity = event.target.value;
    this.filterData();
  }

  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.agentDetail = this.allAgentDetail.filter((obj: any) =>
      ((obj.agentId.toUpperCase()).includes(filterValue) || (obj.agentName.toUpperCase()).includes(filterValue) || (obj.mobile).includes(filterValue) || (obj.mailId.toUpperCase()).includes(filterValue)) &&
      (!this.selectedCategory || obj.category.toLowerCase() === this.selectedCategory.toLowerCase()) &&
      (!this.selectedCity || obj.city.toLowerCase() === this.selectedCity.toLowerCase())
    );
  }



}
