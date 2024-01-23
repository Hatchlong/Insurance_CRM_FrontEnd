import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.css']
})
export class AddBillingComponent {
isSubmitted:any = false;
isShowPadding:any = false;
  productFromGroup: any = FormGroup
  countryLists: any = ''
  idleState: any = 'Not Started';

  constructor(
    private fb: FormBuilder,
    private idle: Idle,
    private cd: ChangeDetectorRef
  ) {
    idle.setIdle(450),
      idle.setTimeout(900),
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Started';
      cd.detectChanges();
    })

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timeout';
    })

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'idle';
    })

  }


  ngOnInit(): void {
    this.createProductFormFields()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createProductFormFields() {
    this.productFromGroup = this.fb.group({
      billingType: ['', Validators.required],
      billingDate: ['', Validators.required],
      referenceDocument: ['', Validators.required],
      customerId: ['', Validators.required],
      netValue: ['', Validators.required],
      taxAmount: ['', Validators.required],
      currency: ['', Validators.required],
      exchangeRate: ['', Validators.required],
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
      netFreight: ['', Validators.required],
      otherCharge: ['', Validators.required],

      financialList: this.fb.array([this.getFinancialFields()])
    })
  }


  getFinancialFields(): FormGroup {
    return this.fb.group({
      buildQty: [''],
      uom: [''],
      grossweight: [''],
      netWeight:[''],
      volume: [''],
      salesorder: [''],
      salesorderitem: [''],
      referenceDoc: [''],
      pricingDate: [''],
      servicerender:[''],
      priceAmount:[''],
      perunitPrice:[''],
      pricingUnit:[''],
      tax:[''],
      perUnitTax:[''],
      discount:[''],
      perDiscount:[''],
      freight:[''],
      perFreight:[''],
      companyCurrency:[''],
      transactionCurrency:[''],
      exchangeRate:[''],
      hsn:[''],
      countryOrigin:[''],
      destination:[''],
      poNumber:[''],
      poDate:['']
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
    this.isSubmitted = true;
    console.log(this.productFromGroup);
  }

}
