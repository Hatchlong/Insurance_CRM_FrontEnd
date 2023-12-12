import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-order-status',
  templateUrl: './add-order-status.component.html',
  styleUrls: ['./add-order-status.component.css']
})
export class AddOrderStatusComponent {

  order: any = FormGroup
  isSubmitted:any=false

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.order = this.fb.group({
      orderStatus:['',Validators.required],
      description:['',Validators.required]
      
    })
  }

  addOrder() {
    this.isSubmitted=true
    console.log(this.order);

  }
}
