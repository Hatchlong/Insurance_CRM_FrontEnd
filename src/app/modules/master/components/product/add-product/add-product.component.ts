import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
import { SalesOrgService } from 'src/app/modules/setting/Services/sales-org/sales-org.service';
import { DistibutionChannelService } from 'src/app/modules/setting/Services/distibution-channel/distibution-channel.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  general: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false
  storgaeLocationDetails: any = []
  salesData: any = []
  taxDetails: any = [];
  industryDetail: any = []
  storageConditionDetail: any = []
  tempDetails: any = []
  transDetails: any = []
  procurementDetails: any = []
  profitCenterDetail: any = []
  acctAssignDetail: any = []
  materialGrpDetail: any = []
  weigthUnitDetail: any = []
  uomDetail: any = []
  materialTypeDetail: any = []
  distributionDetail: any = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productSer: ProductService,
    private plantDataSer: PlantDataService,
    private distibutionSer: DistibutionChannelService,
    private SalesSer: SalesOrgService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.create()
    this.getStorageDetails()
    this.getSalesDetail()
    this.getTaxDetails()
    this.getIndustryDetails()
    this.getStorageCondition()
    this.getTempCondition()
    this.getTransGroupDetails()
    this.getProcurementDetail()
    this.getProfitCenterDetails()
    this.getAcctAssign()
    this.getMaterialGrp()
    this.getWeightUnit()
    this.getUOMDetail()
    this.getMaterialType()
    this.getDistributionDetail()
  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  create() {
    this.general = this.fb.group({
      materialId: ['1'],
      materialDescription: ['', Validators.required],
      materialGroupId: ['', Validators.required],
      materialGroupName: ['', Validators.required],
      materialTypeId: ['', Validators.required],
      materialTypeName: ['', Validators.required],
      industrySectorId: ['', Validators.required],
      industrySectorName: ['', Validators.required],
      netWeight: ['', Validators.required],
      volumn: ['', Validators.required],
      storageConditionId: ['', Validators.required],
      storageConditionName: ['', Validators.required],
      tempConditionId: ['', Validators.required],
      tempConditionName: ['', Validators.required],
      transporationGroupId: ['', Validators.required],
      transporationGroupName: ['', Validators.required],
      allowedPKGWeight: ['', Validators.required],
      unitOfDeminsion: ['', Validators.required],
      // unitWeight: ['', Validators.required],
      weightUnit: ['', Validators.required],
      allowedPKGVolume: ['', Validators.required],
      // volumeUnit: ['', Validators.required],
      excessWTTolerance: ['', Validators.required],
      oldMaterialNumber: ['', Validators.required],
      baseUnitMeasure: ['', Validators.required],
      grossWeight: ['', Validators.required],
      volumnUnit: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      batchManagment: ['', Validators.required],
      taxClassificationId: ['', Validators.required],
      taxClassificationName: ['', Validators.required],
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
  async addAll() {
    try {
      this.isSubmitted = true
      console.log(this.general.value);

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
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/product'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });

      }
    } catch (error: any) {
      console.error(error);
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top'
      });

    }
  }

  //get storage location 

  async getStorageDetails() {
    try {
      const result: any = await this.plantDataSer.getAllPlantData()
      if (result.status === '1') {
        this.storgaeLocationDetails = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }


  //get sales org details

  async getSalesDetail() {
    try {
      const result: any = await this.SalesSer.getAllSalesOrgDetails()
      console.log(result);

      if (result.status === '1') {
        this.salesData = result.data
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }
  //get tax detail
  async getTaxDetails() {
    try {
      const result: any = await this.plantDataSer.getAllTaxDetails()
      if (result.status === '1') {
        this.taxDetails = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleTax(event: any) {
    const findPurchaseDetail = this.taxDetails.find((el: any) => el._id === event.target.value);
    console.log(findPurchaseDetail, this.taxDetails, event.target.value, 'findPurchaseDetail')
    this.general.controls.taxClassificationName.setValue(findPurchaseDetail.description)
  }


  //get industry sector 

  async getIndustryDetails() {
    try {
      const result: any = await this.productSer.getAllIndustrySectorDetails()
      if (result.status === '1') {
        this.industryDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  // get storage condition

  async getStorageCondition() {
    try {
      const result: any = await this.productSer.getAllStorageConditionsDetails()
      if (result.status === '1') {
        this.storageConditionDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleStorage(event: any) {
    const findStorgeCondition = this.storageConditionDetail.find((el: any) => el._id === event.target.value)
    console.log(findStorgeCondition);
    this.general.controls.storageConditionName.setValue(findStorgeCondition.description)

  }

  handleIndustry(event: any) {
    const findIndustry = this.industryDetail.find((el: any) => el._id === event.target.value)
    console.log(findIndustry);

    this.general.controls.industrySectorName.setValue(findIndustry.description)
  }

  //get temp condition
  async getTempCondition() {
    try {
      const result: any = await this.productSer.getAllTemperatureConditionsDetails()
      if (result.status === '1') {
        this.tempDetails = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleTemp(event: any) {
    const findTemp = this.tempDetails.find((el: any) => el._id === event.target.value)
    console.log(findTemp);
    this.general.controls.tempConditionName.setValue(findTemp.description)

  }
  //get trans details

  async getTransGroupDetails() {
    try {
      const result: any = await this.productSer.getAllTransportationGroupDetails()
      if (result.status === '1') {
        this.transDetails = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleTransGrp(event: any) {
    const findTransDetail = this.transDetails.find((el: any) => el._id === event.target.value)
    console.log(findTransDetail);
    this.general.controls.transporationGroupName.setValue(findTransDetail.description)

  }

  //get material type

  async getMaterialType() {
    try {
      const result: any = await this.productSer.getAllMaterialTypeDetails()
      if (result.status === '1') {
        this.materialTypeDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleMaterialType(event: any) {
    const findMaterialType = this.materialTypeDetail.find((el: any) => el._id === event.target.value)
    console.log(findMaterialType);
    this.general.controls.materialTypeName.setValue(findMaterialType.code)  

  }
  get drop(){
    return this.general.get('materialTypeName')
  }

  //get procuremnent type

  async getProcurementDetail() {
    try {
      const result: any = await this.productSer.getAllprocurementTypeDetails()
      if (result.status === '1') {
        this.procurementDetails = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  //get profit center

  async getProfitCenterDetails() {
    try {
      const result: any = await this.productSer.getAllProfitCenterDetails()
      if (result.status === '1') {
        this.profitCenterDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  //get Account Assign detail

  async getAcctAssign() {
    try {
      const result: any = await this.productSer.getAllAcctAssignDetails()
      if (result.status === '1') {
        this.acctAssignDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  //get Material Grouo Detail

  async getMaterialGrp() {
    try {
      const result: any = await this.productSer.getAllMaterialGroupDetails()
      if (result.status === '1') {
        this.materialGrpDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleMaterialGrp(event: any) {
    const findMaterialGrp = this.materialGrpDetail.find((el: any) => el._id === event.target.value)
    console.log(findMaterialGrp);
    this.general.controls.materialGroupName.setValue(findMaterialGrp.description)

  }

  //get weight unit

  async getWeightUnit() {
    try {
      const result: any = await this.productSer.getAllWeightUnitDetails()
      if (result.status === '1') {
        this.weigthUnitDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  //get uomDetail
  async getUOMDetail() {
    try {
      const result: any = await this.productSer.getAllUOMDetails() 
      if (result.status === '1') {
        this.uomDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  //get distribution channel

  async getDistributionDetail() {
    try {
      const result:any=await this.distibutionSer.getAllDistibutionChannelDetails()
      if (result.status==='1') {
        this.distributionDetail=result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
}