import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryService } from '../../../services/delivery/delivery.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/modules/master/services/product/product.service';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
import { CustomerService } from 'src/app/modules/master/services/customer/customer.service';
import { SalesOrderService } from '../../../services/sales-order/sales-order.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-sales-order',
  templateUrl: './delivery-sales-order.component.html',
  styleUrls: ['./delivery-sales-order.component.css']
})
export class DeliverySalesOrderComponent implements OnInit {

  isSubmitted: any = false;
  isShowPadding: any = false;
  deliveryFormGroup: any = FormGroup
  countryLists: any = ''
  uomDetail: any = []
  storageLocationDetail: any = []
  productDetails: any = []
  customerMasterDetail: any = []
  salesOrderDetails: any = '';
  deliveryDetails: any = []
  constructor(
    private fb: FormBuilder,
    private deliverySer: DeliveryService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private productSer: ProductService,
    private plantDataSer: PlantDataService,
    private customerSer: CustomerService,
    private salesOrderSer: SalesOrderService,
    private _location: Location

  ) {
    this.salesOrderSer.passSalesDetails.subscribe((result: any) => {
      this.salesOrderDetails = result;
    })
    if (Object.keys(this.salesOrderDetails).length === 0) {
      this.router.navigate(['/sales/sales-order-list']);
      return
    }
  }

  ngOnInit(): void {
    this.createDeliveryFormFields()
    this.getAllUomDetail()
    this.getStorageLocation()
    this.getProductMasterDetail()
    this.getCustomerMaster()
    this.getAllDetailsDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createDeliveryFormFields() {
    this.deliveryFormGroup = this.fb.group({
      deliveryType: ['', Validators.required],
      plantId: [this.salesOrderDetails.itemList[0].plantId, Validators.required],
      plantName: [this.salesOrderDetails.itemList[0].plantName],
      deliveryDate: ['', Validators.required],
      customerId: [this.salesOrderDetails.customerId, Validators.required],
      customerName: [this.salesOrderDetails.customerName],
      deliveryAddress: [this.salesOrderDetails.customerAddress, Validators.required],
      deliveryPartner: ['', Validators.required],

      itemList: this.fb.array(this.salesOrderDetails.itemList.map((el: any) => this.getdeliveryFields(el)))
    })
  }


  getdeliveryFields(data?: any) {
    if (data) {
      return this.fb.group({
        plantId: [data.plantId],
        plantName: [data.plantName],
        deliveryItem: [""],
        deliveryDate: [""],

        productId: [data.materialId],
        productName: [data.materialDescription],

        deliveryQty: [data.ordQty],
        uomId: [""],
        uomName: [""],
        openQty: [""],
        storageLocationId: [''],
        storageLocationName: [""],
        referenceSalesOrder: [this.salesOrderDetails._id],
        referenceSalesOrderItem: [this.salesOrderDetails.salesOrder]
      })
    }
    return this.fb.group({
      plantName: [''],
      deliveryItem: [''],
      deliveryDate: [''],

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


  // Get All delivery Details
  async getAllDetailsDetails() {
    try {
      const result: any = await this.deliverySer.getDeliveryDetails()
      if (result.status === '1') {
        this.deliveryDetails = result.data
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
  async getStorageLocation() {
    try {
      const result: any = await this.plantDataSer.getAllStorageLocationsDetails()
      if (result.status === '1') {
        this.storageLocationDetail = result.data
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


  handleQty(event: any, orderQty:any, index:any) {
    console.log(typeof orderQty, +orderQty < event.target.value)
    if(event.target.value){
      if(+orderQty < event.target.value){
        Swal.fire({
          icon: "info",
          title: "info...",
          text: "Please give the input less than or equal to orderQty",
        });
        const formArray = this.deliveryFormGroup.get('itemList') as FormArray;
        const formGroup = formArray.at(index) as FormGroup;
        formGroup.patchValue({
          deliveryItem: ''
        });
      }
    }
  }
}
