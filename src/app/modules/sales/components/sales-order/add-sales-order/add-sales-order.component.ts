import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sales-order',
  templateUrl: './add-sales-order.component.html',
  styleUrls: ['./add-sales-order.component.css']
})
export class AddSalesOrderComponent {
  salesFormGroup:any=FormGroup
  isSubmitted:any = false;
  isShowPadding:any = false;
  constructor(private fb:FormBuilder){}
  
  ngOnInit(): void {
      this.createSalesFormFields()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createSalesFormFields() {
    this.salesFormGroup = this.fb.group({
      orderType:['', Validators.required], 
      saleOrgId:['', Validators.required],
      saleOrgName:[''],
      distributionChannelsId:['', Validators.required],
      distributionChannelsName:['', Validators.required],
      divisionId:['', Validators.required],
      divisionName:['', Validators.required],
      customerId:['', Validators.required],
      customerName:[''],
      customerAddress:['', Validators.required],
      saleOrder:['', Validators.required],
      customerPo:['', Validators.required],
      customerPoDate:['', Validators.required],
      requestedDeliveryDate:['', Validators.required],
      companyCurrency:['', Validators.required],
      transactionCurrency:['', Validators.required],
      text:['', Validators.required],
      orderStatus:['', Validators.required],
      exchangeRate:['', Validators.required],
      modeOfTransport:['', Validators.required],
      totalNetWeight:['', Validators.required],
      totalGrossWeight:['', Validators.required],
      totalVolume:['', Validators.required],
      paymentTerms:['', Validators.required],
      billingBlockId:['', Validators.required],
      billingBlockName:[''],
      companyCodeId:['', Validators.required],
      companyCodeName:[''],
      customerAcctAss:['', Validators.required],
      netPrice:['', Validators.required],
      netTax:['', Validators.required],
      netDiscount:['', Validators.required],
      netFreight:['', Validators.required],
      orderStatusId:['', Validators.required],
      orderStatusName:[''],

      salesData:this.fb.array([this.getSalesFields()])


    })
  }

  // get detail(){
  //   return this.sales.get('salesList') as FormArray
  // }
  getSalesFields(): FormGroup{
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

  async submitData() {
    try {
      this.isSubmitted = true
      const userName: any = localStorage.getItem('userName')
      this.salesFormGroup.value.createdOn = '18/12/2023'
      this.salesFormGroup.value.createdBy = userName
      this.salesFormGroup.value.changedOn = '18/12/2023'
      this.salesFormGroup.value.changedBy = userName
      console.log(this.salesFormGroup.value)
      if (this.salesFormGroup.invalid)
        return
      // const result: any = await this.vendorSer.createVendorDetails(this.vendorFormGroup.value)
      // console.log(result);
      // if (result.status === '1') {
      //   this._snackBar.open(result.message, '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-success',
      //   });
      //   this.router.navigate(['/master/vendor'])
      //   return
      // }
      // if (result.status === '0') {
      //   this._snackBar.open(result.message, '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-error',
      //   });
      //   return
      // }

    } catch (error: any) {
      console.error(error)
      // if (error.error.message) {
      //   this._snackBar.open(error.error.message, '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-error',
      //   });
      //   return
      // }
      // this._snackBar.open('Something went wrong', '', {
      //   duration: 5 * 1000, horizontalPosition: 'center',
      //   verticalPosition: 'top',
      //   panelClass: 'app-notification-error',
      // });
    }
  }
 
 

  get salesOrderArray() {
    return this.salesFormGroup.get('salesOrderData') as FormArray
  }

  addSalesItem() {
    this.salesOrderArray.push(this.getSalesFields());
    console.log(this.salesOrderArray.value)
  }

  deleteSalesItem(index: any) {
    this.salesOrderArray.removeAt(index)
  }

}
