import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';

@Component({
  selector: 'app-purchase-org-list',
  templateUrl: './purchase-org-list.component.html',
  styleUrls: ['./purchase-org-list.component.css']
})
export class PurchaseOrgListComponent implements OnInit {
  purchaseOrgDetails:any= []
  constructor(
    private router: Router,
    private purchaseSer: PurchaseOrgService
  ) { }

  ngOnInit(): void {
    this.getAllPurchaseOrgDetails()
  }


  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  checks = false;
  selectAll(e: any) {
    if (e.target.checked == true) {
      this.checks = true;
    } else {
      this.checks = false;
    }
  }


  async getAllPurchaseOrgDetails(){
    try {
      const result:any = await this.purchaseSer.getAllPurchaseOrg();
      console.log(result)
      if(result.status === '1'){
        this.purchaseOrgDetails = result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }


 
}
