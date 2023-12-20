import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ERP_FrontEnd_code';
  isShow:any = false;

  constructor(
    private router:Router
  ){
  
  }

  ngOnInit(): void {
    const isShowNav = localStorage.getItem('loginActive');
    console.log(isShowNav, 'jhhhh')
    if(!isShowNav){
      this.router.navigate(['/'])
    }
   if(isShowNav === 'true'){
    this.isShow = true
   }else{
    this.isShow = false
   } 
  }
}
