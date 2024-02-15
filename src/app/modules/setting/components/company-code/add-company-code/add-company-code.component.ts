import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyCodeService } from '../../../services/company-code/company-code.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company-code',
  templateUrl: './add-company-code.component.html',
  styleUrls: ['./add-company-code.component.css']
})
export class AddCompanyCodeComponent implements OnInit{

  isShowPadding: any = false
  companyCodeFormData: any = FormGroup
  imageSrc: any = '';
  isSubmitted: any = false;


  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private companyCodeSer:CompanyCodeService,
    private router:Router
    ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  ngOnInit(): void {
    this.createCompanyCodeData()
    
  }
  states = ['Uttar Pradesh', 'State2', 'State3'];
  cities: { [key: string]: string[] } = {
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Ambedkar Nagar','Amethi','Amroha','Auraiya','Ayodhya','Azamgarh','Baghpat','Bahraich',
  'Ballia','Balrampur','Banda','Barabanki','Bareilly','Basti','Bijnor','Budaun','Bulandshahr','Chandauli','Chitrakoot',
'Deoria','Etah','Etawah','Firozabad'],
    'State2': ['City2A', 'City2B', 'City2C'],
    'State3': ['City3A', 'City3B', 'City3C']
  };
  createCompanyCodeData() {
    this.companyCodeFormData = this.fb.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      address: [''],
      country: [''],
      state: [''],
      city: [''],
      pinCode: [''],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      mailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      companyRegistrationNo: [''],
      panNumber: [''],
      
    })
    this.companyCodeFormData.get('state').valueChanges.subscribe((selectedState:any) => {
      this.companyCodeFormData.get('city').setValue(''); // Reset city when state changes
    });
  }

  async submitData() {
    try {
      this.isSubmitted = true;
      console.log(this.companyCodeFormData.value, this.companyCodeFormData.invalid)
      if (this.companyCodeFormData.invalid)
        return

      const result:any =await this.companyCodeSer.createCompanyCode(this.companyCodeFormData.value)

      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/company-code-list']);
        return;
      }

    } catch (error:any) {
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

  onlyNumberKey(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
}
