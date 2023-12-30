import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  productDetails: any = []
  selectedFile: any = '';
  allProductDetails: any = []
  selectAll: any = false
  materialTypeDetail: any = []
  isShowPadding: any = false
  selectedMaterialType: string = '';
  selectedIndustry:string=''
  industryDetail: any = []
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;

  filterDetails: any = []

  sampleJson = {
    "materialId": "pro123",
    "materialDescription": "Test",
    "materialTypeId": "7465766876876876",
    "materialTypeName": "A",
    "industrySectorId": "1",
    "industrySectorName": "test",
    "materialGroupId": "1",
    "materialGroupName": "hh",
    "oldMaterialNumber": "1",
    "baseUnitMeasure": "1",
    "grossWeight": "1",
    "createdOn": "1",
    "createdBy": "1",
    "changedOn": "1",
    "changedBy": "1",
    "netWeight": "1",
    "weightUnit": "1",
    "volumn": "1",
    "volumnUnit": "1",
    "storageConditionName": "1",
    "storageConditionId": "1",
    "tempConditionId": "1",
    "tempConditionName": "1",
    "transporationGroupId": "1",
    "transporationGroupName": "1",
    "length": "1",
    "width": "1",
    "height": "1",
    "unitOfDeminsion": "1",
    "allowedPKGWeight": "1",
    "allowedPKGVolume": "1",
    "excessWTTolerance": "1",
    "excessVolumnTol": "1",
    "batchManagment": "1",
    "taxClassificationId": "1",
    "taxClassificationName": "1",
    "manfacturePartNo": "1",
    "expirationDataRelavance": "1",
    "materialCost": "1",
    "plantData": [{
      "storagePlant": "new plant",
      "storageLocation": "storage location",
      "procurementType": "tab",
      "safetyStock": "323",
      "totalReplLeadTime": "768",
      "availabilityCheck": "yes",
      "profitCenter": "profit",
      "bomRelevance": "no",
    }],
    "salesData": [{
      "salesOrganization": "sales",
      "distributionChannel": "channel",
      "deliveryUnit": "33",
      "deliveringPlant": "1",
      "maxDeliveryQTY": "4",
      "materialGroup": "4",
      "acctAssignmentGrp": "acct",
      "minimumOrderQTY": "44",
      "minimumDeliveryQTY": "90",

    }]
  }
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

  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue && !this.selectedMaterialType && !this.selectedIndustry) {
      this.productDetails = this.allProductDetails;
      return;
    }
  
    this.productDetails = this.allProductDetails.filter((obj: any) =>
      ((obj.materialId.toUpperCase()).includes(filterValue) || (obj.materialDescription.toUpperCase()).includes(filterValue)) &&
      (!this.selectedMaterialType || obj.materialTypeName.toLowerCase() === this.selectedMaterialType.toLowerCase()) &&
      (!this.selectedIndustry || obj.industrySectorName.toLowerCase() === this.selectedIndustry.toLowerCase())

    );
  }
  
  handleMaterial(event: any) {
    this.selectedMaterialType = event.target.value;
    this.filterData();
  }
  handleIndustry(event:any){
    this.selectedIndustry = event.target.value;
      this.filterData();
  }
  
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.productDetails = this.allProductDetails.filter((obj: any) =>
      ((obj.materialId.toUpperCase()).includes(filterValue) || (obj.materialDescription.toUpperCase()).includes(filterValue)) &&
      (!this.selectedMaterialType || obj.materialTypeName.toLowerCase() === this.selectedMaterialType.toLowerCase()) &&
      (!this.selectedIndustry || obj.industrySectorName.toLowerCase() === this.selectedIndustry.toLowerCase()) 
    );
  }
  
  // handleFilter(event: any) {
  //   if (!event.target.value) {
  //     this.productDetails = this.allProductDetails
  //   }
  //   console.log(event.target.value)
  //   const isStringIncluded = this.allProductDetails.filter((obj: any) => ((obj.materialId.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.materialDescription.toUpperCase()).includes(event.target.value.toUpperCase())));
  //   this.productDetails = isStringIncluded 
  // }


  // handleMaterial(event: any) {
  //   if (!event.target.value) {
  //     this.productDetails = this.allProductDetails
  //     return
  //   }
    
  //   console.log(event.target.value);
  //   const isStringIncluded = this.allProductDetails.filter((obj: any) => ((obj.materialTypeName.toLowerCase() === (event.target.value).toLowerCase())))
  //   this.productDetails = isStringIncluded
  // }
  // handleIndustry(event: any) {
  //   // if (!event.target.value) {
  //   //   this.productDetails = this.allProductDetails
  //   //   return
  //   // }
  //   // const industryFilter = this.allProductDetails.filter((obj: any) => { return obj.industrySectorName === event.target.value })
  //   // this.productDetails = industryFilter
  //   this.selectedMaterialType = event.target.value;
  //   this.filterData();
  // }



  async getProductDetails(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.productSer.getAllProductDetailsPage(page, itemsPerPage)
      console.log(result);
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.filterDetails = result.data
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

