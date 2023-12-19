import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  general: any = FormGroup
  isSubmitted: any = false;
  productId: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productSer: ProductService,
    private activeRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.productId = this.activeRouter.snapshot.paramMap.get('id')
    this.create()
    this.getSingleDetail()

  }


  create() {
    this.general = this.fb.group({
      _id: ['', Validators.required],
      materialDescription: ['', Validators.required],
      materialGroup: ['', Validators.required],
      materialType: ['', Validators.required],
      industrySector: ['', Validators.required],
      netWeight: ['', Validators.required],
      volumn: ['', Validators.required],
      storageCondition: ['', Validators.required],
      tempCondition: ['', Validators.required],
      transporationGroup: ['', Validators.required],
      allowedPKGWeight: ['', Validators.required],
      unitOfDeminsion: ['', Validators.required],
      unitWeight: ['', Validators.required],
      weightUnit: ['', Validators.required],
      allowedPKGVolume: ['', Validators.required],
      volumeUnit: ['', Validators.required],
      excessWTTolerance: ['', Validators.required],
      oldMaterialNumber: ['', Validators.required],
      baseUnitMeasure: ['', Validators.required],
      grossWeight: ['', Validators.required],
      volumnUnit: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      batchManagment: ['', Validators.required],
      taxClassification: ['', Validators.required],
      manfacturePartNo: ['', Validators.required],
      expirationDataRelavance: ['', Validators.required],
      excessVolumnTol: ['', Validators.required],
      materialCost: ['', Validators.required],
      plantData: this.fb.array([this.addrow()]),
      salesData: this.fb.array([this.addSales()])
    })
  }
  get detail() {
    return this.general.get('plantData') as FormArray
  }
  addrow() {
    return this.fb.group({
      storagePlant: [''],
      storageLocation: [''],
      procurementType: [''],
      safetyStock: [''],
      totalReplLeadTime: [''],
      availabilityCheck: [''],
      profitCenter: [''],
      bomRelevance: [''],
    })
  }
  addPlant() {
    this.detail.push(this.addrow())
  }
  deleterow(index: any) {
    this.detail.removeAt(index);
  }



  // sales array
  get salesDetail() {
    return this.general.get('salesData') as FormArray

  }
  addSales() {
    return this.fb.group({
      salesOrganization: [''],
      distributionChannel: [''],
      deliveryUnit: [''],
      deliveringPlant: [''],
      maxDeliveryQTY: [''],
      materialGroup: [''],
      acctAssignmentGrp: [''],
      minimumOrderQTY: [''],
      minimumDeliveryQTY: [''],
    })
  }
  addSec() {
    this.salesDetail.push(this.addSales())
  }
  deleteSalesrow(index: any) {
    this.salesDetail.removeAt(index);
  }

  //get single data

  async getSingleDetail() {
    try {
      const result: any = await this.productSer.singleProductDetails(this.productId)
      if (result.status === '1') {
        console.log(result);
        this.general.patchValue(result.data)
      }
    } catch (error) {
      console.error(error);

    }
  }

  async addAll() {
    try {
      this.isSubmitted = true
      console.log(this.general);


      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      console.log(fullDate);
      this.general.value.createdOn = fullDate
      this.general.value.createdBy = username
      this.general.value.changedOn = fullDate
      this.general.value.changedBy = username

      const result: any = await this.productSer.updatedProductDetails(this.general.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Product Data Updated Successfully ',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/master/product'])
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