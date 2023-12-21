import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-company-code-list',
  templateUrl: './company-code-list.component.html',
  styleUrls: ['./company-code-list.component.css']
})
export class CompanyCodeListComponent {

  companyCodeDetails: any = []
  selectAll: any = false
  selectedFile: any = ''

  constructor(
    private router: Router,
    private companyCodeSer: CompanyCodeService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllCompanyCodeDetails()
  }

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.companyCodeDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.companyCodeDetails[index].check = event.target.checked
    const findSelect = this.companyCodeDetails.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }





  //get data into list
  async getAllCompanyCodeDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails();
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.companyCodeDetails = result.data;
        if(result.data.length === 0){
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
      const result: any = await this.companyCodeSer.updateCompanyCode(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllCompanyCodeDetails()
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
      const result:any = await this.companyCodeSer.fileUploadCompanyCode(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllCompanyCodeDetails()
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error:any) {
     
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }

  }

  exportExcel(): void {
    this.companyCodeDetails.map((el:any) => {
      delete el._id;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    this.companyCodeSer.exportToExcel(this.companyCodeDetails, 'company Code', 'Sheet1');
  }


  downloadExcel(): void {
    this.companyCodeDetails.map((el:any) => {
      delete el._id;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const sampleRecord = [this.companyCodeDetails[0]]
    this.companyCodeSer.exportToExcel(sampleRecord, 'company Code', 'Sheet1');
  }


  async handleDeleteMuliple(){
    try {
      const filterData = this.companyCodeDetails.filter((el:any) => el.check === true)
      filterData.map((el:any) => {
        el.isActive = "C"
      })
      const result: any = await this.companyCodeSer.updateCompanyCodeMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllCompanyCodeDetails()
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
}
