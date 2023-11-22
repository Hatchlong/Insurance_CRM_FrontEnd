import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-company-code',
  templateUrl: './add-company-code.component.html',
  styleUrls: ['./add-company-code.component.css']
})
export class AddCompanyCodeComponent {
  companycode:any= FormGroup

  constructor( 
    private fb:FormBuilder
  ){}

    ngOnInit(): void {
        this.code()
    }

    code(){
      this.companycode=this.fb.group({
        companyCode:'',
        companyName:'',
        countryId:'',
        city:'',
        currency:'',
        languageId:''
      })
    }

    addCode(){
      console.log(this.companycode);
      
    }
}
