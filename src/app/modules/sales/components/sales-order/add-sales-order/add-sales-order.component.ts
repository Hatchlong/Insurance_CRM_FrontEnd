import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sales-order',
  templateUrl: './add-sales-order.component.html',
  styleUrls: ['./add-sales-order.component.css']
})
export class AddSalesOrderComponent {
  isSubmitted:any = true;
  isShowPadding:any = false;
  sales:any=FormGroup
  constructor(private fb:FormBuilder){}
  
  ngOnInit(): void {
      this.add()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  add(){
    this.isSubmitted = false
    this.sales=this.fb.group({
      orderType:['', Validators.required], 
      saleOrg:['', Validators.required],
      distributionChannel:['', Validators.required],
      division:['', Validators.required],
      customerId:['', Validators.required],
      customerAdd:['', Validators.required],
      saleOrder:['', Validators.required],
      customerPO:['', Validators.required],
      customerPoDate:['', Validators.required],
      reqDeliveryDate:['', Validators.required],
      companyCurrency:['', Validators.required],
      transactionCurr:['', Validators.required],
      text:['', Validators.required],
      orderStatus:['', Validators.required],
      exchangeRate:['', Validators.required],
      modeOfTransaction:['', Validators.required],
      netWeight:['', Validators.required],
      totalGrossWeight:['', Validators.required],
      totalVolume:['', Validators.required],
      paymentTerm:['', Validators.required],
      billingBlock:['', Validators.required],
      companyCode:['', Validators.required],
      customerAccount:['', Validators.required],
      netPrice:['', Validators.required],
      netTax:['', Validators.required],
      netDiscount:['', Validators.required],
      netFreight:['', Validators.required],
      otherChange:['', Validators.required],

      salesList:this.fb.array([this.addValue()])


    })
  }

  get detail(){
    return this.sales.get('salesList') as FormArray
  }
  addValue(){
    console.log("Data Added");
    return this.fb.group({
      productId:['', Validators.required],
      proDes:['', Validators.required],
      ordQty:['', Validators.required],
      uom:['', Validators.required],
      plant:['', Validators.required],
      stLoc:['', Validators.required],
      batch:['', Validators.required],
      price:['', Validators.required],
      perUnit:['', Validators.required],
      pricingUnit:['', Validators.required],
      priDate:['', Validators.required],
      vol:['', Validators.required],
      priuom:['', Validators.required],
      tax:['', Validators.required],
      perUnitTax:['', Validators.required],
      discount:['', Validators.required],
      perDis:['', Validators.required],
      fre:['', Validators.required],
      perFre:['', Validators.required],
      otherCharge:['', Validators.required],
      computerCurrency:['', Validators.required],
      transactionCurrency:['', Validators.required],
      exchangeRate:['', Validators.required],
      netWeight:['', Validators.required],
      groWeight:['', Validators.required],
    })
    
  }

  addSales(){
    this.detail.push(this.addValue())

  }
  deleterow(index:any){
    this.detail.removeAt(index)
  }

}
