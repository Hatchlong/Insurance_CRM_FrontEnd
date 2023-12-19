import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesOrgService } from '../../../Services/sales-org/sales-org.service';

@Component({
  selector: 'app-sales-org-list',
  templateUrl: './sales-org-list.component.html',
  styleUrls: ['./sales-org-list.component.css']
})
export class SalesOrgListComponent implements OnInit {

  salesDeatils: any = []
  selectAll:any=false


  constructor(
    private router: Router,
    private salesOrgSer: SalesOrgService
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllDeatils()
  }

  async getAllDeatils() {
    try {
      const result: any = await this.salesOrgSer.getAllSalesOrgDetails();
      console.log(result)
      if (result.status === '1') {
        result.data.map((el:any)=>{
          el.check=false
        })
        this.salesDeatils = result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
   
  selectdata(event: any) {
    console.log(event.target.checked);
    this.salesDeatils.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.salesDeatils[index].check = event.target.checked
    const findSelect = this.salesDeatils.find((el: any) => el.check === false)
    console.log(findSelect);

    if (findSelect) {

      this.selectAll = false

    }
    else {
      this.selectAll = true
    }
  }



}

