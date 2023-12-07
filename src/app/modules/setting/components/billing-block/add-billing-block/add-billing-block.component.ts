import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-billing-block',
  templateUrl: './add-billing-block.component.html',
  styleUrls: ['./add-billing-block.component.css']
})
export class AddBillingBlockComponent {


  billing: any = FormGroup
  constructor(private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.channeldata()
  }

  channeldata() {
    this.billing = this.fb.group({
      billingBlock: '',
      description: ''
    })
  }
  addCustomerAcc() {
    console.log(this.billing);

  }
}
