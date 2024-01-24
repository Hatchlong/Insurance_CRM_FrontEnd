import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent  {

  inventory: any = FormGroup
  isShowPadding:any = false;
  idleState:any = 'Not Started'

  constructor(
    private fb: FormBuilder
  ){ }

  ngOnIt(): void {
    this.inventoryData()
  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  inventoryData(){
    this.idleState = this.fb.group({
      
      companyCode: ['', Validators.required],
      plant: ['', Validators.required],
      storageLocation: ['', Validators.required],
      productId: ['', Validators.required],
      productDescription: ['', Validators.required],
      unitOfMeasure: ['', Validators.required],
      unrestrictedStock: ['', Validators.required],
      blockedStock: ['', Validators.required],
      reservedStock: ['', Validators.required],
      onOrder: ['', Validators.required],
      returnStock: ['', Validators.required],
      stockInQA: ['', Validators.required],
      reOrderTriggerPoint: ['', Validators.required]
    })
  }

  submitData(){
    // console.log(this.inventoryData)
  }


}
