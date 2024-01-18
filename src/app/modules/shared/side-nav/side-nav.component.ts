import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthrService } from '../services/authr/authr.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  SelectedName: any = 'Master';
  subFolderName: any = 'Product';
  @Output() isShowNav = new EventEmitter<any>();
  perviousParent:any = ''
  isFullScreen:any = false
  constructor(
    private router: Router,
    private authrSer:AuthrService,
    private _snackBar:MatSnackBar
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
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
        if(this.perviousParent){
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

 async logout() {
   try {
   const userName = localStorage.getItem('userName')
    const result: any = await this.authrSer.logoutUser({userName: userName})
    if (result.status === '1') {
      localStorage.clear();
      this.router.navigate(['/'])
     
    } else {
      this._snackBar.open(result.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  } catch (error: any) {
    this._snackBar.open(error.error.message, '', {
      duration: 5 * 1000, horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'app-notification-error',
    });
  }
  }
}
