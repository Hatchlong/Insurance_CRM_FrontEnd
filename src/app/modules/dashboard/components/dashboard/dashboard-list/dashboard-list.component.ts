import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent {
  isShowPadding: any = false


  handleSideBar(event: any) {
    this.isShowPadding = event
  }
}
