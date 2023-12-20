import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  SelectedName: any = 'Master';
  subFolderName: any = 'Product';
  @Output() isShowNav = new EventEmitter<any>();
  isFullScreen:any = false
  constructor(
    private router: Router
  ) {
    if (localStorage.getItem('selectedName')) {
      this.SelectedName = localStorage.getItem('selectedName')
    }
    if (localStorage.getItem('subFolderName')) {
      this.subFolderName = localStorage.getItem('subFolderName')
    }

  }

  ngOnInit(): void {
    let arrow: any = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e: any) => {
        let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
        arrowParent.classList.toggle("showMenu");
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

  logout() {
    localStorage.clear();
    this.isShowNav.emit(false)
    this.router.navigate(['/'])
  }
}
