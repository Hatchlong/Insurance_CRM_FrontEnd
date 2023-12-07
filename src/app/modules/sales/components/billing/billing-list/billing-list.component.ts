import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent {

  
  constructor(
    private router:Router
  ){}
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }
}
