import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer-acc',
  templateUrl: './add-customer-acc.component.html',
  styleUrls: ['./add-customer-acc.component.css']
})
export class AddCustomerAccComponent implements OnInit {


  customerAcc: any = FormGroup
  isSubmitted: any = false

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.channeldata()
  }

  channeldata() {
    this.customerAcc = this.fb.group({
      customerAccount: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  addCustomerAcc() {
    console.log(this.customerAcc);

  }
}
