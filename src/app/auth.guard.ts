import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private jwtHelper: JwtHelperService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ((localStorage.getItem('token') != 'undefined') && !this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      return true;
    }
    else if ((localStorage.getItem('token') != 'undefined') && this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {

      try {
        const data: any = await this.authenticationService.refreshAccessToken().toPromise();
        if (data != 'session timed out!') {
          return true;
        }
        else {
          this.authenticationService.logout().subscribe();
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      }
      catch (error) {
        this.authenticationService.logout().subscribe();
        this.router.navigate(['/session-timeout']);
        return false;
      }
      
    } 
    // not logged in so redirect to login page with the return url
    else
    {
      this.authenticationService.logout().subscribe();
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  
}
