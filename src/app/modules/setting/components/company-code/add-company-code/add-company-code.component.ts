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
<<<<<<< HEAD

  companyCode:any= FormGroup
  companyCodeDetail:any=[]
=======
  companyCode:any= FormGroup
  companyDetails: any = []
>>>>>>> 67f2481a78151d4bcd6bf3dcc1be61c63b917ce4

  constructor( 
    private fb:FormBuilder,
    private companyCodeSer: CompanyCodeService,
<<<<<<< HEAD
    private router:Router
=======
    private router: Router
>>>>>>> 67f2481a78151d4bcd6bf3dcc1be61c63b917ce4
  ){}
 
    ngOnInit(): void {
<<<<<<< HEAD
        this.getCompanyCode() 
=======
        this.getCompanyDetails()
>>>>>>> 67f2481a78151d4bcd6bf3dcc1be61c63b917ce4
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
<<<<<<< HEAD
      });
      console.warn(this.companyCode.value)
    }

    //submit data

    async addCode(){
      try {
        if(this.companyCode.invalid){
          return alert("All fields are required")
        }
        const result: any = await this.companyCodeSer.createComapnyCodeDetail(this.companyCode.value)
        console.log(result);
        if(result.status === '1')
        {
          alert(result.message)
          this.router.navigate(['/settings/company-code-list']);
          return;
        }
        if(result.status==='0'){
          return alert(result.message)
        }

      } catch (error) {
        console.error(error);
        
      }
      console.log(this.companyCode)
    }

    // read all data

    async getCompanyCode(){
      try{
        const result:any=await this.companyCodeSer.getAllCompanyCode();
        if(result.status==='1'){
          this.companyCodeDetail=result.data
        }
        else{
          alert('Failed')
        }
        console.log(result)
      }
      catch (error){
        console.error(error)
      }
    }
    

   
=======
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
      
>>>>>>> 67f2481a78151d4bcd6bf3dcc1be61c63b917ce4
}

