import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistibutionChannelService } from '../../../Services/distibution-channel/distibution-channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-distribution-channel',
  templateUrl: './add-distribution-channel.component.html',
  styleUrls: ['./add-distribution-channel.component.css']
})
export class AddDistributionChannelComponent implements OnInit {


  channel: any = FormGroup
  isSubmitted: any = false
  constructor(private fb: FormBuilder,
    private distribustionSer: DistibutionChannelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.channeldata()
  }

  channeldata() {
    this.channel = this.fb.group({
      distributionChannel: ['', Validators.required],
      distributionDescription: ['', Validators.required]
    });
    console.warn(this.channel.value)

  }



  async submitData() {
    try {
      this.isSubmitted = true
      if (this.channel.invalid)
        return
      const result: any = await this.distribustionSer.createDistibutionChannelDetails(this.channel.value);
      console.log(result)
      if (result.status === '1') {
        alert(result.message);
        this.router.navigate(['/settings/distribution-channel-list'])
        return;
      }
      if (result.status === '0')
        return alert(result.message)
    } catch (error) {
      console.log(error)

    }
  }

}
