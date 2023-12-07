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
  countryDetials: any = []
  citiesDetails:any = [];
  languageName:any = ''
  constructor( 
    private fb:FormBuilder,
    private companyCodeSer: CompanyCodeService,
    private router: Router
  ){}
 
    ngOnInit(): void {
        this.getCountryDetails()
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
      console.log(this.companyCode.value)
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
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }

   // single details for Language Detials
   async getSingleLanguage(id:any) {
    try {
      const result: any = await this.companyCodeSer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }



  selectCountryName(event:any){
    console.log(event.target.value)
    this.citiesDetails = this.countryDetials.find((el:any) => el._id === event.target.value);
    this.companyCode.controls.currency.setValue(this.citiesDetails?.countryCurrency)
    this.companyCode.controls.languageId.setValue(this.citiesDetails.languageId)

    this.getSingleLanguage(this.citiesDetails.languageId)

  }
  

}

