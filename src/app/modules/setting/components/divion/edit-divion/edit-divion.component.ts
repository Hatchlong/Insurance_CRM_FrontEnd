import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DivionService } from '../../../Services/divion/divion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-divion',
  templateUrl: './edit-divion.component.html',
  styleUrls: ['./edit-divion.component.css']
})
export class EditDivionComponent {

divionData:any=FormGroup
isSubmitted:any=false
divionId: any = ''

constructor(private fb:FormBuilder,
  private divisionSer: DivionService,
  private router: Router,
  private activeRouter: ActivatedRoute
  ){}
 
ngOnInit(): void {
  this.divionId = this.activeRouter.snapshot.paramMap.get('id');
  console.log(this.divionId)
   this.getSingleDivionDetails()
   this.channeldata()
}

channeldata(){
this.divionData=this.fb.group({
  _id: ['', Validators.required],
  divion:['',Validators.required],
  divionDescription:['',Validators.required]
});
console.warn(this.divionData.value)
}

async getSingleDivionDetails() {
  try {
    const result: any = await this.divisionSer.singleDivionDetails(this.divionId);
    if (result.status === '1') {
      this.divionData.patchValue(result.data);
    }
  } catch (error) {
    console.error(error)
  }
}

async submitData(){ 
try {
  this.isSubmitted = true
  if(this.divionData.invalid)
  return
  const result:any = await this.divisionSer.updateDivion(this.divionData.value);
  console.log(result)
  if(result.status === '1'){
    alert(result.message);
    this.router.navigate(['/settings/divion-list'])
    return;
  }
  if(result.status === '0')
    return alert(result.message)
} catch (error) {
  console.log(error)

}
}


} 
