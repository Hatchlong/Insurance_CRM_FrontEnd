import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';

@Component({
  selector: 'app-company-code-list',
  templateUrl: './company-code-list.component.html',
  styleUrls: ['./company-code-list.component.css']
})
export class CompanyCodeListComponent {

  companyCodeDetails: any = []
  selectAll: any = false


  constructor(
    private router: Router,
    private companyCodeSer: CompanyCodeService
  ) { }

  ngOnInit(): void {
    this.getAllCompanyCodeDetails()
  }

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  selectdata(event: any) {
    console.log(event.target.checked);
    this.companyCodeDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.companyCodeDetails[index].check = event.target.checked
    const findSelect = this.companyCodeDetails.find((el: any) => el.check === false)
    console.log(findSelect);

    if (findSelect) {

      this.selectAll = false

    }
    else {
      this.selectAll = true
    }
  }





  //get data into list
  async getAllCompanyCodeDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails();
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.companyCodeDetails = result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
