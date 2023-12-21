import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productDetails: any = []
  selectedFile: any = ''; 
  allProductDetails:any = []

  constructor(
    private router: Router,
    private productSer: ProductService,
    private _snackBar: MatSnackBar
  ) {

  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }


  ngOnInit(): void {
    this.getProductDetails()
  }

   filterData=(event:any)=>{
    const dataf:any=this.productDetails.filter((item:any)=> item===item.materialDescription)
    console.log(dataf);
    
  }
  async getProductDetails() {
    try {
      const result: any = await this.productSer.getAllProductDetails()
      console.log(result);
      if (result.status === '1') {
        this.allProductDetails=result.data
        this.productDetails = result.data
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
  //delete particular record


  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.productSer.updatedProductDetails(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getProductDetails()
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

  
  handleFilter(event:any){
    if(!event.target.value){
      this.productDetails = this.allProductDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allProductDetails.filter((obj:any) => ((obj.materialId.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.materialDescription.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.productDetails = isStringIncluded
  }

}

