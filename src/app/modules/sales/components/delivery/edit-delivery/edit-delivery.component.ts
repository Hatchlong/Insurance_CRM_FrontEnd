import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/modules/master/services/product/product.service';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
import { DeliveryService } from '../../../services/delivery/delivery.service';

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.css']
})
export class EditDeliveryComponent {
  isSubmitted: any = false;
  isShowPadding: any = false;
  deliveryFormGroup: any = FormGroup
  countryLists: any = ''
  uomDetail: any = []
  storageLocationDetail:any=[]
  deliveryId: any = []

  constructor(
    private fb: FormBuilder,
    private deliverySer: DeliveryService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private productSer: ProductService,
    private plantDataSer:PlantDataService,
    private activeRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.deliveryId=this.activeRouter.snapshot.paramMap.get('id')
    this.createDeliveryFormFields()
    this.getAllUomDetail()
    this.getStorageLocation()
    this.singleDeliveryDetails
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createDeliveryFormFields(data? : any) {
    if(data){
      this.deliveryFormGroup = this.fb.group({
        _id:[data._id,Validators.required],
        deliveryType: [data.deliveryType, Validators.required],
        plantId: [data.plantId, Validators.required],
        plantName: [data.plantName],
        deliivery: [data.deliivery, Validators.required],
        deliveryDate: [data.deliveryDate, Validators.required],
        customerId: [data.customerId, Validators.required],
        customerName: [data.customerName],
        deliveryAddress: [data.deliveryAddress, Validators.required],
        deliveryPartner: [data.deliveryPartner, Validators.required],
  
        itemList: this.fb.array(data.itemList.map((el:any)=>this.getdeliveryFields(el)))
      })
      return
    }
    this.deliveryFormGroup = this.fb.group({
      _id:['',Validators.required],
      deliveryType: ['', Validators.required],
      plantId: ['33', Validators.required],
      plantName: [''],
      deliivery: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      customerId: ['', Validators.required],
      customerName: ['11'],
      deliveryAddress: ['', Validators.required],
      deliveryPartner: ['', Validators.required],

      itemList: this.fb.array([this.getdeliveryFields()])
    })
  }


  getdeliveryFields(data?:any): FormGroup {
    if(data){
      return this.fb.group({
        deliveryItem: [data.deliveryItem],
        productId: [data.productId],
        deliveryQty: [data.deliveryQty],
        uomName: [data.uomName],
        openQty: [data.openQty],
        storageLocationName: [data.storageLocationName],
        referenceSalesOrder: [data.referenceSalesOrder],
        referenceSalesOrderItem: [data.referenceSalesOrderItem]
      })
    }
    return this.fb.group({
      deliveryItem: [''],
      productId: [''],
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
      const result: any = await this.deliverySer.updateDeliveryDetails(this.deliveryFormGroup.value)
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

  // singleDeliveryDetails
  async singleDeliveryDetails() {
    try {
      const result: any = await this.deliverySer.singleDeliveryDetails(this.deliveryId)
      if (result.status === '1') {
        console.log(result);
        this.createDeliveryFormFields(result.data)
      }
    } catch (error) {
      console.error(error);

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

}
