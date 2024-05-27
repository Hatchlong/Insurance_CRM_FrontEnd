import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, AfterViewInit {
  SelectedName: any = 'Dashboard';
  subFolderName: any = 'Dashboard';
  @Output() isShowNav = new EventEmitter<any>();
  perviousParent: any = ''
  isFullScreen: any = false;
  userName: any = '';
  inactivityTimeout: any = 15000;
  inactivityTimer: any;
  @Input() logoutAction: any = ''
  isShowMenu: any = true;
  isShowForgot: any = false;
  isShowClear: any = false;
  isShowProfile: any = false;
  companyDetail: any = []
  companyCode: any = FormGroup
  companyCodeId: any = ''
  screenLevelDetails: any = []
  sampleOpen: any = [];
  isMenu: any = false;
  roleDetails: any = [];
  roleId: any = '';
  loginDetail: any = [];
  employeeName: any = ''
  filePath: any = ''
  isImageShow: any = false;
  imageSrc: any = '';
  baseUrl: any = 'http://localhost:4000/'
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authrSer: AuthrService,
    private activateRouter: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    if (localStorage.getItem('selectedName')) {
      this.SelectedName = localStorage.getItem('selectedName')
    }
    if (localStorage.getItem('subFolderName')) {
      this.subFolderName = localStorage.getItem('subFolderName')
      this.sampleOpen = localStorage.getItem('subFolderName');

    }

    this.userName = localStorage.getItem('userName');
    this.employeeName = localStorage.getItem('employeeName')
    this.filePath = localStorage.getItem('filePath')
    this.roleId = localStorage.getItem('roleId');

    if (!this.userName) {
      // this.router.navigate(['/authr/login'])

    }
    this.getFilePathFromLocalStorage()

  }

  getFilePathFromLocalStorage(): string | null {
    if (this.filePath) {
      return this.baseUrl + this.filePath;
    }
    return null;
  }



  ngOnInit(): void {
    this.companyCodeId = this.activateRouter.snapshot.paramMap.get('id');
    var rolesDetails: any = localStorage.getItem('roles');
    // console.log(rolesDetails,'[[[[[');
    
    rolesDetails = JSON.parse(rolesDetails);
    if (!rolesDetails) {
      this.getAllRolesScreenLevel()
    } else {
      if (rolesDetails.length === 0) {
        this.getAllRolesScreenLevel()
      }
      this.roleDetails = rolesDetails;
    }

    var screenLevelList: any = localStorage.getItem('screenLevel');
    screenLevelList = JSON.parse(screenLevelList);
    if (screenLevelList) {
      this.screenLevelDetails = screenLevelList;
    }
    // this.getAllCompanyCodeDetail()
    // this.getSingleCompanyCodeDetails()
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


  ngAfterViewInit(): void {
    if (this.screenLevelDetails.length !== 0) {
      this.screenLevelDetails.map((el: any) => {
        el.subMenu.map((ele: any) => {
          ele.visible = false
        })
      })
      this.screenLevelDetails.map((el: any) => {
        el.subMenu.map((ele: any) => {
          const visibleDetails = this.updateVisibleValue(ele.subMenuName);
          if (visibleDetails === true) {
            el.visible = true
            ele.visible = true
            this.cd.detectChanges()
          }
        })
      })
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
      this.isMenu = true
    } else {
      // sidebarBtn.addEventListener("click", ()=>{
      sidebar.classList.toggle("close");
      this.isMenu = false
      // });
    }

  }

  async logout() {
    try {
      const userName = localStorage.getItem('userName')
      const result: any = await this.authrSer.logoutUser({ userName: userName })
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

  async getScreenLevelDetails() {
    try {
      const result: any = await this.authrSer.getScreenDetails()
      if (result.status === '1') {
        // console.log(result.data, 'jjjj')
        this.screenLevelDetails = result.data
        const screenLevelList = JSON.stringify(result.data)
        localStorage.setItem('screenLevel', screenLevelList)
        this.screenLevelDetails.map((el: any) => {
          el.subMenu.map((ele: any) => {
            ele.visible = false
          })
        })
        this.screenLevelDetails.map((el: any) => {
          el.subMenu.map((ele: any) => {
            const visibleDetails = this.updateVisibleValue(ele.subMenuName);
            if (visibleDetails === true) {
              el.visible = true
              ele.visible = true
              this.cd.detectChanges()
            }
          })
        })
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      // this.isLoader = false
      console.log(error);
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  updateVisibleValue(name: any) {

    const findScreenDetails: any = this.roleDetails.find((el: any) => el.roleId === this.roleId);
    // console.log(findScreenDetails);
    
    const findScreen = findScreenDetails.rolesAccess.find((el: any) => el.screenId === name);
    // console.log(findScreen);
    

    if (findScreen) {

      return true;
    } else {

      return false
    }
  }


  async getAllRolesScreenLevel() {
    try {
      const result: any = await this.authrSer.getUserRolesDetails()
      console.log(result);
      
      if (result.status === '1') {
        this.roleDetails = result.data;
        const rolesDetails = JSON.stringify(result.data)
        // console.log(rolesDetails,'oooooo');
        
        localStorage.setItem('roles', rolesDetails)
        this.getScreenLevelDetails()
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

  // async getAllLoginDetail(){
  //   try {
  //     const result:any=await this.authrSer.
  //   } catch (error:any) {
  //     this._snackBar.open(error.error.message, '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });
  //   }
  // }

}
