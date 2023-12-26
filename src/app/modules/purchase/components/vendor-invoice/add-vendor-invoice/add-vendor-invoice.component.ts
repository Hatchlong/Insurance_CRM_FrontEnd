import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vendor-invoice',
  templateUrl: './add-vendor-invoice.component.html',
  styleUrls: ['./add-vendor-invoice.component.css']
})
export class AddVendorInvoiceComponent {
  vendorInvoice: any= FormGroup;
  isSubmitted:any = false;
  isShowPadding:any = false;

  constructor (private fb: FormBuilder){}

  ngOnInit(): void {
    this.vendorData()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  vendorData(){
    this.vendorInvoice =  this.fb.group({
      invoiceDate:['', Validators.required],
      postDate: ['', Validators.required],
      amount: ['', Validators.required],
      taxAmount: ['', Validators.required],
      currnecy: ['', Validators.required],
      text: ['', Validators.required] ,
      companyCode:['', Validators.required],

      referenceDocument:['', Validators.required],
      vendor:['', Validators.required],
      vendorAddress:['', Validators.required],
      vendorBankDetails:['', Validators.required],
      paymentTerms:['', Validators.required],
      baseLineDate:['', Validators.required],
      paymentDueDate:['', Validators.required],    
     })
  }


  submitData(){
    this.isSubmitted = true
    console.warn(this.vendorInvoice.value)
  }


}
