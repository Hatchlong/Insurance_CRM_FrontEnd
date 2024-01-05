import { Component ,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit{
isSubmitted:any = false;
isShowPadding:any = false;
  deliveryFormGroup: any = FormGroup
  countryLists: any = ''

  constructor(
    private fb: FormBuilder,

  ) {

  }


  ngOnInit(): void {
    this.createDeliveryFormFields()
    //    this.getCountryList()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createDeliveryFormFields() {
    this.deliveryFormGroup = this.fb.group({
      deliveryType: ['', Validators.required],
      plantId: ['', Validators.required],
      plantName: ['', Validators.required],
      deliivery: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryPartner: ['', Validators.required],

      deliveryList: this.fb.array([this.getdeliveryFields()])
    })
  }


  getdeliveryFields(): FormGroup {
    return this.fb.group({
      deliveryItem: [''],
      productId: [''],
      deliveryQty: [''],
      uomName:[''],
      openQty: [''],
      storageLocationName: [''],
      referenceSalesOrder: [''],
      referenceSalesOrderItem: ['']
    })
  }

  get deliveryListArray() {
    return this.deliveryFormGroup.get('deliveryList') as FormArray
  }

  adddelivery() {
    this.deliveryListArray.push(this.getdeliveryFields());
  }

  deletedelivery(index: any) {
    this.deliveryListArray.removeAt(index)
  }

  submitData() {
    this.isSubmitted = true;
    console.log(this.deliveryFormGroup);
  }

 
}
