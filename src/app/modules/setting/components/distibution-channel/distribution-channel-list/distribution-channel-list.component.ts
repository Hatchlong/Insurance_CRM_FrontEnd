import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DistibutionChannelService } from '../../../Services/distibution-channel/distibution-channel.service';

@Component({
  selector: 'app-distribution-channel-list',
  templateUrl: './distribution-channel-list.component.html',
  styleUrls: ['./distribution-channel-list.component.css']
})
export class DistributionChannelListComponent {
  distributionDetails:any = []
  constructor(
    private router:Router,
    private distributionSer: DistibutionChannelService
  ){

  }

  
  ngOnInit(): void {
    this.getAllDistributionDetails()
  }

  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  async getAllDistributionDetails(){
    try {
      const result:any = await this.distributionSer.getAllDistibutionChannelDetails();
      console.log(result)
      if(result.status === '1'){
        this.distributionDetails = result.data;
      }
    } catch (error) {
      console.log(error);
    }
  }


  // select all operation 

  // const selectAllCheck:any=document.getElementById('selectAll');
  // const checkboxes:any = document.querySelectorAll('.checkbox');

//   checkboxes.forEach(checkbox => {
//     checkbox.addEventListener('change', function () {
//         selectAllCheck.checked = [...checkboxes].every(checkbox => checkbox.checked);
//     })
// })
  
}
