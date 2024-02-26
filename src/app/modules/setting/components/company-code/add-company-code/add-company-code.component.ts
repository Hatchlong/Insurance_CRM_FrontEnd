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
  
  states = ['Delhi', 'Madhya Pradesh', 'Mumbai', 'Uttar Pradesh'];
  cities: { [key: string]: string[] } = {
    'Delhi': ['Chandni Chowk','Connaught Place', 'Defence Colony', 'Dwarka', 'Greater Kailash', 'Hauz Khas', 'Janakpuri', 'Karol Bagh', 'Lajpat Nagar', 'Mayur Vihar', 'Narela', 'Nehru Place', 'Paharganj', 'Pitampura', 'Rajouri Garden', 'Rohini', 'Saket', 'Shahdara', 'South Extension', 'Vasant Kunj'],
    'Madhya Pradesh': ['Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Khandwa', 'Khargone', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Vidisha'],
    'Mumbai' : [  "Andheri",  "Bandra",  "Borivali",  "Chembur",  "Colaba",  "Dadar",  "Dharavi",  "Goregaon",  "Juhu",  "Kandivali",  "Kurla",  "Malad",  "Matunga",  "Mulund",  "Powai",  "Santacruz",  "Vashi",  "Versova",  "Vikhroli",  "Worli"],
    'Uttar Pradesh': [  "Agra",  "Aligarh",  "Allahabad",  "Amroha",  "Ayodhya",  "Azamgarh",  "Bareilly",  "Basti",  "Bijnor",  "Budaun",  "Bulandshahr",  "Etawah",  "Faizabad",  "Farrukhabad",  "Fatehpur",  "Firozabad",  "Ghaziabad",  "Gonda",  "Gorakhpur",  "Hamirpur",  "Hardoi",  "Jalaun",  "Jaunpur",  "Jhansi",  "Kanpur",  "Kushinagar",  "Lakhimpur",  "Lucknow",  "Mathura",  "Meerut",  "Mirzapur",  "Moradabad",  "Muzaffarnagar",  "Noida",  "Pilibhit",  "Pratapgarh",  "Rae Bareli",  "Rampur",  "Saharanpur",  "Shahjahanpur",  "Sitapur",  "Sultanpur",  "Unnao",  "Varanasi"]
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
