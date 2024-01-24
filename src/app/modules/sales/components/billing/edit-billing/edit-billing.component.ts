import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { BillingService } from '../../../services/billing/billing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../../services/sales-order/sales-order.service';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import { CustomerAccountAGService } from 'src/app/modules/setting/Services/customer-account-AG/customer-account-ag.service';
import { PaymentTermService } from 'src/app/modules/setting/Services/payment-term/payment-term.service';
import { IncTermService } from 'src/app/modules/setting/Services/inc-term/inc-term.service';
import { DistibutionChannelService } from 'src/app/modules/setting/Services/distibution-channel/distibution-channel.service';
import { DivionService } from 'src/app/modules/setting/Services/divion/divion.service';
import { SalesOrgService } from 'src/app/modules/setting/Services/sales-org/sales-org.service';
import { ModeOfTransportService } from 'src/app/modules/setting/Services/mode-of-transport/mode-of-transport.service';
import { ProductService } from 'src/app/modules/master/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-billing',
  templateUrl: './edit-billing.component.html',
  styleUrls: ['./edit-billing.component.css']
})
export class EditBillingComponent implements OnInit {
  isSubmitted: any = false;
  isShowPadding: any = false;
  billingFormGroup: any = FormGroup
  countryLists: any = ''
  idleState: any = 'Not Started';
  billingTypeList: any = [];
  currencyDetails: any = [];
  companyCodeDetails: any = [];
  customerAccountAsstGroup: any = [];
  paymentTermDetail: any = [];
  incrementTermsDetails: any = [];
  divisionDetail: any = [];
  distributionDetail: any = [];
  motDetails: any = [];
  salesData: any = [];
  uomDetail: any = [];
  billingId:any = ''
  constructor(
    private fb: FormBuilder,
    private idle: Idle,
    private cd: ChangeDetectorRef,
    private billingSer: BillingService,
    private companyCodeSer: CompanyCodeService,
    private _snackBar: MatSnackBar,
    private customerAcctAG: CustomerAccountAGService,
    private paymentTermSer: PaymentTermService,
    private incrementTermSer: IncTermService,
    private distibutionSer: DistibutionChannelService,
    private divisionSer: DivionService,
    private SalesSer: SalesOrgService,
    private modeOfTransportSer: ModeOfTransportService,
    private productSer: ProductService,
    private router:Router,
    private activeRouter: ActivatedRoute
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
    this.billingId = this.activeRouter.snapshot.paramMap.get('id')
    this.createBillingFormFields();
    this.setStates();
    this.getBillingType();
    this.getCurrencyDetails();
    this.getCompanyCodeDetail();
    this.getCustomerAcctAG();
    this.getPaymentTerm();
    this.getIncrementTermsDetails();
    this.getDivisionDetail();
    this.getDistributionDetail();
    this.getSalesDetail();
    this.getModeOfTransport();
    this.getAllUomDetail();
    this.getSingleBillingDetails()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createBillingFormFields(data?:any) {
    if(data){
      this.billingFormGroup = this.fb.group({
        _id:[data._id, [Validators.required]],
        billingTypeId: [data.billingTypeId, Validators.required],
        billingType: [data.billingType, Validators.required],
        billingDate: [data.billingDate, Validators.required],
        referenceDocument: [data.referenceDocument, Validators.required],
        customerId: [data.customerId, Validators.required],
        customerName: [data.customerName, Validators.required],
        netValue: [data.netValue, Validators.required],
        taxAmount: [data.taxAmount, Validators.required],
        currencyId: [data.currencyId, Validators.required],
        currencyName: [data.currencyName, Validators.required],
        exchangeRate: [data.exchangeRate, Validators.required],
        companyCodeId: [data.companyCodeId, Validators.required],
        companyCode: [data.companyCode, Validators.required],
        customerAsstAccountId: [data.customerAsstAccountId, Validators.required],
        customerAsstAccountName: [data.customerAsstAccountName, Validators.required],
        createdOn: [data.createdOn],
        createdBy: [data.createdBy],
        postingStatus: [data.postingStatus, Validators.required],
        changedBy: [data.changedBy],
        changedOn: [data.changedOn],
        paymentTermsId: [data.paymentTermsId, Validators.required],
        paymentTerms: [data.paymentTerms, Validators.required],
        incoTermsId: [data.incoTermsId, Validators.required],
        incoTerms: [data.incoTermsId, Validators.required],
        salesOrgId: [data.salesOrgId, Validators.required],
        salesOrgName: [data.salesOrgName, Validators.required],
        distributionChannelId: [data.distributionChannelId, Validators.required],
        distributionChannelName: [data.distributionChannelName, Validators.required],
        divisionId: [data.divisionId, Validators.required],
        divisionName: [data.divisionName, Validators.required],
        modeOfTarnsportId: [data.modeOfTarnsportId, Validators.required],
        modeOfTarnsportName: [data.modeOfTarnsportName, Validators.required],
        netTax: [data.netTax, Validators.required],
        netDiscount: [data.netDiscount, Validators.required],
        netFreight: [data.netFreight, Validators.required],
        otherCharges: [data.otherCharges, Validators.required],
        itemList: this.fb.array(data.itemList.map((el: any) => this.getFinancialFields(el)))

      })
      return
    }
    this.billingFormGroup = this.fb.group({
      billingTypeId: ['', Validators.required],
      billingType: ['', Validators.required],
      billingDate: ['', Validators.required],
      referenceDocument: ['', Validators.required],
      customerId: ['', Validators.required],
      customerName: ['222', Validators.required],
      netValue: ['', Validators.required],
      taxAmount: ['', Validators.required],
      currencyId: ['', Validators.required],
      currencyName: ['', Validators.required],
      exchangeRate: ['', Validators.required],
      companyCodeId: ['', Validators.required],
      companyCode: ['', Validators.required],
      customerAsstAccountId: ['', Validators.required],
      customerAsstAccountName: ['', Validators.required],
      createdOn: [''],
      createdBy: [''],
      postingStatus: ['', Validators.required],
      changedBy: [''],
      changedOn: [''],
      paymentTermsId: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      incoTermsId: ['', Validators.required],
      incoTerms: ['', Validators.required],
      salesOrgId: ['', Validators.required],
      salesOrgName: ['', Validators.required],
      distributionChannelId: ['', Validators.required],
      distributionChannelName: ['', Validators.required],
      divisionId: ['', Validators.required],
      divisionName: ['', Validators.required],
      modeOfTarnsportId: ['', Validators.required],
      modeOfTarnsportName: ['', Validators.required],
      netTax: ['', Validators.required],
      netDiscount: ['', Validators.required],
      netFreight: ['', Validators.required],
      otherCharges: ['', Validators.required],
      itemList: this.fb.array([this.getFinancialFields()])
    })
  }


  getFinancialFields(data?:any): FormGroup {
    if(data){
      return this.fb.group({
        billedQTY: [data.billedQTY],
        uom: [data.uom],
        grossWeight: [data.grossWeight],
        netWeight: [data.netWeight],
        grossUOM: [data.grossUOM],
        salesOrder: [data.salesOrder],
        salesOrderItem: [data.salesOrderItem],
        referenceDocument: [data.referenceDocument],
        referenceDocumentItem: [data.referenceDocumentItem],
        priceDate: [data.priceDate],
        serviceRenderedDate: [data.serviceRenderedDate],
        priceAmount: [data.priceAmount],
        perUnitPrice: [data.perUnitPrice],
        pricingUnit: [data.pricingUnit],
        pricingUOM: [data.pricingUOM],
        tax: [data.tax],
        perUnitTax: [data.perUnitTax],
        discount: [data.discount],
        perUnitDiscount: [data.perUnitDiscount],
        freight: [data.freight],
        perUnitFreight: [data.perUnitFreight],
        otherCharges: [data.otherCharges],
        companyCurrency: [data.companyCurrency],
        transactionCurrency: [data.transactionCurrency],
        exchangeRate: [data.exchangeRate],
        hsnCode: [data.hsnCode],
        countryOrigin: [data.countryOrigin],
        destinationCountry: [data.destinationCountry],
        poNumber: [data.poNumber],
        poDate: [data.poDate]
      }) 
    }
    return this.fb.group({
      billedQTY: [''],
      uom: [''],
      grossWeight: [''],
      netWeight: [''],
      grossUOM: [''],
      salesOrder: [''],
      salesOrderItem: [''],
      referenceDocument: [''],
      referenceDocumentItem: [''],
      priceDate: [''],
      serviceRenderedDate: [''],
      priceAmount: [''],
      perUnitPrice: [''],
      pricingUnit: [''],
      pricingUOM: [''],
      tax: [''],
      perUnitTax: [''],
      discount: [''],
      perUnitDiscount: [''],
      freight: [''],
      perUnitFreight: [''],
      otherCharges: [''],
      companyCurrency: [''],
      transactionCurrency: [''],
      exchangeRate: [''],
      hsnCode: [''],
      countryOrigin: [''],
      destinationCountry: [''],
      poNumber: [''],
      poDate: ['']
    })
  }

  get financialListArray() {
    return this.billingFormGroup.get('itemList') as FormArray
  }

  addFinancial() {
    this.financialListArray.push(this.getFinancialFields());
    const formArray = this.billingFormGroup.get('itemList') as FormArray;

    this.billingFormGroup.value.itemList.map((el: any, i: any) => {
      const formGroup = formArray.at(i) as FormGroup;
      formGroup.patchValue({
        companyCurrency: this.billingFormGroup.value.itemList[0].companyCurrency,
      });
    })
  }

  deleteFinancial(index: any) {
    this.financialListArray.removeAt(index)
  }

  async updateBillingDetails() {
    try {
      this.isSubmitted = true;
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
      const userName: any = localStorage.getItem('userName')
      this.billingFormGroup.value.changedOn = fullDate
      this.billingFormGroup.value.changedBy = userName;
      console.log(this.billingFormGroup.value, this.billingFormGroup.invalid)
      if (this.billingFormGroup.invalid)
        return
      const result: any = await this.billingSer.updatedbillingDetails(this.billingFormGroup.value)
      console.log(result);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/sales/billing-list'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }

    } catch (error: any) {
      console.error(error)
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


  async getBillingType() {
    try {
      const result: any = await this.billingSer.getBillingTypeDetails();
      if (result.status === '1') {
        this.billingTypeList = result.data
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

  handleBillingType(event: any) {
    if (event.target.value) {
      const findBillingType = this.billingTypeList.find((el: any) => el._id === event.target.value);
      this.billingFormGroup.controls.billingType.setValue(findBillingType.code)
    }
  }

  // get currency details
  async getCurrencyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCurrencyDetails();
      if (result.status === '1') {
        this.currencyDetails = result.data
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

  // Handle Currency Details and Setvalue for CustomerName
  handleCurrency(event: any) {
    if (event.target.value) {
      const currencyDetails = this.currencyDetails.find((el: any) => el._id === event.target.value);
      this.billingFormGroup.controls.currencyName.setValue(currencyDetails.code)
    }
  }


  async getCompanyCodeDetail() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails()
      console.log(result, 'company data')
      if (result.status === '1') {
        this.companyCodeDetails = result.data
      }
      else {
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

  // Handle Company Code Details and Setvalue for Company Code Name
  handleCompanyCode(event: any) {
    if (event.target.value) {
      const findCompany = this.companyCodeDetails.find((el: any) => el._id === event.target.value)
      this.billingFormGroup.controls.companyCode.setValue(findCompany.companyCode);
      const formArray = this.billingFormGroup.get('itemList') as FormArray;

      this.billingFormGroup.value.itemList.map((el: any, i: any) => {
        const formGroup = formArray.at(i) as FormGroup;

        formGroup.patchValue({
          companyCurrency: findCompany.currencyName ? findCompany.currencyName : '',
        });
      })
    }
  }

  //get customer acct ag
  async getCustomerAcctAG() {
    try {
      const result: any = await this.customerAcctAG.getAllCustomerAccountDetails()
      if (result.status === '1') {
        this.customerAccountAsstGroup = result.data
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


  handleCustomerAcctAssign(event: any) {
    if (event.target.value) {
      const findCustomerAcctAssign = this.customerAccountAsstGroup.find((el: any) => el._id === event.target.value)
      this.billingFormGroup.controls.customerAsstAccountName.setValue(findCustomerAcctAssign.customerAccountAG)
    }
  }

  // Get Payment Details
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

  handlePaymentTerms(event: any) {
    if (event.target.value) {
      const findPaymentTerms = this.paymentTermDetail.find((el: any) => el._id === event.target.value)
      this.billingFormGroup.controls.paymentTerms.setValue(findPaymentTerms.paymentTerm)
    }
  }

  // Get Payment Details
  async getIncrementTermsDetails() {
    try {
      const result: any = await this.incrementTermSer.getAllIncTermsDetails()
      if (result.status === '1') {
        this.incrementTermsDetails = result.data
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

  handleIncrementTerms(event: any) {
    if (event.target.value) {
      const findIncrementTerms = this.incrementTermsDetails.find((el: any) => el.inc_terms_code === +event.target.value)
      this.billingFormGroup.controls.incoTerms.setValue(findIncrementTerms.description)
    }
  }

  //get distribution channel

  async getDistributionDetail() {
    try {
      const result: any = await this.distibutionSer.getAllDistibutionChannelDetails()
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

  handleDistribution(event: any) {
    const findDistribution = this.distributionDetail.find((el: any) => el._id === event.target.value)
    this.billingFormGroup.controls.distributionChannelName.setValue(findDistribution.distributionChannel)
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

  handleDivision(event: any) {
    const findDivision = this.divisionDetail.find((el: any) => el._id === event.target.value)
    this.billingFormGroup.controls.divisionName.setValue(findDivision.divion)
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

  handlemodeofTransport(event: any) {
    if (event.target.value) {
      const findMOD = this.motDetails.find((el: any) => el._id === event.target.value)
      this.billingFormGroup.controls.modeOfTarnsportName.setValue(findMOD.modeOfTransport)
    }
  }

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
  handleSales(event: any) {
    if (event.target.value) {
      const findSales = this.salesData.find((el: any) => el._id === event.target.value)
      this.billingFormGroup.controls.salesOrgName.setValue(findSales.salesOrg)
    }
  }

  //get uom detail
  async getAllUomDetail() {
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


  // Get Single Details for Billing
  async getSingleBillingDetails(){
    try {
      const result: any = await this.billingSer.singlebillingDetails(this.billingId)
      if (result.status === '1') {
       this.createBillingFormFields(result.data)
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
