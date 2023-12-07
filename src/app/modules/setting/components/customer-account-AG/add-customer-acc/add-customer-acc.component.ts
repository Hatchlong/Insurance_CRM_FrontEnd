import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-customer-acc',
  templateUrl: './add-customer-acc.component.html',
  styleUrls: ['./add-customer-acc.component.css']
})
export class AddCustomerAccComponent implements OnInit{

  
  customerAcc:any=FormGroup
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
      this.channeldata()
  }

  channeldata(){
    this.customerAcc=this.fb.group({
      customerAccount:'',
      description:''
    })
  }
  addCustomerAcc(){
    console.log(this.customerAcc);
    
  }
}
