import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-purchase-org',
  templateUrl: './edit-purchase-org.component.html',
  styleUrls: ['./edit-purchase-org.component.css']
}) 
export class EditPurchaseOrgComponent {
  purchOrg: any = FormGroup;
  companyDetails: any = [];
  purchaseOrgId: any = ''

  constructor(private fb: FormBuilder,
    private companySer: CompanyCodeService,
    private purchaseOrgSer: PurchaseOrgService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.purchaseOrgId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.purchaseOrgId)
    this.getSinglePurchaseOrgDetails()
    this.getCompanyDetails()
    this.purchOrgData()
  }

  purchOrgData() {
    this.purchOrg = this.fb.group({
      _id: ['', Validators.required],
      purchase_org: ['', Validators.required],
      purchase_org_Description: ['', Validators.required],
      companycode: ['', Validators.required]
    });
  }


  async getSinglePurchaseOrgDetails() {
    try {
      const result: any = await this.purchaseOrgSer.singlePurchaseOrg(this.purchaseOrgId);
      if (result.status === '1') {
        this.purchOrg.patchValue(result.data);
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Create the purchase org Details
  async submitData() {
    try {
      if (this.purchOrg.invalid)
        return alert('Please fill all the fields');
      const result: any = await this.purchaseOrgSer.updatePurchaseOrg(this.purchOrg.value);
      if (result.status === '1') {
        alert(result.message);
        this.router.navigate(['/settings/purchase-org-list']);
        return;
      }
      if (result.status === '0')
        return alert(result.message);
    } catch (error) {
      console.error(error)
    }
  }


  // Get All details for company code
  async getCompanyDetails() {
    try {
      const result: any = await this.companySer.getAllCompanyCodeDetails();
      if (result.status === '1') {
        this.companyDetails = result.data 
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  } 
}
