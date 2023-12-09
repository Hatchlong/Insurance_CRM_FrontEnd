import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inco-term-list',
  templateUrl: './inco-term-list.component.html',
  styleUrls: ['./inco-term-list.component.css']
})
export class IncoTermListComponent {
  constructor(
    private router:Router
  ){}
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }
  checks=false;
  selectAll(e:any){
    if(e.target.checked==true){
      this.checks=true;
    }else{
      this.checks=false;
    }
  }

}
