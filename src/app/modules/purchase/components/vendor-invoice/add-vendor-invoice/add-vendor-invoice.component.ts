import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-vendor-invoice',
  templateUrl: './add-vendor-invoice.component.html',
  styleUrls: ['./add-vendor-invoice.component.css']
})
export class AddVendorInvoiceComponent {
  vendorInvoice: any= FormGroup;

  constructor (private fb: FormBuilder){}

  ngOnInit(): void {
    this.vendorData()
  }

  vendorData(){
    this.vendorInvoice =  this.fb.group({
      invoiceDate:'',
      postDate:'',
      amount:'',
      taxAmount:'',
      currnecy:'',
      text:'',
      companyCode:'',

      refDoc:'',
      vendor:'',
      venAdd:'',
      venBankDe:'',
      payTerms:'',
      baseDate:'',
      payDueDate:'',

     
     })
  }


  submitData(){
    console.warn(this.vendorInvoice.value)
  }


}
