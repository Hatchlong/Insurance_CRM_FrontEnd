import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryService } from '../../../services/delivery/delivery.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/modules/master/services/product/product.service';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
import { CustomerService } from 'src/app/modules/master/services/customer/customer.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SalesOrderService } from '../../../services/sales-order/sales-order.service';

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
  storageLocationDetail: any = []
  productDetails: any = []
  customerMasterDetail: any = []
  deliveryTypeDetails: any = []
  idleState: any = 'Not Started';
  search: any;
  deliveryDetails: any = []
  salesOrderDetails: any[] = [];
  selectedSalesDetail = ''
  constructor(
    private fb: FormBuilder,
    private deliverySer: DeliveryService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private productSer: ProductService,
    private plantDataSer: PlantDataService,
    private customerSer: CustomerService,
    private salesOrderSer: SalesOrderService,
    private idle: Idle,
    private cd: ChangeDetectorRef,
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
    this.createDeliveryFormFields()
    this.getSalesOrderDetail()
    this.getAllUomDetail()
    this.getStorageLocation()
    this.getProductMasterDetail()
    this.getCustomerMaster()
    this.getAllDetailsDetails()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createDeliveryFormFields(data?: any) {
    if (data) {
      console.log(data, 'kkkk')
      this.deliveryFormGroup = this.fb.group({
        salesOrderId:[this.selectedSalesDetail, Validators.required],
        deliveryType: ['', Validators.required],
        deliveryTypeId: ['', Validators.required],
        plantId: [data.itemList[0].plantId, Validators.required],
        plantName: [data.itemList[0].plantName],
        deliveryDate: [data.requestedDeliveryDate, Validators.required],
        customerId: [data.customerId, Validators.required],
        customerName: [data.customerName],
        deliveryAddress: [data.customerAddress, Validators.required],
        deliveryPartner: ['', Validators.required],

        itemList: this.fb.array(data.itemList.map((el: any) => this.getdeliveryFields(el, data)))
      })
      return
    }
    this.deliveryFormGroup = this.fb.group({
      salesOrderId: ['', Validators.required],
      deliveryType: ['', Validators.required],
      deliveryTypeId: ['', Validators.required],
      plantId: ['', Validators.required],
      plantName: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryPartner: ['', Validators.required],

      itemList: this.fb.array([this.getdeliveryFields()])
    })
  }


  getdeliveryFields(data?: any, salesData?:any): FormGroup {
    if (data) {
      console.log(data, 'kkkk')
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
        referenceSalesOrder: [salesData._id],
        referenceSalesOrderItem: [salesData.salesOrder]
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


  handleQty(event: any, orderQty: any, index: any) {
    console.log(typeof orderQty, +orderQty < event.target.value)
    if (event.target.value) {
      if (+orderQty < event.target.value) {
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

  handleDeliveryType(event: any) {
    const findDeliveryDetails = this.deliveryDetails.find((el: any) => el._id === event.target.value);
    this.deliveryFormGroup.controls.deliveryType.setValue(findDeliveryDetails.code)
  }

  handleUOM(event: any, index: any) {
    const findUOMName = this.uomDetail.find((el: any) => el._id === event.target.value);
    const formArray = this.deliveryFormGroup.get('itemList') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    formGroup.patchValue({
      uomName: findUOMName ? findUOMName.code : ''
    });
  }


  async getSalesOrderDetail() {
    try {
      const result: any = await this.salesOrderSer.getAllSalesOrderDetails()
      console.log(result)
      if (result.status === '1') {
        this.salesOrderDetails = result.data.filter((el: any) => el.orderStatusName !== "FULLY DELIVERED");
        console.log(this.salesOrderDetails)
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
  typeaheadOnSelect(event: any) {
    console.log('Selected value: ', event.value);
    this.selectedSalesDetail = event.value;
    const salesList = this.salesOrderDetails.find((el: any) => el.salesOrder === event.value);
    this.createDeliveryFormFields(salesList)
  }

}
