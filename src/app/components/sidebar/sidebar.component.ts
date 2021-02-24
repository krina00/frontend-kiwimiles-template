import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const SUDO_ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/admin/users', title: 'All Users', icon: 'pi pi-users text-blue font-weight-bold', class: '' },    
  //{ path: '/admin/all-teams', title: 'All Teams', icon: 'fa fa-users text-green', class: '' },
];

export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit() {
    const userId: number = JSON.parse(localStorage.getItem('id'));
    const userDetails = await this.userService.getUserProfile(userId).toPromise();
    if (userDetails.role == 'SUDO') {
      this.menuItems = SUDO_ROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }
    else if (userDetails.role == 'USER') {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }
    
  }
}
