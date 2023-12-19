import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import Swal from 'sweetalert2';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  general: any = FormGroup
  isSubmitted: any = false;
  taxDetails: any = []
  storagePlant: any = []
  storgaeLocationDetails: any = []
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productSer: ProductService,
    private plantSer: PlantDataService
  ) { }

  ngOnInit(): void {
    this.create()
    this.getTaxIndicatorDetail()
    this.getStoragePlant()

  }


  create() {
    this.general = this.fb.group({
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
      taxIndicatorId: ['', Validators.required],
      taxClassification: ['', Validators.required],
      manfacturePartNo: ['', Validators.required],
      expirationDataRelavance: ['', Validators.required],
      excessVolumnTol: ['', Validators.required],
      materialCost: ['', Validators.required],
      storageLocationId: [''],
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

      const result: any = await this.productSer.createProduct(this.general.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Product Data Processed Successfully ',
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

  // get tax indicator

  async getTaxIndicatorDetail() {
    try {
      const result: any = await this.plantSer.getAllTaxDetails()
      if (result.status === '1') {
        this.taxDetails = result.data
      }
      else {
        // alert("API FAiled")
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
    } catch (error) {
      console.error(error);

    }
  }
  // get storage plant

  async getStoragePlant() {
    try {
      const result: any = await this.plantSer.getAllStorageLocationsDetails()
      if (result.status === '1') {
        this.storagePlant = result.data
      }
      else {
        // alert("API FAiled")
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
    } catch (error) {
      console.error(error);

    }
  }

  // Add the purchase Name
  handleTax(event: any) {
    const taxIndicatorDetail = this.taxDetails.find((el: any) => el.tax_ind_code === +event.target.value);
    console.log(taxIndicatorDetail, this.taxDetails, event.target.value, 'taxIndicatorDetail')
    // this.general.controls.taxIndicatorName.setValue(taxIndicatorDetail.description)
  }

  // Add the storage Plant
  handleStorageLocation(event: any) {
    const findStorageDetail = this.storgaeLocationDetails.find((el: any) => el.stor_loc_id === +event.target.value);
    console.log(findStorageDetail,this.storgaeLocationDetails,event.target.value,'storage location');
    
    this.general.controls.stoargeLocation.setValue(findStorageDetail.description)
  }

}
