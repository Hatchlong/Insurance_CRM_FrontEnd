import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-sales-order',
  templateUrl: './add-sales-order.component.html',
  styleUrls: ['./add-sales-order.component.css']
})
export class AddSalesOrderComponent {

  sales:any=FormGroup
  constructor(private fb:FormBuilder){}

  
  ngOnInit(): void {
      this.add()
  }
  add(){
    this.sales=this.fb.group({
      order:'',
      saleOrg:'',
      dist:'',
      division:'',
      custId:'',
      custAdd:'',
      saleOrder:'',
      custPO:'',
      poDate:'',
      delDate:'',
      comCur:'',
      traCurr:'',
      txt:'',
      orderStatus:'',
      exRate:'',
      modeTra:'',
      netWt:'',
      grossWt:'',
      totVol:'',
      payTerm:'',
      billBlock:'',
      comCode:'',
      custAcc:'',
      netPrice:'',
      netTax:'',
      netDis:'',
      netFre:'',
      otherCh:'',

      salesList:this.fb.array([this.addValue()])


    })
  }

  get detail(){
    return this.sales.get('salesList') as FormArray
  }
  addValue(){
    console.log("Data Added");
    return this.fb.group({
      proId:'',
      proDes:'',
      ordQty:'',
      uom:'',
      plant:'',
      stLoc:'',
      batch:'',
      price:'',
      perUnit:'',
      pricingUnit:'',
      priDate:'',
      vol:' ',
      priuom:'',
      tax:'',
      perUnitTax:'',
      discount:'',
      perDis:'',
      fre:'',
      perFre:'',
      othCharge:'',
      compCurr:'',
      tranCurrency:'',
      exchangeRate:'',
      netWeight:'',
      groWeight:''
    })
    
  }

  addSales(){
    this.detail.push(this.addValue())

  }
  deleterow(index:any){
    this.detail.removeAt(index)
  }

}
