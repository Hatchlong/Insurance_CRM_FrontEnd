import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-billing-block',
  templateUrl: './add-billing-block.component.html',
  styleUrls: ['./add-billing-block.component.css']
})
export class AddBillingBlockComponent {


  billing: any = FormGroup
  isSubmitted:any=false
  
  constructor(private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.channeldata()
  }

  channeldata() {
    this.billing = this.fb.group({
      billingBlock: ['',Validators.required],
      description: ['',Validators.required]
    })
  }
  addCustomerAcc() {
    console.log(this.billing);

  }
}
