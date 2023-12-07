import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mode-of-transport-list',
  templateUrl: './mode-of-transport-list.component.html',
  styleUrls: ['./mode-of-transport-list.component.css']
})
export class ModeOfTransportListComponent {

  constructor(
    private router:Router
  ){

  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }
}
