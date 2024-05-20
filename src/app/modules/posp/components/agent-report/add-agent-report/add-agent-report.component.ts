import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-agent-report',
  templateUrl: './add-agent-report.component.html',
  styleUrls: ['./add-agent-report.component.css']
})
export class AddAgentReportComponent {

  candidateFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  imageSrc: any = '';
  filedPathName: any = '';
  inputControl: any = '';
  @ViewChild('inputFile') inputFile: any;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  jobDetail: any = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.data()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.candidateFormGroup = this.fb.group({
      fullName: ['', Validators.required],
      email: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      jobName: [''],
      homeTown: [''],
      currentLocation: [''],
      linkedinProfile: [''],
      facebookProfile: [''],
      twitterProfile: [''],
      instagramProfile: [''],
      githubProfile: [''],
      experience: [''],
      expertise: [''],
      currentCompany: [''],
      currentSalary: [''],
      currentCompanyDesignation: [''],
      reasonForLeaving: [''],
      expectedSalary: [''],
      noticePeriod: [''],
      skills: [''],
      resumeFilepath: [''],

    });
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

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.candidateFormGroup.value);

      if (this.candidateFormGroup.invalid)
        return
        const username: any = localStorage.getItem('userName')

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
  
        // Format the date and time
        const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
        this.candidateFormGroup.value.createdOn = fullDate
        this.candidateFormGroup.value.createdBy = username
        this.candidateFormGroup.value.changedOn = fullDate
        this.candidateFormGroup.value.changedBy = username
       
      // const result: any = await this.candidateSer.createcandidateDetail(this.candidateFormGroup.value)
      // if (result.status === '1') {
      //   this._snackBar.open(result.message, '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-success',
      //   });
      //   this.router.navigate(['/recruitment/candidate-list/'])
      //   return
      // }
      // if (result.status === '0') {
      //   this._snackBar.open(result.message, '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-error',
      //   });
      // }


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
