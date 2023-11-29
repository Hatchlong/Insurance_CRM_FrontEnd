import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company-code',
  templateUrl: './add-company-code.component.html',
  styleUrls: ['./add-company-code.component.css']
})
export class AddCompanyCodeComponent {
  companyCode:any= FormGroup
  companyDetails: any = []

  constructor( 
    private fb:FormBuilder,
    private companyCodeSer: CompanyCodeService,
    private router: Router
  ){}
 
    ngOnInit(): void {
        this.getCompanyDetails()
        this.code()
    }
 
    code(){
      this.companyCode=this.fb.group({
        companyCode:['', Validators.required],
        companyName:['', Validators.required],
        countryId:['', Validators.required],
        city:['', Validators.required],
        currency:['', Validators.required],
        languageId:['', Validators.required]
      })
    }

  // Create the purchase org Details
    async addCode(){
     try {
      if(this.companyCode.invalid)
        return alert('Please fill all the fields');
      const result: any = await this.companyCodeSer.createCompanyCodeDetails(this.companyCode.value);
      console.log(result)
      if(result.status=== '1'){
        alert(result.message);
        this.router.navigate(['/settings/company-code-list']);
        return;
      }
      if(result.status=== '0')
        return alert(result.message);

     } catch (error) {
        console.error(error)
     }
    }


    
  // Get All details for company code
  async getCompanyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails();
      if (result.status === '1') {
        this.companyDetails = result.data
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }



    // addCode(){
    //   console.log(this.companyCode);
      
}

