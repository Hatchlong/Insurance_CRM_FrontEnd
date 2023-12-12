import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-purchase-org',
  templateUrl: './add-purchase-org.component.html',
  styleUrls: ['./add-purchase-org.component.css']
})
export class AddPurchaseOrgComponent implements OnInit {
  purchOrg: any = FormGroup;
  companyDetails: any = []
  isSubmitted:any=false 

  constructor(private fb: FormBuilder,
    private companySer: CompanyCodeService,
    private purchaseOrgSer: PurchaseOrgService,
    private router: Router
  ) { }  

  ngOnInit(): void {
    this.getCompanyDetails()
    this.purchOrgData()
  }

  purchOrgData() {
    this.purchOrg = this.fb.group({
      purchase_org: ['', Validators.required],
      purchase_org_Description: ['', Validators.required],
      companycode: ['', Validators.required]
    });
    console.warn(this.purchOrg.value)
  }

  // Create the purchase org Details
  async submitData() {
    try {
      this.isSubmitted=true
      if (this.purchOrg.invalid) 
        return 
      const result: any = await this.purchaseOrgSer.createPurchaseOrgDetails(this.purchOrg.value);
      console.log(result)
      if (result.status === '1') {
        // alert(result.message);
        Swal.fire({
          title: 'success',
          text: 'Purchase Org Processed Successfully',
          icon: 'success',
          showCancelButton: true
        })
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
        // alert('API failed')
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      // alert('API failed')
      Swal.fire({
        title: 'warning',
        text: 'API Failed',
        icon: 'warning',
        showCancelButton: true
      })
    }
  }
}
