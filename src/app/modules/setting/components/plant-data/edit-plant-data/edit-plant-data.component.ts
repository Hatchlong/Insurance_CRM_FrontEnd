import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-plant-data',
  templateUrl: './edit-plant-data.component.html',
  styleUrls: ['./edit-plant-data.component.css']
})
export class EditPlantDataComponent {
  plantsData: any= FormGroup
  plantDetails: any=[];
  plantDataId: any = []

  constructor (
    private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router,
    private activeRouter: ActivatedRoute
    ){}
 
  ngOnInit(): void {
    this.plantDataId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.plantDataId)
    // this.getPlantDetails()
    this.getSinglePlantDataDetails()
    this.plantData()
  }

  plantData(){
    this.plantsData =  this.fb.group({
      _id:['', Validators.required],
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


  // update

  async getSinglePlantDataDetails(){
    try {
      const result: any = await this.plantDataSer.singlePlantData(this.plantDataId)
      if (result.status === '1'){
        this.plantsData.patchValue(result.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

 

  // Create the plant data Details

  async submitData(){
  try {
    if(this.plantsData.invalid)
      return alert('Please fill all the fields');
    const result: any = await this.plantDataSer.updatePlantData(this.plantsData.value);
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
 
  
}
