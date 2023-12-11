import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-divion',
  templateUrl: './add-divion.component.html',
  styleUrls: ['./add-divion.component.css']
})
export class AddDivionComponent {

  divion:any=FormGroup
  isSubmitted:any=false
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.channeldata()
}

channeldata(){
  this.divion=this.fb.group({
    divion:['',Validators.required],
    description:['',Validators.required]
  })
}
addDivion(){
  console.log(this.divion);
  
}
}
