import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-purchase-org',
  templateUrl: './add-purchase-org.component.html',
  styleUrls: ['./add-purchase-org.component.css']
})
export class AddPurchaseOrgComponent implements OnInit {
  purchOrg : any = FormGroup;

  constructor ( private fb: FormBuilder){}

  ngOnInit(): void {
    this.purchOrgData()
  }

  purchOrgData(){
    this.purchOrg = this.fb.group({
      purchOrg: '',
      purOrgDes: '',
      comCode: ''
    });
    console.warn(this.purchOrg.value)
  }

  submitData(){
    console.warn(this.purchOrg.value)
  }
}
