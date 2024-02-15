import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {


  customer: any = FormGroup
  isSubmitted:any = false;
  isShowPadding:any = false;
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
  ) {  }

  ngOnInit(): void {
    this.code()
  }

 
  handleSideBar(event: any) {
    this.isShowPadding = event
  }

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
  }

  onlyNumberKey(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  addCode(){
    console.log(this.customer)
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
      seatingCapacity:['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      fuelType:[''],
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

