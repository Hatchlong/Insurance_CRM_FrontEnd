import { Component ,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{

  general: any = FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.create()

  }
  create() {
    this.general = this.fb.group({
      customerId: ['',Validators.required],
      country: ['',Validators.required],
      address: ['',Validators.required],
      postalCode: ['',Validators.required],
      city: ['',Validators.required],
      region: ['',Validators.required],
      telephone: ['',Validators.required],
      taxOne: ['',Validators.required],
      taxTwo: ['',Validators.required],
      vatReg: ['',Validators.required],
     
      plantList: this.fb.array([this.addrow()]),
      salesList:this.fb.array([this.addSales()])
    })

  }


  get detail() {
    return this.general.get('plantList') as FormArray
  }


  addrow() {
    console.log("ajs");

    return this.fb.group({
      currency: [''],
      termOfPayment: [''],
      companyCode: [''],
      reconciliation: [''],
      tax1: [''],
      tax2: [''],
      tax3: [''],
      tax4: [''],
      tax5:['']
    })
  }

  addPlant() {
    this.detail.push(this.addrow())
  }

  deleterow(index:any){
    this.detail.removeAt(index);
  }



  // sales array

  get salesDetail(){
    return this.general.get('salesList') as FormArray
 
  }

  addSales(){
    console.log("sales array");
    return this.fb.group({
      billingBlock: [''],
      workingTime: [''],
      accountGroup: [''],
      deletionFlag: [''],
      deliveryBlock: [''],
      salesOrg: [''],
      distributionChannel: [''],
      division: [''],
      customerGroup: [''],
      modeOfTransport:[''],
      acctAsmt:[''],
      deliveryPlant:[''],
      partial:['']
    })
  }
  addSec(){
    this.salesDetail.push(this.addSales())
  }

  deleteSalesrow(index:any){
    this.salesDetail.removeAt(index);
  }
  addAll(){
    console.log(this.general);
    
  }
}
