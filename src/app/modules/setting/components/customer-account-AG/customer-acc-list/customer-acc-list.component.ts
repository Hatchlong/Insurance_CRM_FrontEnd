import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-acc-list',
  templateUrl: './customer-acc-list.component.html',
  styleUrls: ['./customer-acc-list.component.css']
})
export class CustomerAccListComponent {

  
  constructor(
    private router:Router
  ){

  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }
}
