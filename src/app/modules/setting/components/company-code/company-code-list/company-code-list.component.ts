import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';

@Component({
  selector: 'app-company-code-list',
  templateUrl: './company-code-list.component.html',
  styleUrls: ['./company-code-list.component.css']
})
export class CompanyCodeListComponent {
<<<<<<< HEAD
=======
<<<<<<< HEAD
  
  companyCodeDetails:any= []
=======
=======
export class CompanyCodeListComponent implements OnInit {
>>>>>>> 8182030ed50a1adf198a3ea6bde1554ab0e0db49
>>>>>>> 2ead3065ec0f809e5b01a136a92336d398475a72
  companyCodeDetail:any=[]
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22

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
<<<<<<< HEAD
      const result:any = await this.companyCodeSer.getAllCompanyCodeDetails();
      console.log(result)
      if(result.status === '1'){
        this.companyCodeDetails = result.data;
      }
    } catch (error) { 
      console.log(error);
=======
      const result:any=await this.companyCodeSer.getAllCompanyCodeDetails();
      console.log(result);
     if(result.status==='1'){ 
      this.companyCodeDetail=result.data
     } 
    } catch (error) {
      console.error(error);
      
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
    }
  }

}
