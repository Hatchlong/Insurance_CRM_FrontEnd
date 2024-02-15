import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  isShowPadding: any = false
  
  constructor(private router:Router){}
    handleSideBar(event: any) {
      this.isShowPadding = event
    }
    nextPage(url: any) {
      this.router.navigate([`${url}`])
    }
  
}
