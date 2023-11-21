import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.css']
})
export class AddPurchaseOrderComponent {
  purchase: any = FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.purchase = this.fb.group({
      poType: '',
      poNum: '',
      poDate: '',
      comCode: '',
      purOrg: '',
      payTerm: '',
      vendor: '',
      netPrice: '',
      netTax: '',
      tranCurr: '',
      exRate: '',
      comCurr: '',
      remark: '',



      itemList: this.fb.array([this.addVal()])
    })
  }

  get detail(){
    return this.purchase.get('itemList') as FormArray
  }

  addVal() {
    console.log("Item Added");

    return this.fb.group({
      defalut: '',
      proCode: '',
      proDes: '',
      poQty: '',
      uom: '',
      unit: '',
      pricing: '',
      priuom: '',
      priceamount: '',

    })
  }

  addCode() {
    console.log(this.purchase);

  }

  addItem() { 
    this.detail.push(this.addVal())
  }

  deleterow(index:any){
    this.detail.removeAt(index)
  }

}
