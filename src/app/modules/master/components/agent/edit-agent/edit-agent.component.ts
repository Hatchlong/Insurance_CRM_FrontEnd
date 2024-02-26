import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgentService } from '../../../services/agent/agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageComponent } from '../../view-image/view-image/view-image.component';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent {

  isShowPadding: any = false
  agentFormData: any = FormGroup
  isSubmitted: any = false;
  agentId: any = ''
  isImageShow: any = false;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  filePath: any = '';
  imageSrc: any = '';
  @ViewChild('inputFile') inputFile: any;
  filedPathName: any = '';
  inputControl: any = '';


  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private agentSer: AgentService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,

  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  ngOnInit(): void {
    this.agentId = this.activeRouter.snapshot.paramMap.get('id')
    this.createAgentData()
    this.getSingleDetail()
  }

  states = ['Delhi', 'Madhya Pradesh', 'Mumbai', 'Uttar Pradesh'];
  cities: { [key: string]: string[] } = {
    'Delhi': ['Chandni Chowk','Connaught Place', 'Defence Colony', 'Dwarka', 'Greater Kailash', 'Hauz Khas', 'Janakpuri', 'Karol Bagh', 'Lajpat Nagar', 'Mayur Vihar', 'Narela', 'Nehru Place', 'Paharganj', 'Pitampura', 'Rajouri Garden', 'Rohini', 'Saket', 'Shahdara', 'South Extension', 'Vasant Kunj'],
    'Madhya Pradesh': ['Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Khandwa', 'Khargone', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Vidisha'],
    'Mumbai' : [  "Andheri",  "Bandra",  "Borivali",  "Chembur",  "Colaba",  "Dadar",  "Dharavi",  "Goregaon",  "Juhu",  "Kandivali",  "Kurla",  "Malad",  "Matunga",  "Mulund",  "Powai",  "Santacruz",  "Vashi",  "Versova",  "Vikhroli",  "Worli"],
    'Uttar Pradesh': [  "Agra",  "Aligarh",  "Allahabad",  "Amroha",  "Ayodhya",  "Azamgarh",  "Bareilly",  "Basti",  "Bijnor",  "Budaun",  "Bulandshahr",  "Etawah",  "Faizabad",  "Farrukhabad",  "Fatehpur",  "Firozabad",  "Ghaziabad",  "Gonda",  "Gorakhpur",  "Hamirpur",  "Hardoi",  "Jalaun",  "Jaunpur",  "Jhansi",  "Kanpur",  "Kushinagar",  "Lakhimpur",  "Lucknow",  "Mathura",  "Meerut",  "Mirzapur",  "Moradabad",  "Muzaffarnagar",  "Noida",  "Pilibhit",  "Pratapgarh",  "Rae Bareli",  "Rampur",  "Saharanpur",  "Shahjahanpur",  "Sitapur",  "Sultanpur",  "Unnao",  "Varanasi"]
  };

  createAgentData() {
    this.agentFormData = this.fb.group({
      _id: ['', Validators.required],
      agentId: ['', Validators.required],
      agentName: ['', Validators.required],
      category: ['', Validators.required],
      filePath: [''],
      address: [''],
      country: [''],
      state: [''],
      city: [''],
      pinCode: [''],
      mobile: ['', Validators.required],
      mailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      aadharNumber: ['', Validators.required],
      panNumber: ['', Validators.required],
      panFilePath: [''],
      aadharFilePath: [''],
      createdOn: [''],
      createdBy: [''],
      changedOn: [''],
      changedBy: ['']


    })
    this.agentFormData.get('state').valueChanges.subscribe((selectedState:any) => {
      this.agentFormData.get('city').setValue(''); // Reset city when state changes
    });
  }

  onlyNumberKey(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  //get single data

  async getSingleDetail() {
    try {
      const result: any = await this.agentSer.singleAgentDetail(this.agentId)
      console.log(result.data,'ioii');
      
      if (result.status === '1') {
        this.agentFormData.patchValue(result.data)
        if(result.data.filePath){
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data.filePath
        }
      }
    } catch (error) {
      console.error(error);

    }
  }
  // Create the purchase org Details
  async submitData() {
    try {
      this.isSubmitted = true;
      console.log(this.agentFormData.value)
      if (this.agentFormData.invalid)
        return
      const result: any = await this.agentSer.updateAgentDetail(this.agentFormData.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/agent-list']);
        return;
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

  deletePerview() {
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }


  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
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
          this.fileUploadVerifyNo()
        }
        else if (this.filedPathName === 'aadhar_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        } else if (this.filedPathName === 'pan_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        }
        else {
          this.fileName = event.target.files[0].name;
          this.selectedFile = event.target.files[0];
          this.isImageShow = false;
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


  async fileUploadVerifyNo() {
    try {
      console.log(this.selectedFileVerfiy, 'kkkkk')
      if (!this.selectedFileVerfiy) {
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFileVerfiy);
      const result: any = await this.agentSer.agentLogoUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        if (this.filedPathName === 'pan_no') {
          this.agentFormData.controls.panFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'aadhar_no') {
          this.agentFormData.controls.aadharFilePath.setValue(result.fileName)
        }
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async fileUpload() {
    try {

      if (!this.imageSrc) {
        this.submitData()
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.agentSer.agentLogoUpload(formData);
      if (result.status === '1') {
        // this._snackBar.open(result.message, '', {
        //   duration: 5 * 1000, horizontalPosition: 'center',
        //   verticalPosition: 'top',
        //   panelClass: 'app-notification-success',
        // });
        if (this.filedPathName === 'log') {
          this.agentFormData.controls.filePath.setValue(result.fileName)
        } else if (this.filedPathName === 'pan_no') {
          this.agentFormData.controls.panFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'aadhar_no') {
          this.agentFormData.controls.aadharFilePath.setValue(result.fileName)
        }
        this.submitData()
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



  closeImage() {
    this.selectedFile = '';
    this.fileName = '';
    this.isImageShow = true
  }

  deleteImage() {
    this.isImageShow = false;
    this.filePath = ''
  }

  openDialog(fileName: any) {
    const dialogRef = this.dialog.open(ViewImageComponent, {
      data: fileName
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
