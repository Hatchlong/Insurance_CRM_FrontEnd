import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-goods-receipt',
  templateUrl: './add-goods-receipt.component.html',
  styleUrls: ['./add-goods-receipt.component.css']
})
export class AddGoodsReceiptComponent {

  goodsReceipt: any = FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code()
  }




  code() {
    this.goodsReceipt = this.fb.group({
      referencePo:['', Validators.required],
      postingDate:['', Validators.required],
      documentDate:['', Validators.required],


      itemList: this.fb.array([this.addVal()])

    })
  }

  get detail(){
    return this.goodsReceipt.get('itemList') as FormArray
  }

  addVal() {
    console.log("Item Added");

    return this.fb.group({
     productId:'',
     plant:'',
     storageLocation:'',
     poQty:'',
     grQty:'',
     uom:'',
     glAccount:'',
     stockType:''
    })
  }

  addCode() {
    console.log(this.goodsReceipt);

  }

  addItem() { 
    this.detail.push(this.addVal())
  }

  deleterow(index:any){
    this.detail.removeAt(index)
  }


}
