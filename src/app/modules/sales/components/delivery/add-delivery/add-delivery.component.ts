import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryService } from '../../../services/delivery/delivery.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/modules/master/services/product/product.service';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
import { CustomerService } from 'src/app/modules/master/services/customer/customer.service';


@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {
  isSubmitted: any = false;
  isShowPadding: any = false;
  deliveryFormGroup: any = FormGroup
  countryLists: any = ''
  uomDetail: any = []
  storageLocationDetail:any=[]
  productDetails:any = []
  customerMasterDetail: any = []
  deliveryTypeDetails: any = []

  constructor(
    private fb: FormBuilder,
    private deliverySer: DeliveryService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private productSer: ProductService,
    private plantDataSer:PlantDataService,
    private customerSer: CustomerService

  ) { }

  ngOnInit(): void {
    this.createDeliveryFormFields()
    this.getAllUomDetail()
    this.getStorageLocation()
    this.getProductMasterDetail()
    this.getCustomerMaster()
    this.getDeliveryTypeDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createDeliveryFormFields() {
    this.deliveryFormGroup = this.fb.group({
      deliveryType: ['', Validators.required],
      plantId: ['33', Validators.required],
      plantName: [''],
      deliveryId: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      customerId: ['', Validators.required],
      customerName: ['11'],
      deliveryAddress: ['', Validators.required],
      deliveryPartner: ['', Validators.required],

      itemList: this.fb.array([this.getdeliveryFields()])
    })
  }


  getdeliveryFields(): FormGroup {
    return this.fb.group({
      plantName: [''],
      deliveryItem: [''],
      deliveryDate: ['' ],

      productId: [''],
      materialId: [''],

      deliveryQty: [''],
      uomName: [''],
      openQty: [''],
      storageLocationName: [''],
      referenceSalesOrder: [''],
      referenceSalesOrderItem: ['']
    })
  }

  get deliveryListArray() {
    return this.deliveryFormGroup.get('itemList') as FormArray
  }

  adddelivery() {
    this.deliveryListArray.push(this.getdeliveryFields());
  }

  deletedelivery(index: any) {
    this.deliveryListArray.removeAt(index)
  }

  async submitData() {
    try {
      this.isSubmitted = true
      const userName: any = localStorage.getItem('userName')
      this.deliveryFormGroup.value.createdOn = '18/12/2023' 
      this.deliveryFormGroup.value.createdBy = userName
      this.deliveryFormGroup.value.changedOn = '18/12/2023'
      this.deliveryFormGroup.value.changedBy = userName
      console.log(this.deliveryFormGroup.value)
      if (this.deliveryFormGroup.invalid)
        return
      const result: any = await this.deliverySer.createDeliveryDetails(this.deliveryFormGroup.value)
      console.log(result);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/sales/delivery-list'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
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

  //get uom detail
  async getAllUomDetail() {
    try {
      const result: any = await this.productSer.getAllUOMDetails()
      if (result.status === '1') {
        this.uomDetail = result.data
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
  //get storage location
  async getStorageLocation(){
    try {
     const result:any=await this.plantDataSer.getAllStorageLocationsDetails()
     if (result.status==='1') {
      this.storageLocationDetail=result.data
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


  async getProductMasterDetail() {
    try {
      const result: any = await this.productSer.getAllProductDetails()
      if (result.status === '1') {
        this.productDetails = result.data
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

 //get customer master
 async getCustomerMaster() {
  try {
    const result: any = await this.customerSer.getAllCustomerDetails()
    // console.log(result.data, 'çustomer data');

    if (result.status === '1') {
      this.customerMasterDetail = result.data
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

// delivery type

async getDeliveryTypeDetails() {
  try {
    const result: any = await this.deliverySer.getAllDeliveryTypeDetails()
    if (result.status === '1') {
      this.deliveryTypeDetails = result.data
      console.log(result)
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


}
