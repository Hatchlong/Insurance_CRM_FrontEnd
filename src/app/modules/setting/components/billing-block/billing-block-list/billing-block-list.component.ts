import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-block-list',
  templateUrl: './billing-block-list.component.html',
  styleUrls: ['./billing-block-list.component.css']
})
export class BillingBlockListComponent {

  
  constructor(
    private router:Router
  ){

  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }
}
