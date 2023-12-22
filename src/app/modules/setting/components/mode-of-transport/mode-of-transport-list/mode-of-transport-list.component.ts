import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeOfTransportService } from '../../../Services/mode-of-transport/mode-of-transport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mode-of-transport-list',
  templateUrl: './mode-of-transport-list.component.html',
  styleUrls: ['./mode-of-transport-list.component.css']
})
export class ModeOfTransportListComponent implements OnInit {

  modeOfDetails: any = []
  selectAll: any = false
  selectedFile: any = '';
  allMOTDetails: any = []
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "modeOfTransport": "Transport",
    "motDescription": "Description 23"
  }

  constructor(
    private router: Router,
    private motSer: ModeOfTransportService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllmodeoftransportDetailsPage(this.page, this.itemsPerPage)
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  // get all details of mode of transport

  async getAllmodeoftransportDetailsPage(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.motSer.getAllmodeoftransportDetailsPage(page, itemsPerPage)
      console.log(result);
      if (result.status === '1') {
        this.totalItem = result.count
        this.allMOTDetails=result.data
        this.modeOfDetails = result.data
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
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }

  }

  // select multiple checkbox
  selectdata(event: any) {
    console.log(event.target.checked);
    this.selectAll = event.target.checked;
    this.modeOfDetails.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);
    this.modeOfDetails[index].check = event.target.checked
    const findSelect = this.modeOfDetails.find((el: any) => el.check === false)
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
      const result: any = await this.motSer.updatedModeOfTransportDetails(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllmodeoftransportDetailsPage(this.page, this.itemsPerPage)
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

  handleFilter(event:any){
    if(!event.target.value){
      this.modeOfDetails = this.allMOTDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allMOTDetails.filter((obj:any) => ((obj.modeOfTransport.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.motDescription.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.modeOfDetails = isStringIncluded
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
      const result: any = await this.motSer.fileUploadXlsx(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllmodeoftransportDetailsPage(this.page, this.itemsPerPage)
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
    this.modeOfDetails.map((el: any) => {
      // delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    this.motSer.exportToExcel(this.modeOfDetails, 'Mode Of Transport', 'Sheet1');
  }


  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.motSer.exportToExcel(sampleRecord, 'Mode Of Transport', 'Sheet1');
  }


  async handleDeleteMuliple() {
    try {
      const filterData = this.modeOfDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.motSer.updatedManymodeoftransportDetails(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllmodeoftransportDetailsPage(this.page, this.itemsPerPage)
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
    const records = (this.page-1) * this.itemsPerPage;
    this.getAllmodeoftransportDetailsPage(records, this.itemsPerPage)
  }


}
