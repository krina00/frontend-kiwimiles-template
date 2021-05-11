import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { AuthenticationService, UserService } from '../../services';
import { USER_ROUTES } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  private userName: string = 'unknown';
  private userProfilePicture: string = 'assets/img/theme/default-profile-icon.png'; 
  constructor(
    location: Location,
    private element: ElementRef,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,
    private readonly permissionService: PermissionService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = USER_ROUTES.filter(listTitle => listTitle);
    if(this.permissionService.checkPermission("Read user details")) {
      this.userService.getUserProfile().subscribe(userDetails => {
        if (!userDetails) {
          console.log('user details not found!');
        }
        else {
          this.userName = userDetails.name ? userDetails.name : 'unknown';
          this.userProfilePicture = userDetails.profilePictureUrl
        }
      });
    }
  }

  checkPermissions(operation: string) {
    return this.permissionService.checkPermission(operation);
  }

  getTitle() {
    var title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === title) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  async logout() {
    await this.authenticationService.logout().toPromise();
    this.router.navigate(['/login']);
  }
}
