import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-org-list',
  templateUrl: './sales-org-list.component.html',
  styleUrls: ['./sales-org-list.component.css']
})
export class SalesOrgListComponent {

  constructor(
    private router:Router
  ){}
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }

}
