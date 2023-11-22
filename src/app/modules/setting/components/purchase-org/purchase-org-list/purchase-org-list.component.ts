import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-org-list',
  templateUrl: './purchase-org-list.component.html',
  styleUrls: ['./purchase-org-list.component.css']
})
export class PurchaseOrgListComponent {
  constructor(
    private router:Router
  ){}
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }
  checks=false;
  selectAll(e:any){
    if(e.target.checked==true){
      this.checks=true;
    }else{
      this.checks=false;
    }
  }
}
