import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { VendorService } from 'src/app/modules/master/services/vendor/vendor.service';

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
  idleState: any = 'Not Started';
  deliveryPartnerDetails:any = []
  constructor(
    private fb: FormBuilder,
    private deliverySer: DeliveryService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private productSer: ProductService,
    private plantDataSer: PlantDataService,
    private customerSer: CustomerService,
    private salesOrderSer: SalesOrderService,
    private _location: Location,
    private idle: Idle,
    private cd: ChangeDetectorRef,
    private vendorSer:VendorService
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
    this.salesOrderSer.passSalesDetails.subscribe((result: any) => {
      this.salesOrderDetails = result;
    })
    if (Object.keys(this.salesOrderDetails).length === 0) {
      this.router.navigate(['/sales/sales-order-list']);
      return
    }
    this.createDeliveryFormFields()
    this.getAllUomDetail()
    this.getStorageLocation()
    this.getProductMasterDetail()
    this.getCustomerMaster()
    this.getAllDetailsDetails()
    this.getAllDeliveryPaterner()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createDeliveryFormFields() {
    console.log(this.salesOrderDetails, 'kkk')
    this.deliveryFormGroup = this.fb.group({
      salesOrderId:[this.salesOrderDetails.salesOrderId,Validators.required],
      salesOrderName:[this.salesOrderDetails.salesOrder,Validators.required],
      deliveryType: ['', Validators.required],
      deliveryTypeId:['', Validators.required],
      plantId: [this.salesOrderDetails.itemList[0].plantId, Validators.required],
      plantName: [this.salesOrderDetails.itemList[0].plantName],
      deliveryDate: [this.salesOrderDetails.requestedDeliveryDate, Validators.required],
      customerId: [this.salesOrderDetails.customerId, Validators.required],
      customerName: [this.salesOrderDetails.customerName],
      deliveryAddress: [this.salesOrderDetails.customerAddress, Validators.required],
      deliveryPartnerId: ['', Validators.required],
      deliveryPartnerName: ['', Validators.required],


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
        deliveryQty: [data.openQty],
        uomId: [""],
        uomName: [""],
        storageLocationId: [''],
        storageLocationName: [""],
        referenceSalesOrder: [this.salesOrderDetails.salesOrderId],
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
      uomId: [""],
      uomName: [''],
      storageLocationId: [''],
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
      this.isSubmitted = true;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      const userName: any = localStorage.getItem('userName')
      this.deliveryFormGroup.value.createdOn = fullDate
      this.deliveryFormGroup.value.createdBy = userName
      this.deliveryFormGroup.value.changedOn = fullDate
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
   async getAllDeliveryPaterner() {
    try {
      const result: any = await this.vendorSer.getAllVendorDetails()
      if (result.status === '1') {
        this.deliveryPartnerDetails = result.data.filter((el:any) => el.vendorTypeName === 'delivery paterner')
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

  handleDeliveryPartner(event:any){
    if(event.target.value){
      const findDeliveryPartner = this.deliveryPartnerDetails.find((el:any) => el.vendorId === event.target.value);
      this.deliveryFormGroup.controls.deliveryPartnerName.setValue(findDeliveryPartner.vendorName)
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

  handleDeliveryType(event:any){
    const findDeliveryDetails = this.deliveryDetails.find((el:any) => el._id === event.target.value);
    this.deliveryFormGroup.controls.deliveryType.setValue(findDeliveryDetails.code)
  }

  handleUOM(event:any, index:any){
    const findUOMName = this.uomDetail.find((el:any) => el._id === event.target.value);
    const formArray = this.deliveryFormGroup.get('itemList') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    formGroup.patchValue({
      uomName: findUOMName ? findUOMName.code : ''
    });
  }
}
