import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingBlockService } from '../../../Services/billing-block/billing-block.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-billing-block',
  templateUrl: './edit-billing-block.component.html',
  styleUrls: ['./edit-billing-block.component.css']
})
export class EditBillingBlockComponent {

  billing: any = FormGroup
  isSubmitted: any = false
  billinBlockId:any=''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private billingBlockSer: BillingBlockService,
    private activeRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.billinBlockId=this.activeRouter.snapshot.paramMap.get('id')
    this.channeldata()
    this.getSingleDetail()
  }

  channeldata() {
    this.billing = this.fb.group({
      _id: ['', Validators.required],
      billingBlock: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  //get single data

  async getSingleDetail(){
    try {
      const result:any=await this.billingBlockSer.singleBillingBlockDetails(this.billinBlockId)
      if (result.status==='1') {
        this.billing.patchValue(result.data)
      }
    } catch (error) {
      console.error(error);
      
    }
  }


  //update data
  async addCustomerAcc() {
    try {
      this.isSubmitted = true
      console.log(this.billing);
      if (this.billing.invalid)
        return Swal.fire({
          title: 'warning',
          text: 'All Field Are Required',
          icon: 'warning',
          showCancelButton: true
        })
      const result: any = await this.billingBlockSer.updatedBillingBlockDetails(this.billing.value);
      if (result.status === '1') {
        // alert(result.message);
        Swal.fire({
          title: 'success',
          text: 'Billing Block Updated Successfully',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/billing-block-list/']);
        return;
      }
      if (result.status === '0')
        return alert(result.message);

    } catch (error) {
      console.error(error);

    }


  }

}
