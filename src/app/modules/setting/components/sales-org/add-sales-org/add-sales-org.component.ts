import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesOrgService } from '../../../Services/sales-org/sales-org.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';

@Component({
  selector: 'app-add-sales-org',
  templateUrl: './add-sales-org.component.html',
  styleUrls: ['./add-sales-org.component.css']
})
export class AddSalesOrgComponent {
  salesOrg: any = FormGroup
  isSubmitted: any = false
  timeZone: any = []
  countryDetials: any = []

  constructor(
    private fb: FormBuilder,
    private salesSer: SalesOrgService,
    private plantSer: PlantDataService,
    private companyCodeSer: CompanyCodeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.code()
    this.getTimeZoneDetail()
    this.getCountryDetails()
  }

  code() {
    this.salesOrg = this.fb.group({
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
      const result: any = await this.salesSer.createSalesOrg(this.salesOrg.value)
      console.log(result);
      if (result.status === '1') {
        // alert(result.message);
        Swal.fire({
          title: 'success',
          text: 'Sales Org Processed Successfully',
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

  
}
