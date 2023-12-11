import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-distribution-channel',
  templateUrl: './add-distribution-channel.component.html',
  styleUrls: ['./add-distribution-channel.component.css']
})
export class AddDistributionChannelComponent implements OnInit{

  
  channel:any=FormGroup
  isSubmitted:any=false
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
      this.channeldata()
  }

  channeldata(){
    this.channel=this.fb.group({
      distributionChannel:['',Validators.required],
      description:['',Validators.required]
    })
  }
  addChannel(){
    console.log(this.channel);
    
  }
}
