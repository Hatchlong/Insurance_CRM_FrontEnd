import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-add-vendor-invoice',
  templateUrl: './add-vendor-invoice.component.html',
  styleUrls: ['./add-vendor-invoice.component.css']
})
export class AddVendorInvoiceComponent implements OnInit {
  vendorInvoiceFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
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
    this.vendorInvoiceData()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  vendorInvoiceData() {
    this.vendorInvoiceFormGroup = this.fb.group({
      invoiceDate: ['', Validators.required],
      postingDate: ['', Validators.required],
      amount: ['', Validators.required],
      taxAmount: ['', Validators.required],
      currency: ['', Validators.required],
      text: ['', Validators.required],
      companyCode: ['', Validators.required],

      referenceDocument: ['', Validators.required],
      vendor: ['', Validators.required],
      vendorAddress: ['', Validators.required],
      vendorBankDetails: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      baseLineDate: ['', Validators.required],
      paymentDueDate: ['', Validators.required],

      financialData: this.fb.array([this.getFinancialFields()])

    })
  }



  getFinancialFields(): FormGroup {
    return this.fb.group({
      item: [''],
      amount: [''],
      poQty: [''],
      uom: [''],
      grQty: [''],
      settledQty: [''],
      referencePo: [''],
      taxCode: [''],
    })
  }

  submitData() {
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
