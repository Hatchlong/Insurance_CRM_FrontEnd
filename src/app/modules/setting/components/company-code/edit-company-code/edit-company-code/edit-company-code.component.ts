import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';

@Component({
  selector: 'app-edit-company-code',
  templateUrl: './edit-company-code.component.html',
  styleUrls: ['./edit-company-code.component.css']
})
export class EditCompanyCodeComponent {
  companyCode:any= FormGroup
  companyDetails: any = [];
  companyCodeId: any = ''

  constructor(  
    private fb:FormBuilder,
    private companyCodeSer: CompanyCodeService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ){}
  
    ngOnInit(): void {
        this.companyCodeId= this.activeRouter.snapshot.paramMap.get('id');
        console.log(this.companyCodeId)
        this.getSingleCompanyCodeDetails()
        this.getCompanyDetails()
        this.code()
    }
 
    code(){
      this.companyCode=this.fb.group({
        _id:['',Validators.required],
        companyCode:['', Validators.required],
        companyName:['', Validators.required],
        countryId:['', Validators.required],
        city:['', Validators.required],
        currency:['', Validators.required],
        languageId:['', Validators.required]
      })
    }

    // update

    async getSingleCompanyCodeDetails(){
      try {
        const result: any = await this.companyCodeSer.singleCompanyCode(this.companyCodeId);
        if (result.status === '1') {
          this.companyCode.patchValue(result.data)
        }
      } catch (error) {
        console.error(error)
      }
    }


  // Create the purchase org Details
    async addCode(){
     try {
      if(this.companyCode.invalid)
        return alert('Please fill all the fields');
      const result: any = await this.companyCodeSer.updateCompanyCode(this.companyCode.value);
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

}
