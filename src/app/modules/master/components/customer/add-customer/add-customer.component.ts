import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {


  customer: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  idleState: any = 'Not Started';
  fileName: any = '';
  imageSrc: any = '';
  filedPathName: any = '';
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  inputFile: any = '';
  inputControl: any = '';
  perviousValue: any = '';

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private router:Router,
    private custSer:CustomerService
  ) { }

  ngOnInit(): void {
    this.code()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  states = ['Delhi', 'Madhya Pradesh', 'Mumbai', 'Uttar Pradesh'];
  cities: { [key: string]: string[] } = {
    'Delhi': ['Chandni Chowk','Connaught Place', 'Defence Colony', 'Dwarka', 'Greater Kailash', 'Hauz Khas', 'Janakpuri', 'Karol Bagh', 'Lajpat Nagar', 'Mayur Vihar', 'Narela', 'Nehru Place', 'Paharganj', 'Pitampura', 'Rajouri Garden', 'Rohini', 'Saket', 'Shahdara', 'South Extension', 'Vasant Kunj'],
    'Madhya Pradesh': ['Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Khandwa', 'Khargone', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Vidisha'],
    'Mumbai' : [  "Andheri",  "Bandra",  "Borivali",  "Chembur",  "Colaba",  "Dadar",  "Dharavi",  "Goregaon",  "Juhu",  "Kandivali",  "Kurla",  "Malad",  "Matunga",  "Mulund",  "Powai",  "Santacruz",  "Vashi",  "Versova",  "Vikhroli",  "Worli"],
    'Uttar Pradesh': [  "Agra",  "Aligarh",  "Allahabad",  "Amroha",  "Ayodhya",  "Azamgarh",  "Bareilly",  "Basti",  "Bijnor",  "Budaun",  "Bulandshahr",  "Etawah",  "Faizabad",  "Farrukhabad",  "Fatehpur",  "Firozabad",  "Ghaziabad",  "Gonda",  "Gorakhpur",  "Hamirpur",  "Hardoi",  "Jalaun",  "Jaunpur",  "Jhansi",  "Kanpur",  "Kushinagar",  "Lakhimpur",  "Lucknow",  "Mathura",  "Meerut",  "Mirzapur",  "Moradabad",  "Muzaffarnagar",  "Noida",  "Pilibhit",  "Pratapgarh",  "Rae Bareli",  "Rampur",  "Saharanpur",  "Shahjahanpur",  "Sitapur",  "Sultanpur",  "Unnao",  "Varanasi"]
  };

  code() {
    this.customer = this.fb.group({
      customerType: ['Corporate', Validators.required],
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pinCode: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      mailId: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],

      vechicleDetails: this.fb.array([this.addVehicle()]),
      nomineeDetails: this.fb.array([this.addNominee()])
    })
    this.customer.get('state').valueChanges.subscribe((selectedState:any) => {
      this.customer.get('city').setValue(''); // Reset city when state changes
    });
  }

  onlyNumberKey(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  async addCode() {
    try {
      this.isSubmitted = true
      console.log(this.customer)
      if (this.customer.invalid)
        return

        const result:any= this.custSer.createcustomer(this.customer.value)

        if (result.status === '1') {
          this._snackBar.open(result.message, '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.router.navigate(['/master/customer-list']);
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

  addVehicle() {
    return this.fb.group({
      registrationNo: [''],
      vechicleRegistrationDate: [''],
      make: [''],
      variant: [''],
      model: [''],
      mfgYear: [''],
      engineNo: [''],
      chassisNo: [''],
      vehicleUsage: [''],
      rtoStateCode: [''],
      seatingCapacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      fuelType: [''],
      bodyType: [''],
      trailerRegNo: [''],

    })
  }

  get vehicleDetail() {
    return this.customer.get('vechicleDetails') as FormArray
  }
  addVehicles() {
    this.vehicleDetail.push(this.addVehicle())
  }
  deleterow(index: any) {
    this.vehicleDetail.removeAt(index);
  }

  addNominee() {
    return this.fb.group({
      nomineeName: [''],
      relationship: [''],
      dob: [''],
      ofShare: [''],

    })
  }

  get nomineeDetail() {
    return this.customer.get('nomineeDetails') as FormArray
  }
  addNominees() {
    this.nomineeDetail.push(this.addNominee())
  }
  deleteNomineerow(index: any) {
    this.nomineeDetail.removeAt(index);
  }

  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }


  deletePerview() {
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }

  handleUploadFile(event: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg') {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(this.filedPathName)
        if (this.filedPathName === 'company_no') {
          this.selectedFileVerfiy = event.target.files[0];
          // this.fileUploadVerifyNo()
        } else if (this.filedPathName === 'vat_no') {
          this.selectedFileVerfiy = event.target.files[0];
          // this.fileUploadVerifyNo()
        } else if (this.filedPathName === 'tax_no') {
          this.selectedFileVerfiy = event.target.files[0];
          // this.fileUploadVerifyNo()
        }
        else {
          this.fileName = event.target.files[0].name;
          this.selectedFile = event.target.files[0];
          reader.onload = e => this.imageSrc = reader.result;
        }

        reader.readAsDataURL(file);
        this.inputControl.value = ''
      } else {
        this._snackBar.open('Only support image', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    }
  }

}

