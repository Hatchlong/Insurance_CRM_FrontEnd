import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-po-type-list',
  templateUrl: './po-type-list.component.html',
  styleUrls: ['./po-type-list.component.css']
})
export class PoTypeListComponent {
  constructor(
    private router:Router
  ){}
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }

}
