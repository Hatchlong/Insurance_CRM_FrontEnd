import { Component ,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit{
  isSubmitted:any = true;

  productFromGroup: any = FormGroup
  constructor(
    private fb: FormBuilder,
  ) {

  }


  ngOnInit(): void {
    this.createProductFormFields()
  }

  createProductFormFields() {
    this.isSubmitted = false

    console.log("frrrrrfre");
    
    this.productFromGroup = this.fb.group({
      deliveryType: ['', Validators.required],
      plant: ['', Validators.required],
      delivery: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      customerId: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryPartner: ['', Validators.required],
      financialList: this.fb.array([this.getFinancialFields()])
    })
  }


  getFinancialFields(): FormGroup {
    return this.fb.group({
      plantItem: ['', Validators.required],
      deliveryItem: ['', Validators.required],
      productId: ['', Validators.required],
      deliveryDate:['', Validators.required],
      deliveryQty: ['', Validators.required],
      openQty: ['', Validators.required],
      storagelocation: ['', Validators.required],
      refOrder: ['', Validators.required],
      refItem: ['', Validators.required]
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
