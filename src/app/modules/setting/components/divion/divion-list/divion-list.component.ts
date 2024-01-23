import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DivionService } from '../../../Services/divion/divion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';


@Component({ 
  selector: 'app-divion-list',
  templateUrl: './divion-list.component.html',
  styleUrls: ['./divion-list.component.css']
})
export class DivionListComponent {

  divisionDetails:any = []
  selectAll:any=false
  selectedFile: any = '';
  allDivionDetails: any = []
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "divion": "HAT123",
    "divionDescription": "Hatchlong"
  }
  isShowPadding:any = false;
  idleState: any = 'Not Started'

  constructor(
    private router:Router,
    private divionSer: DivionService,
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
    this.getAllDivionDetails(this.page, this.itemsPerPage)
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }


  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  
  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.divisionDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.divisionDetails[index].check = event.target.checked
    const findSelect = this.divisionDetails.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }


  async getAllDivionDetails(page: any, itemsPerPage: any){
    try {
      const result:any = await this.divionSer.getAllDivionDetailsPage(page, itemsPerPage);
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.totalItem = result.count
        this.allDivionDetails = result.data
        this.divisionDetails = result.data;
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error:any) {
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

    async deleteRecords(data: any) {
      try {
        data.isActive = "C"
        const result: any = await this.divionSer.updateDivion(data);
        if (result.status === '1') {
          this._snackBar.open("Deleted Successfully", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.getAllDivionDetails(this.page, this.itemsPerPage)
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
      const result: any = await this.divionSer.fileUploadDivion(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllDivionDetails(this.page, this.itemsPerPage)
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
    this.divionSer.exportToExcel(this.divisionDetails, 'divion', 'Sheet1');
  }

  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.divionSer.exportToExcel(sampleRecord, 'divion', 'Sheet1');
  }

  async handleDeleteMuliple() {
    try {
      const filterData = this.divisionDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.divionSer.updateDivionMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllDivionDetails(this.page, this.itemsPerPage)
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
    if (!event.target.value) {
      this.divisionDetails = this.allDivionDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allDivionDetails.filter((obj: any) => ((obj.divion.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.divionDescription.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.divisionDetails = isStringIncluded
  }

  
  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page-1) * this.itemsPerPage;
    this.getAllDivionDetails(records, this.itemsPerPage)
  }

}
