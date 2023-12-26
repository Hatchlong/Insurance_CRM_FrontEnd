import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.css']
})
export class AddPurchaseOrderComponent {
  purchase: any = FormGroup
  isSubmitted:any = false;
  isShowPadding:any = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  code() {
    this.purchase = this.fb.group({
      poType: ['', Validators.required],
      poNumber: ['', Validators.required],
      poDate: ['', Validators.required],
      companyCode: ['', Validators.required],
      purchaseOrg: ['', Validators.required],
      paymentTerm: ['', Validators.required],
      vendor: ['', Validators.required],
      netTax: ['', Validators.required],
      transactionCurrency: ['', Validators.required],
      exchangeRate: ['', Validators.required],
      companyCurrency: ['', Validators.required],
      remark: ['', Validators.required],
      netPrice: ['', Validators.required],


 
      itemList: this.fb.array([this.addVal()])
    })
  }

  get detail(){
    return this.purchase.get('itemList') as FormArray
  }

  addVal() {
    console.log("Item Added");

    return this.fb.group({
      deliveryAddress: ['', Validators.required],
      productCode: ['', Validators.required],
      productDescription: ['', Validators.required],
      poQty: ['', Validators.required],
      uom: ['', Validators.required],
      perUnitPrice: ['', Validators.required],
      priceUnit: ['', Validators.required],
      priceUom: ['', Validators.required],
      priceAmount: ['', Validators.required],

    })
  }

  addCode() {
    this.isSubmitted=true;
    console.log(this.purchase);

  }

  addItem() { 
    this.detail.push(this.addVal())
  }

  deleterow(index:any){
    this.detail.removeAt(index)
  }

}
