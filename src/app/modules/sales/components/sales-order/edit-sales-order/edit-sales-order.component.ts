import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import { DistibutionChannelService } from 'src/app/modules/setting/Services/distibution-channel/distibution-channel.service';
import { DivionService } from 'src/app/modules/setting/Services/divion/divion.service';
import { OrderStatusService } from 'src/app/modules/setting/Services/order-status/order-status.service';
import { PaymentTermService } from 'src/app/modules/setting/Services/payment-term/payment-term.service';
import { SalesOrgService } from 'src/app/modules/setting/Services/sales-org/sales-org.service';
import { SalesOrderService } from '../../../services/sales-order/sales-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeOfTransportService } from 'src/app/modules/setting/Services/mode-of-transport/mode-of-transport.service';
import { BillingBlockService } from 'src/app/modules/setting/Services/billing-block/billing-block.service';
import { CustomerAccountAGService } from 'src/app/modules/setting/Services/customer-account-AG/customer-account-ag.service';
import { CustomerService } from 'src/app/modules/master/services/customer/customer.service';
import { ProductService } from 'src/app/modules/master/services/product/product.service';
import Swal from 'sweetalert2';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';


@Component({
  selector: 'app-edit-sales-order',
  templateUrl: './edit-sales-order.component.html',
  styleUrls: ['./edit-sales-order.component.css']
})
export class EditSalesOrderComponent {

  salesFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  salesData: any = []
  distributionDetail: any = []
  divisionDetail: any = []
  companyCodeDetails: any = []
  orderStatusDetail: any = []
  paymentTermDetail: any = []
  motDetails: any = []
  billingBlockDetail: any = []
  customerAccountAsstGroup: any = []
  customerMasterDetail: any = []
  productDeatail: any = []
  currencyDetails: any;
  salesOrderId: any = ''
  customerCurrency: any = []
  customerplant: any = []
  productPlant: any = []
  isShowDeliveryButton: any = false;
  idleState: any = 'Not Started';
  orderTypeDetails: any = [];
  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,

    private salesOrderSer: SalesOrderService,
    private SalesSer: SalesOrgService,
    private _snackBar: MatSnackBar,
    private distibutionSer: DistibutionChannelService,
    private divisionSer: DivionService,
    private companyCodeSer: CompanyCodeService,
    private orderStatusSer: OrderStatusService,
    private paymentTermSer: PaymentTermService,
    private modeOfTransportSer: ModeOfTransportService,
    private billinBlockSer: BillingBlockService,
    private customerAcctAG: CustomerAccountAGService,
    private customerSer: CustomerService,
    private productSer: ProductService,
    private router: Router,
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
    this.getCustomerMaster()
  }

  ngOnInit(): void {
    this.salesOrderId = this.activeRouter.snapshot.paramMap.get('id')
    this.createSalesFormFields()
    this.getSalesDetail()
    this.getDistributionDetail()
    this.getDivisionDetail()
    this.getCompanyCodeDetail()
    this.getOrderStatus()
    this.getOrderType()
    this.getPaymentTerm()
    this.getModeOfTransport()
    this.getBillingBlock()
    this.getCustomerAcctAG()
    this.getProductMasterDetail()
    this.getCurrencyDetails()
    this.singleSalesDetail()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createSalesFormFields(data?: any) {
    if (data) {
      console.log(this.customerCurrency, "currency")
      this.salesFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        orderTypeId: [data.orderTypeId, Validators.required],
        orderType: [data.orderType, Validators.required],
        saleOrgId: [data.saleOrgId, Validators.required],
        saleOrgName: [data.saleOrgName],
        distributionChannelsId: [data.distributionChannelsId, Validators.required],
        distributionChannelsName: [data.distributionChannelsName, Validators.required],
        divisionId: [data.divisionId, Validators.required],
        divisionName: [data.divisionName, Validators.required],
        customerId: [data.customerId, Validators.required],
        customerName: [data.customerName],
        customerAddress: [data.customerAddress, Validators.required],
        salesOrder: [data.salesOrder, Validators.required],
        customerPo: [data.customerPo, Validators.required],
        customerPoDate: [data.customerPoDate, Validators.required],
        requestedDeliveryDate: [data.requestedDeliveryDate, Validators.required],
        companyCurrency: [data.companyCurrency, Validators.required],
        transactionCurrency: [data.transactionCurrency, Validators.required],
        text: [data.text, Validators.required],

        exchangeRate: [data.exchangeRate, Validators.required],
        modeOfTransport: [data.modeOfTransport, Validators.required],
        totalNetWeight: [data.totalNetWeight, Validators.required],
        totalGrossWeight: [data.totalGrossWeight, Validators.required],
        totalVolume: [data.totalVolume, Validators.required],
        paymentTerms: [data.paymentTerms, Validators.required],
        billingBlockId: [data.billingBlockId, Validators.required],
        billingBlockName: [data.billingBlockName],
        companyCodeId: [data.companyCodeId, Validators.required],
        companyCodeName: [data.companyCodeName],
        customerAcctAss: [data.customerAcctAss, Validators.required],
        netPrice: [data.netPrice, Validators.required],
        netTax: [data.netTax, Validators.required],
        netDiscount: [data.netDiscount, Validators.required],
        netFreight: [data.netFreight, Validators.required],
        orderStatusId: [data.orderStatusId, Validators.required],
        orderStatusName: [data.orderStatusName],
        otherCharges: [data.otherCharges, Validators.required],

        itemList: this.fb.array(data.itemList.map((el: any) => this.getSalesFields(el)))

      })
      const selectedCustomer: any = this.customerMasterDetail.find((el: any) => el.customerId === data.customerId);
      console.log(selectedCustomer, 'k')
      this.customerCurrency = selectedCustomer.plantData

      return
    }
    this.salesFormGroup = this.fb.group({
      _id: ['', Validators.required],
      orderTypeId: ['', Validators.required],
      orderType: ['', Validators.required],
      saleOrgId: ['', Validators.required],
      saleOrgName: [''],
      distributionChannelsId: ['', Validators.required],
      distributionChannelsName: ['', Validators.required],
      divisionId: ['', Validators.required],
      divisionName: ['', Validators.required],
      customerId: ['', Validators.required],
      customerName: [''],
      customerAddress: ['', Validators.required],
      salesOrder: ['', Validators.required],
      customerPo: ['', Validators.required],
      customerPoDate: ['', Validators.required],
      requestedDeliveryDate: ['', Validators.required],
      companyCurrency: ['', Validators.required],
      transactionCurrency: ['', Validators.required],
      text: ['', Validators.required],

      exchangeRate: ['', Validators.required],
      modeOfTransport: ['', Validators.required],
      totalNetWeight: ['', Validators.required],
      totalGrossWeight: ['', Validators.required],
      totalVolume: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      billingBlockId: ['', Validators.required],
      billingBlockName: [''],
      companyCodeId: ['', Validators.required],
      companyCodeName: [''],
      customerAcctAss: ['', Validators.required],
      netPrice: ['', Validators.required],
      netTax: ['', Validators.required],
      netDiscount: ['', Validators.required],
      netFreight: ['', Validators.required],
      orderStatusId: ['', Validators.required],
      orderStatusName: [''],
      otherCharges: ['', Validators.required],

      itemList: this.fb.array([this.getSalesFields()])


    })
  }

  getSalesFields(data?: any): FormGroup {
    if (data) {
      this.productDeatail.map((el: any) => {
        if (el.materialId === data.materialId) {
          el.disable = true
        }
      })
      return this.fb.group({
        materialId: [data.materialId],
        materialDescription: [data.materialDescription],
        ordQty: [data.ordQty],
        uom: [data.uom],
        plantId: [data.plantId],
        plantName: [data.plantName],
        storageLocationId: [data.storageLocationId],
        storageLocationName: [data.storageLocationName],
        batchSerial: [data.batchSerial],
        priceAmount: [data.priceAmount],
        priceUnitPrice: [data.priceUnitPrice],
        priceUnit: [data.priceUnit],
        priDate: [data.priDate],
        vol: [data.vol],
        priceUOM: [data.priceUOM],
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
        priceDate: [data.priceDate],
        netWeight: [data.netWeight],
        grossWeight: [data.grossWeight],
        volumn: [data.volumn],
        orderStatusId: [data.orderStatusId],
        orderStatusName: [data.orderStatusName],
        deliveryCheck: [data.deliveryCheck],
        openQty:[data.openQty]
      })

    }
    return this.fb.group({
      materialId: [''],
      materialDescription: [''],
      ordQty: [''],
      uom: [''],
      plantId: [''],
      plantName: [''],
      storageLocationId: [''],
      storageLocationName: [''],
      batchSerial: [''],
      priceAmount: [''],
      priceUnitPrice: [''],
      priceUnit: [''],
      priDate: [''],
      vol: [''],
      priceUOM: [''],
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
      priceDate: [''],
      netWeight: [''],
      grossWeight: [''],
      volumn: [''],
      orderStatusId: [''],
      orderStatusName: [''],
      deliveryCheck: [''],
      openQty:['']
    })

  }


  get salesOrderArray() {
    return this.salesFormGroup.get('itemList') as FormArray
  }

  addSalesItem() {
    this.salesOrderArray.push(this.getSalesFields());
    const formArray = this.salesFormGroup.get('itemList') as FormArray;

    this.salesFormGroup.value.itemList.map((el: any, i: any) => {
      const formGroup = formArray.at(i) as FormGroup;

      formGroup.patchValue({
        companyCurrency: this.salesFormGroup.value.companyCurrency ? this.salesFormGroup.value.companyCurrency : '',
        transactionCurrency: this.salesFormGroup.value.transactionCurrency ? this.salesFormGroup.value.transactionCurrency : '',
        orderStatusId: '65a6853968f1c2318e6aa61c',
        orderStatusName: 'NON DELIVERED',
      });
    })
  }

  deleteSalesItem(index: any, orderStatus: any) {
    if (orderStatus === 'FULLY DELIVERED') {
      return
    }
    this.salesOrderArray.removeAt(index)
  }

  async singleSalesDetail() {
    try {
      const result: any = await this.salesOrderSer.singleSalesOrderDetails(this.salesOrderId)
      if (result.status === '1') {
        console.log(result);
        this.createSalesFormFields(result.data)
      }
    } catch (error) {
      console.error(error);

    }
  }


  async submitData() {
    try {
      this.isSubmitted = true;
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
      this.salesFormGroup.value.createdOn = fullDate
      this.salesFormGroup.value.createdBy = userName
      this.salesFormGroup.value.changedOn = fullDate
      this.salesFormGroup.value.changedBy = userName
      console.log(this.salesFormGroup.value)
      if (this.salesFormGroup.invalid)
        return
      const result: any = await this.salesOrderSer.updatedSalesOrderDetails(this.salesFormGroup.value)
      console.log(result);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/sales/sales-order-list'])
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
  handleSales(event: any) {
    const findSales = this.salesData.find((el: any) => el._id === event.target.value)
    this.salesFormGroup.controls.saleOrgName.setValue(findSales.salesOrg)
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
    this.salesFormGroup.controls.distributionChannelsName.setValue(findDistribution.distributionChannel)
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
    this.salesFormGroup.controls.divisionName.setValue(findDivision.divion)
  }

  async getCompanyCodeDetail() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails()
      console.log(result)
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
  handleCountry(event: any) {
    const findCompany = this.companyCodeDetails.find((el: any) => el._id === event.target.value)
    this.salesFormGroup.controls.companyCodeName.setValue(findCompany.companyCode)
    this.salesFormGroup.controls.companyCurrency.setValue(findCompany.currencyName)
    const formArray = this.salesFormGroup.get('itemList') as FormArray;

    this.salesFormGroup.value.itemList.map((el: any, i: any) => {
      const formGroup = formArray.at(i) as FormGroup;

      formGroup.patchValue({
        companyCurrency: findCompany.currencyName ? findCompany.currencyName : '',
      });
    })
  }

  //get order status 
  async getOrderStatus() {
    try {
      const result: any = await this.orderStatusSer.getAllOrderStatusDetails()
      if (result.status === '1') {
        this.orderStatusDetail = result.data
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

  handleOrder(event: any) {
    const findOrder = this.orderStatusDetail.find((el: any) => el._id === event.target.value)
    this.salesFormGroup.controls.orderStatusName.setValue(findOrder.orderStatus)
  }
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

  //get billing block
  async getBillingBlock() {
    try {
      const result: any = await this.billinBlockSer.getAllBillingBlockDetails()
      if (result.status === '1') {
        this.billingBlockDetail = result.data
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

  handleBillingBlock(event: any) {
    const findBilling = this.billingBlockDetail.find((el: any) => el._id === event.target.value)
    this.salesFormGroup.controls.billingBlockName.setValue(findBilling.billingBlock)
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

  //get product detail

  async getProductMasterDetail() {
    try {
      const result: any = await this.productSer.getAllProductDetails()
      if (result.status === '1') {
        this.productDeatail = result.data;
        this.productDeatail.map((el: any) => {
          el.disable = false
        })
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


  //get customer master
  async getCustomerMaster() {
    try {
      const result: any = await this.customerSer.getAllCustomerDetails();
      console.log(result)
      if (result.status === '1') {
        this.customerMasterDetail = result.data
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

  handleOrderType(event: any) {
    const findSales = this.orderTypeDetails.find((el: any) => el._id === event.target.value)
    this.salesFormGroup.controls.orderType.setValue(findSales.description)
  }

  handleCustomer(event: any) {
    const selectedCustomer = this.customerMasterDetail.find((el: any) => el.customerId === event.target.value);
    const customerCurrency = selectedCustomer.plantData.find((el: any) => el.companyCode === this.salesFormGroup.value.companyCodeId)
    console.log(this.customerCurrency);
    this.salesFormGroup.controls.transactionCurrency.setValue(customerCurrency.currencyName)
    const formArray = this.salesFormGroup.get('itemList') as FormArray;

    this.salesFormGroup.value.itemList.map((el: any, i: any) => {
      const formGroup = formArray.at(i) as FormGroup;

      formGroup.patchValue({
        transactionCurrency: customerCurrency.currencyName ? customerCurrency.currencyName : '',
      });
    })

    this.salesFormGroup.patchValue({
      customerAddress: selectedCustomer ? selectedCustomer.address : ''
    });

  }
  handleMaterial(event: any, index: any) {
    const selectMaterial = this.productDeatail.find((el: any) => el.materialId === event.target.value)
    console.log(selectMaterial);
    this.productDeatail.map((el: any) => {
      if (el.materialId === event.target.value) {
        el.disable = true
      }
    })
    this.productPlant = selectMaterial ? selectMaterial.plantData : [];

    this.customerplant = selectMaterial ? selectMaterial.salesData : [];

    const formArray = this.salesFormGroup.get('itemList') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;

    formGroup.patchValue({
      materialDescription: selectMaterial ? selectMaterial.materialDescription : '',
    });

  }

  handleCurrency(event: any) {
    const selectCurrency = this.companyCodeDetails.find((el: any) => el.currencyId === event.target.value)
    console.log(selectCurrency, 'currency ');
  }

  handlePlant(event: any, materialId: any, index: any) {
    const selectMaterial = this.productDeatail.find((el: any) => el.materialId === materialId)
    console.log(selectMaterial);

    const formArray = this.salesFormGroup.get('itemList') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    const selectPlant = selectMaterial.salesData.find((el: any) => el.deliveringPlantId === event.target.value);
    console.log(selectPlant, 'selectPlant')
    formGroup.patchValue({
      plantName: selectPlant ? selectPlant.deliveringPlantName : '',
    });

  }

  handleStorage(event: any, materialId: any, index: any) {
    const selectMaterial = this.productDeatail.find((el: any) => el.materialId === materialId)
    console.log(selectMaterial);

    const formArray = this.salesFormGroup.get('itemList') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    const selectPlant = selectMaterial.plantData.find((el: any) => el.storageLocationId === event.target.value);
    console.log(selectPlant, 'selectPlant')
    formGroup.patchValue({
      storageLocationName: selectPlant ? selectPlant.storageLocationName : '',
    });
    console.log(formGroup.value.storageLocationName)

  }


  handleOrderStatus(event: any, index: any) {
    const findOrder = this.orderStatusDetail.find((el: any) => el._id === event.target.value)
    const formArray = this.salesFormGroup.get('itemList') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;

    formGroup.patchValue({
      orderStatusName: findOrder ? findOrder.orderStatus : '',
    });
  }

  handleDeliveryDetails(event: any, index: any, orderStatus: any) {
    if (orderStatus === 'FULLY DELIVERED') {
      return
    }
    const formArray = this.salesFormGroup.get('itemList') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;

    formGroup.patchValue({
      deliveryCheck: !formGroup.value.deliveryCheck,
    });
    const findDetials = this.salesFormGroup.value.itemList.find((el: any) => el.deliveryCheck === true)
    if (findDetials) {
      this.isShowDeliveryButton = true;
    } else {
      this.isShowDeliveryButton = false
    }
  }


  handleDeliveryMessage() {
    var notMatchingPlant = false;
    const filterDeliveryDetails = this.salesFormGroup.value.itemList.filter((el: any) => el.deliveryCheck === true);
    filterDeliveryDetails.map((el: any) => {
      if (el.plantName !== filterDeliveryDetails[0].plantName) {
        notMatchingPlant = true;
      }
    })
    if (filterDeliveryDetails.length > 1) {
      if (notMatchingPlant) {
        Swal.fire({
          icon: "info",
          title: "info...",
          text: "Plant on selected items are different hence delivery cannot be processed",
        });
        return
      }
    }
    this.salesFormGroup.value.itemList = filterDeliveryDetails

    this.salesOrderSer.passSalesDetails.next(this.salesFormGroup.value);
    console.log(this.salesFormGroup.value)
    this.router.navigate(['/sales/add-delivery-sales'])
  }

  //get customer acct ag
  async getOrderType() {
    try {
      const result: any = await this.salesOrderSer.getOrderType()
      if (result.status === '1') {
        this.orderTypeDetails = result.data
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


  updateValue(event:any, index:any){
    if(event.target.value){
      const formArray = this.salesFormGroup.get('itemList') as FormArray;
      const formGroup = formArray.at(index) as FormGroup;
      formGroup.patchValue({
        openQty: +event.target.value
      })
    }
  }

}
