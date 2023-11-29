import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plant-data',
  templateUrl: './add-plant-data.component.html',
  styleUrls: ['./add-plant-data.component.css']
})
export class AddPlantDataComponent {
  plantsData: any= FormGroup;
  plantDetails: any=[]

  constructor (private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router
    ){}
 
  ngOnInit(): void {
    this.getPlantDetails()
    this.plantData()
  }

  plantData(){
    this.plantsData =  this.fb.group({
      plantCode:['', Validators.required],
      name1:['', Validators.required], 
      name2:['', Validators.required],
      languageId:['', Validators.required],
      address:['', Validators.required],
      countryId:['', Validators.required],
      cityId:['', Validators.required],

      contactPersonName:['', Validators.required],
      contactNumber:['', Validators.required],
      timeZone:['', Validators.required],
      searchTerm:['', Validators.required],
      customerNo_plant:['', Validators.required],
      vendorNumberPlant:['', Validators.required],
      purchaseOrganizationId:['', Validators.required],
      salesOrganizationId:['', Validators.required],
      taxIndicatorId:['', Validators.required],
      stoargeLocationId:['', Validators.required],
     })
  }

 

  // Create the purchase org Details

  async submitData(){
  try {
    if(this.plantsData.invalid)
      return alert('Please fill all the fields');
    const result: any = await this.plantDataSer.createPlantDataDetails(this.plantsData.value);
    console.log(result)
    if(result.status==='1'){
      alert(result.message);
      this.router.navigate(['/settings/plant-data-list']);
      return;
    }
    if (result.status==='0')
      return alert(result.message);
  } catch (error) {
      console.log(error) 
  }
  }
 
  
  // Get All details for company code
  async getPlantDetails() {
    try {
      const result: any = await this.plantDataSer.getAllPlantData();
      if (result.status === '1') {
        this.plantDetails = result.data
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }



}
