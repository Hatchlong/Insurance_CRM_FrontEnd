import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncTermService } from '../../../Services/inc-term/inc-term.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-inco-term-list',
  templateUrl: './inco-term-list.component.html',
  styleUrls: ['./inco-term-list.component.css']
})
export class IncoTermListComponent implements OnInit { 

  incTermDetail: any = []
  selectAll: any = false
  selectedFile: any = '';
  allIncoTermDetails: any = []
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "inc_terms_code": "HAT123",
    "description": "Hatchlong",
  }

  constructor(
    private router: Router,
    private incTermSer: IncTermService,
    private _snackBar: MatSnackBar
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllIncoTermDetails(this.page, this.itemsPerPage)
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.incTermDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.incTermDetail[index].check = event.target.checked
    const findSelect = this.incTermDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }


   //get data in list
  async getAllIncoTermDetails(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.incTermSer.getAllIncoTermPage(page, itemsPerPage);
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.totalItem = result.count
        this.allIncoTermDetails = result.data
        this.incTermDetail = result.data;
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error: any) {

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
      const result: any = await this.incTermSer.updatedIncTermsDetails(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllIncoTermDetails(this.page, this.itemsPerPage)
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
      const result: any = await this.incTermSer.fileUploadIncoTerm(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllIncoTermDetails(this.page, this.itemsPerPage)
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
    this.incTermDetail.map((el: any) => {
      delete el._id;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    this.incTermSer.exportToExcel(this.incTermDetail, 'incoTerm', 'Sheet1');
  }

  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.incTermSer.exportToExcel(sampleRecord, 'inco_term', 'Sheet1');
  }

  async handleDeleteMuliple() {
    try {
      const filterData = this.incTermDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.incTermSer.updateIncoTermMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllIncoTermDetails(this.page, this.itemsPerPage)
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
      this.incTermDetail = this.allIncoTermDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allIncoTermDetails.filter((obj: any) => ((obj.inc_terms_code).includes(event.target.value) || (obj.description.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.incTermDetail = isStringIncluded
  }



  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page-1) * this.itemsPerPage;
    this.getAllIncoTermDetails(records, this.itemsPerPage)
  }

}
