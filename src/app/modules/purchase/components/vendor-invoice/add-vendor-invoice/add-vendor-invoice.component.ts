import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vendor-invoice',
  templateUrl: './add-vendor-invoice.component.html',
  styleUrls: ['./add-vendor-invoice.component.css']
})
export class AddVendorInvoiceComponent {
  vendorInvoiceFormGroup: any= FormGroup;
  isSubmitted:any = false;
  isShowPadding:any = false;

  constructor (private fb: FormBuilder){}

  ngOnInit(): void {
    this.vendorInvoiceData()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  vendorInvoiceData(){
    this.vendorInvoiceFormGroup =  this.fb.group({
      invoiceDate:['', Validators.required],
      postingDate: ['', Validators.required],
      amount: ['', Validators.required],
      taxAmount: ['', Validators.required],
      currency: ['', Validators.required],
      text: ['', Validators.required] ,
      companyCode:['', Validators.required],

      referenceDocument:['', Validators.required],
      vendor:['', Validators.required],
      vendorAddress:['', Validators.required],
      vendorBankDetails:['', Validators.required],
      paymentTerms:['', Validators.required],
      baseLineDate:['', Validators.required],
      paymentDueDate:['', Validators.required],    

      financialData: this.fb.array([this.getFinancialFields()])

     })
  }

 

  getFinancialFields(): FormGroup {
    return this.fb.group({
      item:[''],
      amount:[''],
      poQty:[''],
      uom:[''],
      grQty:[''],
      settledQty:[''],
      referencePo:[''],
      taxCode:[''],
    })
  }

  submitData(){
    this.isSubmitted = true
    console.warn(this.vendorInvoiceFormGroup.value)
  }

  get financialListArray() {
    return this.vendorInvoiceFormGroup.get('financialData') as FormArray
  }

  addFinancial() {
    this.financialListArray.push(this.getFinancialFields());
    console.log(this.financialListArray.value)
  }

  deleteFinancial(index: any) {
    this.financialListArray.removeAt(index)
  }

}
