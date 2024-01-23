import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent {

  isShowPadding:any=false
  selectAll: any=false;
  
  idleState: any = 'Not Started';

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  constructor(
    private router:Router
    ){}

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    // this.vendorDetails.map((el: any) => {
    //   el.check = event.target.checked
    // })


  }
  particularcheck(event: any, index: any) {
    // this.vendorDetails[index].check = event.target.checked
    // const findSelect = this.vendorDetails.find((el: any) => el.check === false)

    // if (findSelect) {
    //   this.selectAll = false
    // }
    // else {
    //   this.selectAll = true
    // }
  }


}
