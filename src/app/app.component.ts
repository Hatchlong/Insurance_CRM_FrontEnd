import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ERP_FrontEnd_code';
  isShow:any = false;

  constructor(){
   const isShowNav = localStorage.getItem('loginActive');
   if(isShowNav === 'true'){
    this.isShow = true
   }else{
    this.isShow = false
   }
  }
}
