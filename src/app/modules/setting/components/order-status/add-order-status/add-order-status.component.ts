import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderStatusService } from '../../../Services/order-status/order-status.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order-status',
  templateUrl: './add-order-status.component.html',
  styleUrls: ['./add-order-status.component.css']
})
export class AddOrderStatusComponent {

  order: any = FormGroup
  isSubmitted: any = false

  constructor(
    private fb: FormBuilder,
    private orderStatusSer: OrderStatusService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.order = this.fb.group({
      orderStatus: ['', Validators.required],
      description: ['', Validators.required]

    })
  }

  async addOrder() {
    try {
      this.isSubmitted = true
      console.log(this.order);
      if (this.order.invalid)
        return
      const result: any = await this.orderStatusSer.createOrderStatus(this.order.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Order Status Created Succesfully',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/order-status-list/'])
        return
      }
      if (result.status === '0') {
        return alert(result.message)
      }
    } catch (error) {
      console.error(error);

    }

  }
}
