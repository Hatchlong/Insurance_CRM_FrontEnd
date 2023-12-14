import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SalesOrgService } from '../../../Services/sales-org/sales-org.service';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-sales-org',
  templateUrl: './edit-sales-org.component.html',
  styleUrls: ['./edit-sales-org.component.css']
})
export class EditSalesOrgComponent {

  salesOrg: any = FormGroup
  isSubmitted: any = false
  timeZone: any = []
  countryDetials: any = []
  details: any = []
  salesDataId: any = ''
  singleDetail:any=[]

  constructor(
    private fb: FormBuilder,
    private salesSer: SalesOrgService,
    private plantSer: PlantDataService,
    private companyCodeSer: CompanyCodeService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.salesDataId = this.activeRouter.snapshot.paramMap.get('id')
    this.code()
    this.getSingleDetail()
    this.getTimeZoneDetail()
    this.getCountryDetails()
  }

  code() {
    this.salesOrg = this.fb.group({
      _id: ['', Validators.required],
      salesOrg: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      searchTerm: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: ['', Validators.required],
      regionId: ['', Validators.required],
      regionName: ['rrrr'],
      timeZoneId: ['', Validators.required],
      timeZoneName: ['', Validators.required],
      contactPerson: ['', Validators.required],

    });

  }

  async addCode() {
    try {
      this.isSubmitted = true
      console.log(this.salesOrg.value);
      if (this.salesOrg.invalid)
        return
      const result: any = await this.salesSer.updatedSalesOrgDetails(this.salesOrg.value)
      console.log(result);
      if (result.status === '1') {
        // alert(result.message);
        Swal.fire({
          title: 'success',
          text: 'Sales Org Updated Successfully',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/sales-org-list']);
        return;
      }
      if (result.status === '0')
        return alert(result.message);


    } catch (error) {
      console.error(error);

    }
  }

  // get time zone
  async getTimeZoneDetail() {
    try {
      const result: any = await this.plantSer.getAllTimeZoneDetails()
      console.log(result);

      if (result.status === '1') {
        this.timeZone = result.data
      }
      else {
        alert("API Failed")
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
    } catch (error) {
      console.error(error);

    }
  }

  //get single detail

  async getSingleDetail() {
    try {
      const result: any = await this.salesSer.singleSalesOrgDetails(this.salesDataId)
      if (result.status === '1') {
        this.salesOrg.patchValue(result.data)
        this.singleDetail=this.countryDetials.find((el:any)=>el._id===this.salesOrg.value.countryId)
      }
    } catch (error) {
      console.error(error);

    }
  }

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
      } else {
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: 'warning',
        text: 'API Failed',
        icon: 'warning',
        showCancelButton: true
      })
    }

  }
  selectCountry(event: any) {
    this.details = this.countryDetials.find((el: any) => el._id === event.target.value);
    console.log(this.details);
    this.salesOrg.controls.countryName.setValue(this.details.countryName)


  }
  handleTimeZone(event: any) {
    // const time=this.timeZone.find((el:any)=>el.timeZoneName=+event.target.value)
    // this.salesOrg.controls.timeZoneName.setValue(time.timeZoneName)
  }

}
