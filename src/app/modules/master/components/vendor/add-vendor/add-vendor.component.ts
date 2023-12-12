import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms'
import { CountryService } from '../../../services/country/country.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent {

  productFromGroup: any = FormGroup
  countryLists:any = ''
  isSubmitted:any=false
  constructor(
    private fb: FormBuilder,
    private countrySer:CountryService
  ) {

  }


  ngOnInit(): void {
    this.createProductFormFields()
    this.getCountryList()
  }

  createProductFormFields() {
    this.productFromGroup = this.fb.group({
      vendorName: ['', Validators.required],
      accountGroup: ['', Validators.required],
      addressCountry: ['', Validators.required],
      language: ['', Validators.required],
      modeOfTransport: [''],
      incrementTreams: ['', Validators.required],
      country: ['', Validators.required],
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


  async getCountryList(){
    try {
      const result:any = await this.countrySer.getCountryDetails();
      console.log(result)
      this.countryLists = result
    } catch (error) {
      console.error(error);
    }
  }

  addVendor(){
    this.isSubmitted=true
  }
}
