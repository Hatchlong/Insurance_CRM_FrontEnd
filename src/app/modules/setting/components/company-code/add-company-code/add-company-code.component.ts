import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-company-code',
  templateUrl: './add-company-code.component.html',
  styleUrls: ['./add-company-code.component.css']
})
export class AddCompanyCodeComponent {
  companyCode: any = FormGroup
  companyDetails: any = [];
  countryDetials: any = []
  citiesDetails: any = [];
  languageName: any = ''
  isSubmitted: any = false
  currencyDetails: any = [];
  isShowPadding: any = false;
  selectedFile: any = '';
  fileName: any = '';
  imageSrc:any = '';
  @ViewChild('inputFile') inputFile:any;
  constructor(
    private fb: FormBuilder,
    private companySer: CompanyCodeService,
    private companyCodeSer: CompanyCodeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCountryDetails()
    this.getCompanyDetails()
    this.getCurrencyDetails()
    this.code()
  }

  code() {
    this.companyCode = this.fb.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: [''],
      city: ['', Validators.required],
      currencyId: ['', Validators.required],
      currencyName: ['', Validators.required],
      languageId: ['', Validators.required],
      languageName: ['', Validators.required],
      address1:['', Validators.required],
      address2:[''],
      filePath:[''],
    })
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  // Create the purchase org Details
  async addCode() {
    try {
      this.isSubmitted = true;
      console.log(this.companyCode.value)
      if (this.companyCode.invalid)
        return
      const result: any = await this.companyCodeSer.createCompanyCodeDetails(this.companyCode.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/company-code-list']);
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

  // Get All details for company code
  async getCompanyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails();
      if (result.status === '1') {
        this.companyDetails = result.data;

      } else {
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


  // Get All details for Currency code
  async getCurrencyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCurrencyDetails();
      if (result.status === '1') {
        this.currencyDetails = result.data;

      } else {
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

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
      } else {
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

  // single details for Language Detials
  async getSingleLanguage(id: any) {
    try {
      const result: any = await this.companyCodeSer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName;
        this.companyCode.controls.languageName.setValue(this.languageName)
      } else {
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


  selectCountryName(event: any) {
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.countryName.setValue(this.citiesDetails.countryName)
    this.companyCode.controls.languageId.setValue(this.citiesDetails.languageId)
    const findDefaultCurrency = this.currencyDetails.find((el:any) => el.countryId === event.target.value);
    this.companyCode.controls.currencyId.setValue(findDefaultCurrency._id)
    this.companyCode.controls.currencyName.setValue(findDefaultCurrency.currencyName)

    this.getSingleLanguage(this.citiesDetails.languageId)


  }


  handleCurrency(event: any) {
    const findCurrencyCode = this.currencyDetails.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.currencyName.setValue(findCurrencyCode.code)
  }



  uploadFile(inputData: any) {
    inputData.click()
  }


  handleUploadFile(event: any) {
  
    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg') {
        this.fileName = event.target.files[0].name;
        this.selectedFile = event.target.files[0];;
        const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
      } else {
        this._snackBar.open('Only support image', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    }
  }

  async fileUpload() {
    if(!this.selectedFile){
      this.addCode()
      return
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    const result: any = await this.companyCodeSer.companyLogUpload(formData);
    if (result.status === '1') {
      // this._snackBar.open(result.message, '', {
      //   duration: 5 * 1000, horizontalPosition: 'center',
      //   verticalPosition: 'top',
      //   panelClass: 'app-notification-success',
      // });
      this.companyCode.controls.filePath.setValue(result.fileName)
      this.addCode()
      return;
    }
    if (result.status === '0') {
      this._snackBar.open(result.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  } catch(error: any) {
    this._snackBar.open('Something went wrong', '', {
      duration: 5 * 1000, horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'app-notification-error',
    });
  }


  deletePerview(){
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }

 async getAllCurrecnyDetails(){

  }


}