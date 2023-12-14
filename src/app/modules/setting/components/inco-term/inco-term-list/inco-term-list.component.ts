import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncTermService } from '../../../Services/inc-term/inc-term.service';

@Component({
  selector: 'app-inco-term-list',
  templateUrl: './inco-term-list.component.html',
  styleUrls: ['./inco-term-list.component.css']
})
export class IncoTermListComponent implements OnInit {

  incTermDetail: any = []

  constructor(
    private router: Router,
    private incTermSer: IncTermService
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllDetails()
  }

  async getAllDetails() {
    try {
      const result: any = await this.incTermSer.getAllIncTermsDetails()
      console.log(result);
      if (result.status === '1') {
        this.incTermDetail = result.data
      }
    } catch (error) {
      console.error(error);

    }
  }

}
