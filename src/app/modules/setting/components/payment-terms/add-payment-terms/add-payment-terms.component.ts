import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-payment-terms',
  templateUrl: './add-payment-terms.component.html',
  styleUrls: ['./add-payment-terms.component.css']
})
export class AddPaymentTermsComponent {

  purTem: any = FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.purTem = this.fb.group({
      payTerm: '',
      desc: '',
      day: '',
      fixed: '',
      addit: '',
      
    })
  }

  addCode() {
    console.log(this.purTem);

  }
}
