import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrgService } from 'src/app/modules/setting/Services/sales-org/sales-org.service';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
import { DistibutionChannelService } from 'src/app/modules/setting/Services/distibution-channel/distibution-channel.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  productId: any = ''
  general: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false
  plantDetail: any = []
  salesData: any = []
  taxDetails: any = [];
  industryDetail: any = []
  storageConditionDetail: any = []
  tempDetails: any = []
  transDetails: any = []
  procurementDetails: any = []
  profitCenterDetail: any = []
  distributionDetail: any = []
  acctAssignDetail: any = []
  materialGrpDetail: any = []
  weigthUnitDetail: any = []
  uomDetail: any = []
  materialTypeDetail: any = []
  materialIdisShow:any = true



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productSer: ProductService,
    private activeRouter: ActivatedRoute,
    private SalesSer: SalesOrgService,
    private plantDataSer: PlantDataService,
    private _snackBar: MatSnackBar,
    private distibutionSer:DistibutionChannelService

  ) { }

  ngOnInit(): void {
    this.productId = this.activeRouter.snapshot.paramMap.get('id')
    this.create()
    this.getDistributionDetail()
    this.getSingleDetail()
    this.getSalesDetail()
    this.getStorageDetails()
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
  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  create() {
    this.general = this.fb.group({
      _id: ['', Validators.required],
      materialId: [''],
      materialDescription: ['', Validators.required],
      materialGroupId: ['', Validators.required],
      materialGroupName: ['', Validators.required],
      materialTypeId: ['', Validators.required],
      materialTypeName: ['', Validators.required],
      materialTypeFlag:['', Validators.required],
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

  //get single data

  async getSingleDetail() {
    try {
      const result: any = await this.productSer.singleProductDetails(this.productId)
      if (result.status === '1') {
        console.log(result);
        this.general.patchValue(result.data)
        console.log(this.general.value)
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
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  //get storage location 

  async getStorageDetails() {
    try {
      const result: any = await this.plantDataSer.getAllPlantData()
      if (result.status === '1') {
        this.plantDetail = result.data
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
    const findPurchaseDetail = this.taxDetails.find((el: any) => el.tax_ind_code === +event.target.value);
    console.log(findPurchaseDetail, this.taxDetails, event.target.value, 'findPurchaseDetail')
    this.general.controls.taxClassification.setValue(findPurchaseDetail.description)
  }
  //get material grp

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
    this.general.controls.materialGroupName.setValue(findMaterialGrp.code)

  }

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
  // handleMaterialType(event: any) {
  //   const findMaterialType = this.materialTypeDetail.find((el: any) => el._id === event.target.value)
  //   console.log(findMaterialType);
  //   this.general.controls.materialTypeName.setValue(findMaterialType.code)

  // }

  handleMaterialType(event: any) {
    const findMaterialType = this.materialTypeDetail.find((el: any) => el._id === event.target.value)
    console.log(findMaterialType);
    if(findMaterialType.num_range === 'M'){
      this.materialIdisShow = true;
    }else{
      this.materialIdisShow = false;
    }
    this.general.controls.materialTypeFlag.setValue(findMaterialType.num_range)
    this.general.controls.materialTypeName.setValue(findMaterialType.description)  

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
  handleIndustry(event: any) {
    const findIndustry = this.industryDetail.find((el: any) => el._id === event.target.value)
    console.log(findIndustry);

    this.general.controls.industrySectorName.setValue(findIndustry.description)
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
  handleTemp(event:any){
    const findTemp=this.tempDetails.find((el:any)=>el._id===event.target.value)
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
  handleTransGrp(event:any){
    const findTransDetail=this.transDetails.find((el:any)=>el._id===event.target.value)
    console.log(findTransDetail);
    this.general.controls.transporationGroupName.setValue(findTransDetail.description)
    
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
  handleDistribution(event: any) {
    const findDistribution = this.distributionDetail.find((el: any) => el._id === event.target.value)
    console.log(findDistribution);
    this.general.controls.distributionChannel.setValue(findDistribution.distributionChannel)

  }

  
}
