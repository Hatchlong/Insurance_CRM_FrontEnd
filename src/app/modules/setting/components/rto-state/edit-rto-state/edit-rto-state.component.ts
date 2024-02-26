import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RtoStateService } from '../../../services/rto-state/rto-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-rto-state',
  templateUrl: './edit-rto-state.component.html',
  styleUrls: ['./edit-rto-state.component.css']
})
export class EditRtoStateComponent implements OnInit{

  rtoStateData: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
rtoStateId:any=''
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rtoSer: RtoStateService,
    private _snackBar: MatSnackBar,
    private activateRouter:ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.rtoStateId=this.activateRouter.snapshot.paramMap.get('id')
    this.getSingleRtoStateDetail()
    this.data()
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

  data() {
    this.rtoStateData = this.fb.group({
      _id:['',Validators.required],
      rtoStateCode: ['', Validators.required],
      description: ['', Validators.required],
      address: [''],
      country: [''],
      state: [''],
      city: [''],
    });
    this.rtoStateData.get('state').valueChanges.subscribe((selectedState:any) => {
      this.rtoStateData.get('city').setValue(''); // Reset city when state changes
    });

  }
  //get singleDetail
  async getSingleRtoStateDetail() {
    try {
      const result: any = await this.rtoSer.singleRtoStateDetail(this.rtoStateId)
      if (result.status === '1') {
        this.rtoStateData.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.rtoStateData.invalid)
        return
      const result: any = await this.rtoSer.updateRtoStateDetail(this.rtoStateData.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/rto-state-list/'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }


    } catch (error: any) {
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


}
