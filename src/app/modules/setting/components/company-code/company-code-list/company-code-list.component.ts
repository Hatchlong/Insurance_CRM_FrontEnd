import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';

@Component({
  selector: 'app-company-code-list',
  templateUrl: './company-code-list.component.html',
  styleUrls: ['./company-code-list.component.css']
})
<<<<<<< HEAD
export class CompanyCodeListComponent implements OnInit {
  companyCodeDetail:any=[]

  constructor(
    private router:Router,
    private companyCodeSer:CompanyCodeService
=======
export class CompanyCodeListComponent {

  companyCodeDetails:any= []

  constructor(
    private router:Router,
    private companyCodeSer: CompanyCodeService
>>>>>>> 67f2481a78151d4bcd6bf3dcc1be61c63b917ce4
  ){}

  ngOnInit(): void{
    this.getAllCompanyCodeDetails()
  }

  nextPage(url:any){
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllCompanyCodeDetails()
  }

 

  checks=false;
  selectAll(e:any){
    if(e.target.checked==true){
      this.checks=true;
    }else{
      this.checks=false;
    }
  }

<<<<<<< HEAD
  //get data into list
  async getAllCompanyCodeDetails(){
    try {
      const result:any=await this.companyCodeSer.getAllCompanyCodeDetail();
      console.log(result);
     if(result.status==='1'){ 
      this.companyCodeDetail=result.data
     } 
    } catch (error) {
      console.error(error);
      
=======
  async getAllCompanyCodeDetails(){
    try {
      const result:any = await this.companyCodeSer.getAllCompanyCodeDetails();
      console.log(result)
      if(result.status === '1'){
        this.companyCodeDetails = result.data;
      }
    } catch (error) {
      console.log(error);
>>>>>>> 67f2481a78151d4bcd6bf3dcc1be61c63b917ce4
    }
  }

}
