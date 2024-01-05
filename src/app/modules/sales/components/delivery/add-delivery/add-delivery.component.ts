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
      plant: ['', Validators.required],
      delivery: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      customerId: ['', Validators.required],
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
      uom:[''],
      openQty: [''],
      storagelocation: [''],
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
