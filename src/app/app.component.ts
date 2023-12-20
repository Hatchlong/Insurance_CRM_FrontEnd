import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ERP_FrontEnd_code';
  isShow:any = false;

  constructor(){
  
  }

  ngOnInit(): void {
    const isShowNav = localStorage.getItem('loginActive');
   if(isShowNav === 'true'){
    this.isShow = true
   }else{
    this.isShow = false
   } 
  }
}
