import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeOfTransportService } from '../../../Services/mode-of-transport/mode-of-transport.service';

@Component({
  selector: 'app-mode-of-transport-list',
  templateUrl: './mode-of-transport-list.component.html',
  styleUrls: ['./mode-of-transport-list.component.css']
})
export class ModeOfTransportListComponent implements OnInit {

  modeOfDetails: any = []
  constructor(
    private router: Router,
    private motSer: ModeOfTransportService
  ) { }
  
  ngOnInit(): void {
    this.getMotDetails()
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  // get all details of mode of transport

  async getMotDetails() {
    try {
      const result: any = await this.motSer.getAllModeOfTransportDetails()
      console.log(result);
      if (result.status === '1') {
        this.modeOfDetails = result.data
      }
    } catch (error) {
      console.error(error);
    }

  }
}
