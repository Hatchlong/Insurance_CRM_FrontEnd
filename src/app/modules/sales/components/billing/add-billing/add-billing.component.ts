import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.css']
})
export class AddBillingComponent {


  productFromGroup: any = FormGroup
  countryLists: any = ''
  constructor(
    private fb: FormBuilder,

  ) {

  }


  ngOnInit(): void {
    this.createProductFormFields()
    //    this.getCountryList()
  }

  createProductFormFields() {
    this.productFromGroup = this.fb.group({
      billingType: ['', Validators.required],
      billingDate: ['', Validators.required],
      referenceDoc: ['', Validators.required],
      customerId: ['', Validators.required],
      netValue: [''],
      taxAmount: [''],
      currency: ['', Validators.required],
      exchaneRate: ['', Validators.required],
      companyCode: ['', Validators.required],
      customerAccount: ['', Validators.required],
      postingStatus: ['', Validators.required],
      paymentTerm: ['', Validators.required],
      incrementTearm: ['', Validators.required],
      salesOrg: ['', Validators.required],
      distributionChannel: ['', Validators.required],
      division: ['', Validators.required],
      modeOfTransport: ['', Validators.required],
      netTax: ['', Validators.required],
      netDiscount: ['', Validators.required],
      NetFreight: ['', Validators.required],
      otherCharge: ['', Validators.required],

      financialList: this.fb.array([this.getFinancialFields()])
    })
  }


  getFinancialFields(): FormGroup {
    return this.fb.group({
      financialTax1: [''],
      financialTax2: [''],
      vatReg: [''],

      bankKey: [''],
      bankAcc: [''],
      refDetails: [''],
      accHolder: [''],
      bankD: ['']
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

  addAllBilling() {
    console.log(this.productFromGroup);
  }

}
