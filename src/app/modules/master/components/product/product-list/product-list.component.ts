import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  productDetails:any=[]

  constructor(
    private router:Router,
    private productSer:ProductService
  ){

  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }


  ngOnInit(): void {
      this.getProductDetails()
  }

  async getProductDetails(){
    try {
      const result:any=await this.productSer.getAllProductDetails()
      console.log(result);
      if(result.status==='1'){
        this.productDetails=result.data
      }
      
    } catch (error) {
      console.error(error);
      
    }
  }

}

