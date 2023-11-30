import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoTypeService } from '../../../Services/po-type.service';

@Component({
  selector: 'app-po-type-list',
  templateUrl: './po-type-list.component.html',
  styleUrls: ['./po-type-list.component.css']
})
export class PoTypeListComponent implements OnInit{
  potypeDetail:any=[]
  constructor(
    private router: Router,
    private poTypeSer: PoTypeService
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllPoTypeDetails()
  }



  checks = false;
  selectAll(e: any) {
    if (e.target.checked == true) {
      this.checks = true;
    } else {
      this.checks = false
    }
  }

  //get data into list
  async getAllPoTypeDetails() {
    try {
      const result: any = await this.poTypeSer.getAllPoType();
      console.log(result);
      if (result.status === '1') {
        this.potypeDetail = result.data
      }
    } catch (error) {
      console.error(error);

    }
  }


}
