import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoTypeService } from '../../../Services/po-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';



@Component({
  selector: 'app-po-type-list',
  templateUrl: './po-type-list.component.html',
  styleUrls: ['./po-type-list.component.css']
})
export class PoTypeListComponent implements OnInit{
  potypeDetail:any=[] 
  selectAll:any=false
  selectedFile: any = '';
  allPODetail:any=[]
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;

  sampleJson = {
    "poType":"H",
    "poTypeDescription":"h",
    "itemNumberInterval":"h",
    "internalNumberRangeAssignment":"h",
    "externalNumberRangeAssignment":"h"
  }
  isShowPadding:any = false;

  constructor(
    private router: Router,
    private poTypeSer: PoTypeService,
    private _snackBar:MatSnackBar
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllPoTypeDetails(this.page, this.itemsPerPage)
  }

 
  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.potypeDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.potypeDetail[index].check = event.target.checked
    const findSelect = this.potypeDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

 
  //get data into list
  async getAllPoTypeDetails(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.poTypeSer.getAllPOTypePage(page, itemsPerPage);
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.totalItem = result.count
        this.allPODetail = result.data
        this.potypeDetail = result.data;
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
      const result: any = await this.poTypeSer.updatePoType(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPoTypeDetails(this.page, this.itemsPerPage)
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
      const result: any = await this.poTypeSer.fileUploadPOType(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPoTypeDetails(this.page, this.itemsPerPage)
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
    this.poTypeSer.exportToExcel(this.potypeDetail, 'po Type', 'Sheet1');
  }

  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.poTypeSer.exportToExcel(sampleRecord, 'po_type', 'Sheet1');
  }

  // delete selected data
  async handleDeleteMuliple() {
    try {
      const filterData = this.potypeDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.poTypeSer.updatePOTypeMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPoTypeDetails(this.page, this.itemsPerPage)
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

  
  handleFilter(event:any){
    if(!event.target.value){
      this.potypeDetail = this.allPODetail
    }
    console.log(event.target.value)
    const isStringIncluded = this.allPODetail.filter((obj:any) => ((obj.poType.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.poTypeDescription.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.potypeDetail = isStringIncluded
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page-1) * this.itemsPerPage;
    this.getAllPoTypeDetails(records, this.itemsPerPage)
  }

}
