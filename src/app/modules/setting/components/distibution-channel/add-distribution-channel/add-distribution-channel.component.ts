import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-distribution-channel',
  templateUrl: './add-distribution-channel.component.html',
  styleUrls: ['./add-distribution-channel.component.css']
})
export class AddDistributionChannelComponent implements OnInit{

  
  channel:any=FormGroup
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
      this.channeldata()
  }

  channeldata(){
    this.channel=this.fb.group({
      distributionChannel:'',
      description:''
    })
  }
  addChannel(){
    console.log(this.channel);
    
  }
}
