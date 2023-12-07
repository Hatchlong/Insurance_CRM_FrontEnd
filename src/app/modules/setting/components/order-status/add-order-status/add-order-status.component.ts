import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-order-status',
  templateUrl: './add-order-status.component.html',
  styleUrls: ['./add-order-status.component.css']
})
export class AddOrderStatusComponent {

  order: any = FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.order = this.fb.group({
      orderStatus:'',
      description:''
      
    })
  }

  addOrder() {
    console.log(this.order);

  }
}
