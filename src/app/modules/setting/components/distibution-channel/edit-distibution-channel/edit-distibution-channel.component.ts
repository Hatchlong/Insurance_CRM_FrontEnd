import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistibutionChannelService } from '../../../Services/distibution-channel/distibution-channel.service';

@Component({
  selector: 'app-edit-distibution-channel',
  templateUrl: './edit-distibution-channel.component.html',
  styleUrls: ['./edit-distibution-channel.component.css']
})
export class EditDistibutionChannelComponent implements OnInit{
 
  channel:any=FormGroup
  isSubmitted:any=false
  distributionId: any = ''


  constructor(private fb:FormBuilder,
    private distribustionSer : DistibutionChannelService,
    private router : Router,
    private activeRouter:ActivatedRoute
    ){}

  ngOnInit(): void {
    this.distributionId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.distributionId)
    this.getSingleDistributionDetails()
    this.channeldata()
  }

  channeldata(){
    this.channel=this.fb.group({
      _id: ['', Validators.required],
      distributionChannel:['',Validators.required],
      distributionDescription:['',Validators.required]
    });
  console.warn(this.channel.value)

  }

  async getSingleDistributionDetails(){
    try {
      const result: any = await this.distribustionSer.singleDistibutionChannel(this.distributionId);
    if (result.status === '1') {
      this.channel.patchValue(result.data);
    }
    } catch (error) {
      console.log(error)
    }
  }



  async submitData(){
    try {
      this.isSubmitted = true
      if(this.channel.invalid)
      return
      const result:any = await this.distribustionSer.updateDistibutionChannel(this.channel.value);
      console.log(result)
      if(result.status === '1'){
        alert(result.message);
        this.router.navigate(['/settings/distribution-channel-list'])
        return;
      }
      if(result.status === '0')
        return alert(result.message)
    } catch (error) {
      console.log(error)
  
    }
  }
  
}
