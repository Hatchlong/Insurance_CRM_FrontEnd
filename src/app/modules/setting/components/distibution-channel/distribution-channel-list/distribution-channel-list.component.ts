import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DistibutionChannelService } from '../../../Services/distibution-channel/distibution-channel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';


@Component({
  selector: 'app-distribution-channel-list',
  templateUrl: './distribution-channel-list.component.html',
  styleUrls: ['./distribution-channel-list.component.css']
})
export class DistributionChannelListComponent {
  distributionDetails: any = []
  selectAll: any = false
  selectedFile: any = '';
  allDistributionDetails: any = []
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "distributionChannel": "1",
    "distributionDescription": "distribution Description"
  }
  idleState: any = 'Not Started'
  isShowPadding: any = false;
  constructor(
    private router: Router,
    private distributionSer: DistibutionChannelService,
    private _snackBar: MatSnackBar,
    private idle: Idle,
    private cd: ChangeDetectorRef
  ) {
    idle.setIdle(450),
      idle.setTimeout(900),
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Started';
      cd.detectChanges();
    })

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timeout';
    })

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'idle';
    })
  }


  ngOnInit(): void {
    this.getAlldistributionChannelDetailsPage(this.page, this.itemsPerPage)
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  async getAlldistributionChannelDetailsPage(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.distributionSer.getAlldistributionChannelDetailsPage(page, itemsPerPage);
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.totalItem = result.count
        this.allDistributionDetails = result.data
        this.distributionDetails = result.data;
        if (result.data.length === 0) {
          this.selectAll = false
        }
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
      });;
    }
  }

  selectdata(event: any) {
    console.log(event.target.checked);
    this.selectAll = event.target.checked;
    this.distributionDetails.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);
    this.distributionDetails[index].check = event.target.checked
    const findSelect = this.distributionDetails.find((el: any) => el.check === false)
    console.log(findSelect);
    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }


  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.distributionSer.updateDistibutionChannel(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAlldistributionChannelDetailsPage(this.page, this.itemsPerPage)
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
    if (!event.target.value) {
      this.distributionDetails = this.allDistributionDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allDistributionDetails.filter((obj: any) => ((obj.distributionChannel.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.distributionDescription.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.distributionDetails = isStringIncluded
  }



  // File Upload
  importHandle(inputId: any) {
    inputId.click()
  }


  // File Input
  handleFileData(event: any) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    this.uploadFile()
  }

  async uploadFile() {
    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.distributionSer.fileUploadXlsx(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAlldistributionChannelDetailsPage(this.page, this.itemsPerPage)
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }

  }

  exportExcel(): void {
    this.distributionSer.exportToExcel(this.distributionDetails, 'Distribution Channel', 'Sheet1');
  }


  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.distributionSer.exportToExcel(sampleRecord, 'Distribution Channel', 'Sheet1');
  }


  async handleDeleteMuliple() {
    try {
      const filterData = this.distributionDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.distributionSer.updatedManydistributionChannelDetails(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAlldistributionChannelDetailsPage(this.page, this.itemsPerPage)
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

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page - 1) * this.itemsPerPage;
    this.getAlldistributionChannelDetailsPage(records, this.itemsPerPage)
  }

}
