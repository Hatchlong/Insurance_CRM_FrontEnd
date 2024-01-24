import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer/customer.service';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import { SalesOrgService } from 'src/app/modules/setting/Services/sales-org/sales-org.service';
import { PaymentTermService } from 'src/app/modules/setting/Services/payment-term/payment-term.service';
import { DistibutionChannelService } from 'src/app/modules/setting/Services/distibution-channel/distibution-channel.service';
import { DivionService } from 'src/app/modules/setting/Services/divion/divion.service';
import { ModeOfTransportService } from 'src/app/modules/setting/Services/mode-of-transport/mode-of-transport.service';
import { PlantDataService } from 'src/app/modules/setting/Services/plant-data/plant-data.service';
import { CustomerAccountAGService } from 'src/app/modules/setting/Services/customer-account-AG/customer-account-ag.service';
import { BillingBlockService } from 'src/app/modules/setting/Services/billing-block/billing-block.service';
import { ProductService } from '../../../services/product/product.service';
import { VendorService } from '../../../services/vendor/vendor.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {

  general: any = FormGroup
  customerMasterId: any = ''
  isSubmitted: any = false
  isShowPadding: any = false;
  countryDetials: any = [];
  citiesDetails: any = [];
  currencyDetails: any = [];
  paymentTermDetail: any = []
  companyDetails: any = [];
  billingBlockDetail: any = []
  distributionDetail: any;
  salesData: any = [];
  divisionDetail: any = []
  motDetails: any = []
  acctAssignmentDetail: any = []
  plantDetail: any = []
  deliveryBlockDetail: any = []
  customerGroupDetail: any = []
  acctAssignDetail: any;
  reconcilationAccountDetails: any = []
  accountGroupDetails: any = [];
  idleState: any = 'Not Started';

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private customerSer: CustomerService,
    private companyCodeSer: CompanyCodeService,
    private salesOrgSer: SalesOrgService,
    private paymentTermSer: PaymentTermService,
    private distributionSer: DistibutionChannelService,
    private divisionSer: DivionService,
    private modeOfTransportSer: ModeOfTransportService,
    private plantDataSer: PlantDataService,
    private acctAssignmentSer: CustomerAccountAGService,
    private billingblockSer: BillingBlockService,
    private productSer: ProductService,
    private vendorSer: VendorService,
    private idle: Idle,
    private cd: ChangeDetectorRef
  ) {
    idle.setIdle(450),
      idle.setTimeout(900),
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Started';
      cd.detectChanges();
    })

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timeout';
    })

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'idle';
    })
  }

  ngOnInit(): void {
    this.customerMasterId = this.activeRouter.snapshot.paramMap.get('id')
    this.create()
    this.getCountryDetails()
    this.getAllAccountGroup()
    this.getCurrencyDetails()
    this.getPaymentTerm()
    this.getCompanyDetails()
    this.getBillingBlock()
    this.getDistributionDetail()
    this.getSalesDetail()
    this.getDivisionDetail()
    this.getModeOfTransport()
    this.getAcctGroupDetail()
    this.getPlantDetail()
    this.getCustomergroup()
    this.getDeliveryBlock()
    this.singleCustomerDetails()
    this.getAcctAssign()
    this.getReconcilationAccountDetails()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  create(data?: any) {
    if (data) {

      this.general = this.fb.group({
        _id: [data._id, Validators.required],
        customerId: [data.customerId],
        customerName: [data.customerName, Validators.required],
        countryId: [data.countryId, Validators.required],
        countryName: [data.countryName],
        address: [data.address, Validators.required],
        postalCode: [data.postalCode, Validators.required],
        city: [data.city, Validators.required],
        region: [data.region, Validators.required],
        telephone: [data.telephone, Validators.required],
        taxNumber1: [data.taxNumber1, Validators.required],
        taxNumber2: [data.taxNumber2, Validators.required],
        vatRegNO: [data.vatRegNO, Validators.required],
        plantData: this.fb.array(data.plantData.map((ele: any) => this.addrow(ele))),
        salesData: this.fb.array(data.salesData.map((ele: any) => this.addSales(ele)))
      })
      return;
    }
    this.general = this.fb.group({
      _id: ['', Validators.required],
      customerId: [''],
      customerName: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: [''],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      telephone: ['', Validators.required],
      taxNumber1: ['', Validators.required],
      taxNumber2: ['', Validators.required],
      vatRegNO: ['', Validators.required],
      plantData: this.fb.array([this.addrow()]),
      salesData: this.fb.array([this.addSales()])
    })

  }


  get detail() {
    return this.general.get('plantData') as FormArray
  }


  addrow(data?: any) {
    if (data) {
      this.companyDetails.map((el: any) => {
        if (el._id === data.companyCode) {
          el.disable = true
        }
      })
      return this.fb.group({
        currencyId: [data.currencyId],
        currencyName: [data.currencyName],
        termsPayment: [data.termsPayment],
        companyCode: [data.companyCode],
        reconciliationAcct: [data.reconciliationAcct],
        taxClassification1: [data.taxClassification1],
        taxClassification2: [data.taxClassification2],
        taxClassification3: [data.taxClassification3],
        taxClassification4: [data.taxClassification4],
        taxClassification5: [data.taxClassification5]
      })
    }

    return this.fb.group({
      currencyId: [''],
      currencyName: [''],
      termsPayment: [''],
      companyCode: [''],
      reconciliationAcct: [''],
      taxClassification1: [''],
      taxClassification2: [''],
      taxClassification3: [''],
      taxClassification4: [''],
      taxClassification5: ['']
    })
  }

  addPlant() {
    this.detail.push(this.addrow())
  }

  deleterow(index: any, companyCode: any) {
    if (companyCode) {
      this.companyDetails.map((el: any) => {
        if (el._id === companyCode) {
          el.disable = false
        }
      })
    }
    this.detail.removeAt(index);
  }
  // sales array

  get salesDetail() {
    return this.general.get('salesData') as FormArray

  }

  addSales(data?: any) {
    if (data) {

      return this.fb.group({
        billingBlock: [data.billingBlock],
        workingTimes: [data.workingTimes],
        accountGroup: [data.accountGroup],
        deletionFlag: [data.deletionFlag],
        deliveryBlock: [data.deliveryBlock],
        salesOrganization: [data.salesOrganization],
        distributionChannel: [data.distributionChannel],
        division: [data.division],
        customerGroup: [data.customerGroup],
        modeOfTransport: [data.modeOfTransport],
        acctAssGrpCustomer: [data.acctAssGrpCustomer],
        deliveryPlant: [data.deliveryPlant],
        partialDeliveryAllowed: [data.partial]
      })
    }
    return this.fb.group({
      billingBlock: [''],
      workingTimes: [''],
      accountGroup: [''],
      deletionFlag: [''],
      deliveryBlock: [''],
      salesOrganization: [''],
      distributionChannel: [''],
      division: [''],
      customerGroup: [''],
      modeOfTransport: [''],
      acctAssGrpCustomer: [''],
      deliveryPlant: [''],
      partialDeliveryAllowed: ['']
    })
  }
  addSec() {
    this.salesDetail.push(this.addSales())
  }

  deleteSalesrow(index: any) {
    this.salesDetail.removeAt(index);
  }

  //get single data

  async singleCustomerDetails() {
    try {
      const result: any = await this.customerSer.singleCustomerDetails(this.customerMasterId)
      if (result.status === '1') {
        console.log(result);
        this.create(result.data)
      }
    } catch (error) {
      console.error(error);

    }
  }

  async addAll() {
    try {
      this.isSubmitted = true
      console.log(this.general.value);
      if (this.general.invalid)
        return
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

      const result: any = await this.customerSer.updatedCustomerDetails(this.general.value)
      console.log(result);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/customer-list'])
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


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  // get country detail
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
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

  selectCountryName(event: any) {
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    this.general.controls.countryName.setValue(this.citiesDetails.countryName)

  }

  // Get All details for Currency code
  async getCurrencyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCurrencyDetails();
      if (result.status === '1') {
        this.currencyDetails = result.data;

      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
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

  // handleCurrency(event: any) {
  //   const findCurrencyCode = this.currencyDetails.find((el: any) => el._id === event.target.value);
  //   this.general.controls.currencyName.setValue(findCurrencyCode.code)
  // }

  //get Payment terms

  async getPaymentTerm() {
    try {
      const result: any = await this.paymentTermSer.getAllPaymentTerm()
      if (result.status === '1') {
        this.paymentTermDetail = result.data
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
  handlePaymentTerm(event: any) {
    const findPayment = this.paymentTermDetail.find((el: any) => el._id === event.target.value)
    this.general.controls.termsPayment.setValue(findPayment.paymentTerm)
  }

  // Get All details for company code
  async getCompanyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails();
      if (result.status === '1') {
        this.companyDetails = result.data
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
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
  handleCompany(event: any) {
    const findcompanyData = this.companyDetails.find((el: any) => el._id === event.target.value)
    this.general.controls.companycode.setValue(findcompanyData.companyCode)
  }

  //get billing block
  async getBillingBlock() {
    try {
      const result: any = await this.billingblockSer.getAllBillingBlockDetails()
      console.log(result.data);

      if (result.status === '1') {
        this.billingBlockDetail = result.data
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
  handleBilling(event: any) {
    const findbillingData = this.billingBlockDetail.find((el: any) => el._id === event.target.value)
    this.general.controls.billingBlock.setValue(findbillingData.billingBlock)
  }

  //get distribution channel

  async getDistributionDetail() {
    try {
      const result: any = await this.distributionSer.getAllDistibutionChannelDetails()
      if (result.status === '1') {
        this.distributionDetail = result.data
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
      const result: any = await this.salesOrgSer.getAllSalesOrgDetails()
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

  //get dividion
  async getDivisionDetail() {
    try {
      const result: any = await this.divisionSer.getAllDivionDetails()
      if (result.status === '1') {
        this.divisionDetail = result.data
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

  //get mode of transport detail

  async getModeOfTransport() {
    try {
      const result: any = await this.modeOfTransportSer.getAllModeOfTransportDetails()
      if (result.status === '1') {
        this.motDetails = result.data
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
  //get customer acct assi

  async getAcctGroupDetail() {
    try {
      const result: any = await this.acctAssignmentSer.getAllCustomerAccountDetails()
      if (result.status === '1') {
        this.acctAssignmentDetail = result.data
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

  //get plant detail

  async getPlantDetail() {
    try {
      const result: any = await this.plantDataSer.getAllPlantData()
      if (result.status === '1') {
        this.plantDetail = result.data
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

  //get delivery block

  async getDeliveryBlock() {
    try {
      const result: any = await this.customerSer.getDeliveryBlock()
      if (result.status === '1') {
        this.deliveryBlockDetail = result.data
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

  async getCustomergroup() {
    try {
      const result: any = await this.customerSer.getCustomerGroup()
      if (result.status === '1') {
        this.customerGroupDetail = result.data
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

  handleCurrency(event: any, index: any) {
    const findCurrency = this.currencyDetails.find((el: any) => el._id === event.target.value)
    console.log(findCurrency);
    // this.general.controls.currencyId.setValue(findCurrency._id)
    // this.general.get('plantData').controls.currencyName.setValue(findCurrency.code)
    const formArray = this.general.get('plantData') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;


    formGroup.patchValue({
      currencyName: findCurrency ? findCurrency.code : ''

    });
  }

  //get ReconcilationAccount 

  async getReconcilationAccountDetails() {
    try {
      const result: any = await this.vendorSer.getAllReconcilationAccountDetails()
      if (result.status === '1') {
        this.reconcilationAccountDetails = result.data
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

  // get Account Group detail
  async getAllAccountGroup() {
    try {
      const result: any = await this.companyCodeSer.getAllAccountGroup();
      if (result.status === '1') {
        this.accountGroupDetails = result.data;
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
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
  handleFinicial(event: any, index: any) {
    if (event.target.value) {
      this.companyDetails.map((el: any) => el.disable = false)
      this.general.value.plantData.map((el: any) => {
        this.companyDetails.map((ele: any) => {
          if (el.companyCode === ele._id) {
            ele.disable = true
          }
        })

      })
    }
  }

}