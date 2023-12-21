import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrgService } from 'src/app/modules/setting/Services/sales-org/sales-org.service';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  general: any = FormGroup
  isSubmitted: any = false;
  productId: any = ''
  salesData: any = []
  storgaeLocationDetails:any=[]
  taxDetails: any = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productSer: ProductService,
    private activeRouter: ActivatedRoute,
    private SalesSer:SalesOrgService,
    private plantDataSer:PlantDataService,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.productId = this.activeRouter.snapshot.paramMap.get('id')
    this.create()
    this.getSingleDetail()
    this.getSalesDetail()
    this.getStorageDetails()
    this.getTaxDetails()
  }


  create() {
    this.general = this.fb.group({
      _id: ['', Validators.required],
      materialDescription: ['', Validators.required],
      materialGroup: ['', Validators.required],
      materialType: ['', Validators.required],
      industrySector: ['', Validators.required],
      netWeight: ['', Validators.required],
      volumn: ['', Validators.required],
      storageCondition: ['', Validators.required],
      tempCondition: ['', Validators.required],
      transporationGroup: ['', Validators.required],
      allowedPKGWeight: ['', Validators.required],
      unitOfDeminsion: ['', Validators.required],
      unitWeight: ['', Validators.required],
      weightUnit: ['', Validators.required],
      allowedPKGVolume: ['', Validators.required],
      volumeUnit: ['', Validators.required],
      excessWTTolerance: ['', Validators.required],
      oldMaterialNumber: ['', Validators.required],
      baseUnitMeasure: ['', Validators.required],
      grossWeight: ['', Validators.required],
      volumnUnit: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      batchManagment: ['', Validators.required],
      taxClassification: ['', Validators.required],
      manfacturePartNo: ['', Validators.required],
      expirationDataRelavance: ['', Validators.required],
      excessVolumnTol: ['', Validators.required],
      materialCost: ['', Validators.required],
      plantData: this.fb.array([this.addrow()]),
      salesData: this.fb.array([this.addSales()])
    })
  }
  get detail() {
    return this.general.get('plantData') as FormArray
  }
  addrow() {
    return this.fb.group({
      storagePlant: [''],
      storageLocation: [''],
      procurementType: [''],
      safetyStock: [''],
      totalReplLeadTime: [''],
      availabilityCheck: [''],
      profitCenter: [''],
      bomRelevance: [''],
    })
  }
  addPlant() {
    this.detail.push(this.addrow())
  }
  deleterow(index: any) {
    this.detail.removeAt(index);
  }



  // sales array
  get salesDetail() {
    return this.general.get('salesData') as FormArray

  }
  addSales() {
    return this.fb.group({
      salesOrganization: [''],
      distributionChannel: [''],
      deliveryUnit: [''],
      deliveringPlant: [''],
      maxDeliveryQTY: [''],
      materialGroup: [''],
      acctAssignmentGrp: [''],
      minimumOrderQTY: [''],
      minimumDeliveryQTY: [''],
    })
  }
  addSec() {
    this.salesDetail.push(this.addSales())
  }
  deleteSalesrow(index: any) {
    this.salesDetail.removeAt(index);
  }

  //get single data

  async getSingleDetail() {
    try {
      const result: any = await this.productSer.singleProductDetails(this.productId)
      if (result.status === '1') {
        console.log(result);
        this.general.patchValue(result.data)
      }
    } catch (error) {
      console.error(error);

    }
  }

  async addAll() {
    try {
      this.isSubmitted = true
      console.log(this.general);


      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      console.log(fullDate);
      this.general.value.createdOn = fullDate
      this.general.value.createdBy = username
      this.general.value.changedOn = fullDate
      this.general.value.changedBy = username

      const result: any = await this.productSer.updatedProductDetails(this.general.value)
      console.log(result);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/product'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });

      }
    } catch (error:any) {
      console.error(error);
      if(error.error.message){
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

   //get storage location 

   async getStorageDetails() {
    try {
      const result: any = await this.plantDataSer.getAllStorageLocationsDetails()
      if (result.status === '1') {
        this.storgaeLocationDetails = result.data
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


  
  //get sales org details

  async getSalesDetail() {
    try {
      const result: any = await this.SalesSer.getAllSalesOrgDetails()
      if (result.status === '1') {
        this.salesData = result.data
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }
//get tax detail
async getTaxDetails() {
  try {
    const result: any = await this.plantDataSer.getAllTaxDetails()
    if (result.status === '1') {
      this.taxDetails = result.data
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
  handleTax(event: any) {
    const findPurchaseDetail = this.taxDetails.find((el: any) => el.tax_ind_code === +event.target.value);
    console.log(findPurchaseDetail, this.taxDetails, event.target.value, 'findPurchaseDetail')
    this.general.controls.taxClassification.setValue(findPurchaseDetail.description)
  }
  

}
