import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-divion-list',
  templateUrl: './divion-list.component.html',
  styleUrls: ['./divion-list.component.css']
})
export class DivionListComponent {

  constructor(
    private router:Router
  ){

  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }
}
