import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private companyCodeSer: CompanyCodeService,
    private _snackBar: MatSnackBar
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
    } catch (error:any) {
       if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

}
