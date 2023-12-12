import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DivionService } from '../../../Services/divion/divion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-divion',
  templateUrl: './add-divion.component.html',
  styleUrls: ['./add-divion.component.css']
})

export class AddDivionComponent implements OnInit{
 
  divionData:any=FormGroup
  isSubmitted:any=false
  constructor(private fb:FormBuilder,
    private divisionSer: DivionService,
    private router: Router
    ){}
 
  ngOnInit(): void {
    this.channeldata()
}

channeldata(){
  this.divionData=this.fb.group({
    divion:['',Validators.required],
    divionDescription:['',Validators.required]
  });
  console.warn(this.divionData.value)
}


async submitData(){
  try {
    this.isSubmitted = true
    if(this.divionData.invalid)
    return
    const result:any = await this.divisionSer.createDivionDetails(this.divionData.value);
    console.log(result)
    if(result.status === '1'){
      alert(result.message);
      this.router.navigate(['/settings/divion-list'])
      return;
    }
    this.router.navigate(['/settings/divion-list']);
    return;
    if(result.status === '0')
      return alert(result.message)
  } catch (error) {
    console.log(error)

  }
}

}
