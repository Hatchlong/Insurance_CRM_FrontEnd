import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  SelectedName: any = 'Master';
  subFolderName: any = 'Agent';
  @Output() isShowNav = new EventEmitter<any>();
  perviousParent: any = ''
  isFullScreen: any = false;
  userName: any = '';
  inactivityTimeout: any = 15000;
  inactivityTimer: any;
  @Input() logoutAction: any = ''
  constructor(
    private router: Router,
  ) {
    if (localStorage.getItem('selectedName')) {
      this.SelectedName = localStorage.getItem('selectedName')
    }
    if (localStorage.getItem('subFolderName')) {
      this.subFolderName = localStorage.getItem('subFolderName')
    }

    this.userName = localStorage.getItem('userName');
    if (!this.userName) {
      // this.router.navigate(['/authr/login'])
    }
  }




  ngOnInit(): void {
    let arrow: any = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e: any) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
        if (this.perviousParent) {
          this.perviousParent.classList.remove("showMenu");
        }
        this.perviousParent = e.target.parentElement.parentElement;

      });
    }

  }





  nextPage(url: any, data: any) {
    this.SelectedName = data.name;
    this.subFolderName = data.main
    this.router.navigate([`${url}`])
    localStorage.setItem('selectedName', data.name)
    localStorage.setItem('subFolderName', data.main)

  }

  closeNav() {
    this.isFullScreen = !this.isFullScreen;
    this.isShowNav.emit(this.isFullScreen)
    let sidebar: any = document.querySelector(".sidebar");
    let sidebarBtn: any = document.querySelector(".bx-menu");
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
