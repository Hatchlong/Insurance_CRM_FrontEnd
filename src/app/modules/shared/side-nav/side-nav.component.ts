import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  SelectedName:any = 'Master';
  subFolderName:any = 'Product'
  constructor(
    private router:Router
  ) {

  }

  ngOnInit(): void {
    let arrow:any = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e:any)=>{
     let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
     arrowParent.classList.toggle("showMenu");
      });
    }
    
  }


  nextPage(url:any, data:any){
    this.SelectedName = data.name;
    this.subFolderName = data.main
    this.router.navigate([`${url}`])
  }

  closeNav(){
    
    let sidebar:any = document.querySelector(".sidebar");
    let sidebarBtn:any = document.querySelector(".bx-menu");
    console.log(sidebar && sidebar.classList.contains('close'));
    if (sidebar && sidebar.classList.contains('close')) {
      sidebar.classList.remove('close');
    } else {
      // sidebarBtn.addEventListener("click", ()=>{
        sidebar.classList.toggle("close");
      // });
    }
  
  }
}
