import { Component ,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit{
  
  productFromGroup: any = FormGroup
  constructor(
    private fb: FormBuilder,
  ) {

  }


  ngOnInit(): void {
    this.createProductFormFields()
  }

  createProductFormFields() {
    console.log("frrrrrfre");
    
    this.productFromGroup = this.fb.group({
      deliveryType: '',
      plant: '',
      delivery: '',
      deliveryDate: '',
      customerId: '',
      deliveryAddress: '',
      deliveryPartner: '',
      financialList: this.fb.array([this.getFinancialFields()])
    })
  }


  getFinancialFields(): FormGroup {
    return this.fb.group({
      plantItem: [''],
      deliveryItem: [''],
      productId: [''],
      deliveryDate:[''],
      deliveryQty: [''],
      openQty: [''],
      storagelocation: [''],
      refOrder: [''],
      refItem: ['']
    })
  }

  get financialListArray() {
    return this.productFromGroup.get('financialList') as FormArray
  }

  addFinancial() {
    this.financialListArray.push(this.getFinancialFields());
  }

  deleteFinancial(index: any) {
    this.financialListArray.removeAt(index)
  }


 
}
