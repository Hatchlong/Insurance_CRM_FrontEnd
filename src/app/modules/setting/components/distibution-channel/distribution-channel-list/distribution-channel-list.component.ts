import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distribution-channel-list',
  templateUrl: './distribution-channel-list.component.html',
  styleUrls: ['./distribution-channel-list.component.css']
})
export class DistributionChannelListComponent {

  constructor(
    private router:Router
  ){

  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }
}
