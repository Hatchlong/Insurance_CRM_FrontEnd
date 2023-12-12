import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sales-org',
  templateUrl: './add-sales-org.component.html',
  styleUrls: ['./add-sales-org.component.css']
})
export class AddSalesOrgComponent {
  salesOrg: any = FormGroup
  isSubmitted:any=false
  
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.salesOrg = this.fb.group({
      salesOrg: ['', Validators.required],
      salesOrgDescription: ['', Validators.required],
      address: ['', Validators.required],
      searchTerm: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      timeZone: ['', Validators.required],
      contactPerson: ['', Validators.required],

    });
    console.warn(this.salesOrg.value);

  }

  addCode(){
this.isSubmitted=true
  }
}
