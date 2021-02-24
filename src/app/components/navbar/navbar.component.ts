import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../services';
import { ROUTES } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  private userName: string;
  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    if (localStorage.getItem('id') && localStorage.getItem('id')!= undefined) {
      const userId: number = JSON.parse(localStorage.getItem('id'));
      this.userService.getUserProfile(userId).subscribe(userDetails => {
        if (!userDetails) {
          console.log('user details not found!');
        }
        else {
          this.userName = userDetails.name ? userDetails.name : 'unknown';
        }
      });
    }
    else {
      console.log('Unable to find user')
    }
    
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
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
