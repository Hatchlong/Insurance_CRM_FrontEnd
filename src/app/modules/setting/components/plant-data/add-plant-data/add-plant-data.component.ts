import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-plant-data',
  templateUrl: './add-plant-data.component.html',
  styleUrls: ['./add-plant-data.component.css']
})
export class AddPlantDataComponent {
  stoLoc: any= FormGroup;

  constructor (private fb: FormBuilder){}

  ngOnInit(): void {
    this.plantData()
  }

  plantData(){
    this.stoLoc =  this.fb.group({
      plantCode:'',
      name1:'',
      name2:'',
      languageKey:'',
      address:'',
      country:'',
      city:'',

      contactPersonName:'',
      contactNumber:'',
      timeZone:'',
      searchTerm:'',
      cusNoPlant:'',
      venNoPlant:'',
      purOrg:'',
      selOrg:'',
      taxIndicator:'',
      storageLocation:'',
     })
  }

  submitData(){
    console.warn(this.stoLoc.value)
  }


}
