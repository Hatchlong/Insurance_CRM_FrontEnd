import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productDetails: any = []
  selectedFile: any = '';
  allProductDetails: any = []
  selectAll: any = false
  materialTypeDetail:any=[]
  isShowPadding:any = false
  sampleJson = {
    "companyCode": "HAT123",
    "companyName": "Hatchlong",
    "countryName": "Zambia",
    "city": "2",
    "currencyName": "INR",
    "languageName": "English",
  }
  industryDetail: any = []
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  constructor(
    private router: Router,
    private productSer: ProductService,
    private _snackBar: MatSnackBar
  ) {

  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }


  ngOnInit(): void {
    this.getProductDetails(this.page, this.itemsPerPage)
    this.getMaterialType()
    this.getIndustryDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.productDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.productDetails[index].check = event.target.checked
    const findSelect = this.productDetails.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  //get industry sector 

  async getIndustryDetails() {
    try {
      const result: any = await this.productSer.getAllIndustrySectorDetails()
      if (result.status === '1') {
        this.industryDetail = result.data
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

  //get material type

  async getMaterialType() {
    try {
      const result: any = await this.productSer.getAllMaterialTypeDetails()
      if (result.status === '1') {
        this.materialTypeDetail = result.data
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
  handleMaterial(event: any) {
    if (!event.target.value) {
      this.productDetails = this.allProductDetails
    }
    console.log(event.target.value);
    // const isStringIncluded = this.allProductDetails.filter((obj: any) => ((obj.materialTypeName === event.target.value)));
    const isStringIncluded=this.allProductDetails.filter((obj:any)=>{return obj.materialTypeName===event.target.value})

    this.productDetails = isStringIncluded


  }
  handleIndustry(event:any){
    if (!event.target.value) {
      this.productDetails=this.allProductDetails
    }
    const industryFilter=this.allProductDetails.filter((obj:any)=>{return obj.industry===event.target.value})
    // const industryFilter=this.allProductDetails.filter((obj:any)=>((obj.industry)))
    this.productDetails=industryFilter
  }

  async getProductDetails(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.productSer.getAllProductDetailsPage(page, itemsPerPage)
      console.log(result);
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.allProductDetails = result.data
        this.productDetails = result.data
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
  //delete particular record


  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.productSer.updatedProductDetails(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getProductDetails(this.page, this.itemsPerPage)
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
      this.productDetails = this.allProductDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allProductDetails.filter((obj: any) => ((obj.materialId.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.materialDescription.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.productDetails = isStringIncluded
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
      const result: any = await this.productSer.fileUploadXlsx(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getProductDetails(this.page, this.itemsPerPage)
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
    this.productSer.exportToExcel(this.productDetails, 'Product', 'Sheet1');
  }


  downloadExcel(): void {
   
    const sampleRecord = [this.sampleJson]
    this.productSer.exportToExcel(sampleRecord, 'Product', 'Sheet1');
  }


  async handleDeleteMuliple() {
    try {
      const filterData = this.productDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.productSer.updatedManyProductDetails(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getProductDetails(this.page, this.itemsPerPage)
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
    this.getProductDetails(records, this.itemsPerPage)
  }

}

