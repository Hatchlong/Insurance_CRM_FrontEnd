import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  customerDetail: any = []
  allcustomerDetail: any = []
  selectAll: any = false
  page?: number = 0;
  itemsPerPage = 10;

  constructor(private router: Router,
    private customerSer: CustomerService,
    private _snackBar: MatSnackBar,

  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllCustomerDetail(this.page,this.itemsPerPage)
  }
  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.customerDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.customerDetail[index].check = event.target.checked
    const findSelect = this.customerDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }


  //get all detail of agent from the database
  async getAllCustomerDetail(page:any,itemsPerPage:any) {
    try {
      const result: any = await this.customerSer.getAllCustomerDetailsPage(page,itemsPerPage)
      console.log(result.data,'get');
      
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.customerDetail = result.data
        this.allcustomerDetail = result.data
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.customerSer.updatecustomerDetail(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllCustomerDetail(this.page,this.itemsPerPage)
        return;
      }
      if (result.status === '0') {
        this._snackBar.open("Deleted Unsuccessfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.customerDetail = this.allcustomerDetail;
      return;
    }

    this.customerDetail = this.allcustomerDetail.filter((obj: any) =>
      ((obj.customerId.toUpperCase()).includes(filterValue) || (obj.customerName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.customerDetail = this.allcustomerDetail.filter((obj: any) =>
      ((obj.customerId.toUpperCase()).includes(filterValue) || (obj.customerName.toUpperCase()).includes(filterValue)))

  }

  
  async handleDeleteMuliple() {
    try {
      const filterData = this.customerDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.customerSer.updateCustomerDetailsMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllCustomerDetail(this.page, this.itemsPerPage)
        return;
      }
      if (result.status === '0') {
        this._snackBar.open("Deleted Unsuccessfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      console.error(error)
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


}
