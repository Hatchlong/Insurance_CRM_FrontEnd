import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderStatusService } from '../../../Services/order-status/order-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styleUrls: ['./edit-order-status.component.css']
})
export class EditOrderStatusComponent implements OnInit{
  order: any = FormGroup
  orderStatusId:any=''
  isSubmitted: any = false


  constructor(
    private orderStatusSer: OrderStatusService,
    private router: Router,
    private fb:FormBuilder,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderStatusId=this.activeRouter.snapshot.paramMap.get('id')
    this.code()
    this.getSingleOrderDetail()
  }

  code() {
    this.order = this.fb.group({
      _id:['',Validators.required],
      orderStatus: ['', Validators.required],
      description: ['', Validators.required]

    })
  }

  //get single detail

  async getSingleOrderDetail(){
      try {
        const result:any=await this.orderStatusSer.singleOrderStatusDetails(this.orderStatusId)
        console.log(result);
        if (result.status==='1') {
          this.order.patchValue(result.data)
        }
        
      } catch (error) {
        console.error(error);
        
      }
  }

  async addOrder() {
    try {
      this.isSubmitted=true
      console.log(this.order);
      if (this.order.invalid)
      return Swal.fire({
      title: 'warning',
      text: 'All Field Are Required',
      icon: 'warning',
      showCancelButton: true
    })
      const result: any = await this.orderStatusSer.updatedOrderStatusDetails(this.order.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Order Status Updated Succesfully',
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
