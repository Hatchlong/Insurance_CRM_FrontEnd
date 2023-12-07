import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';

@Component({
  selector: 'app-company-code-list',
  templateUrl: './company-code-list.component.html',
  styleUrls: ['./company-code-list.component.css']
})
export class CompanyCodeListComponent {
  companyCodeDetail:any=[]

  constructor(
    private router:Router,
    private companyCodeSer:CompanyCodeService
  ){}

  ngOnInit(): void{
    this.getAllCompanyCodeDetails()
  }

  nextPage(url:any){
    this.router.navigate([`${url}`])
  }


 

  checks=false;
  selectAll(e:any){
    if(e.target.checked==true){
      this.checks=true;
    }else{
      this.checks=false;
    }
  }

  //get data into list
  async getAllCompanyCodeDetails(){
    try {
      const result:any=await this.companyCodeSer.getAllCompanyCodeDetails();
      console.log(result);
     if(result.status==='1'){ 
      this.companyCodeDetail=result.data
     } 
    } catch (error) {
      console.error(error);
      
    }
  }

}
