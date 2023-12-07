import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-divion',
  templateUrl: './add-divion.component.html',
  styleUrls: ['./add-divion.component.css']
})
export class AddDivionComponent {

  divion:any=FormGroup

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.channeldata()
}

channeldata(){
  this.divion=this.fb.group({
    divion:'',
    description:''
  })
}
addDivion(){
  console.log(this.divion);
  
}
}
