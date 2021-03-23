import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ADMIN, OWNER, MEMBER, PERMISSIONS} from '../constants/permissions.constant';
import { BaseService } from './base.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private permissions: string[];
  constructor(
    private readonly userService: UserService
  ){}
  
  hasPermission(role: string, operation: string): boolean { //obsolete
    if (role == 'SUDO') {
      return true;
    }
    else if (role == 'OWNER') {
      if (OWNER.indexOf(operation) > -1) {
        return true;
      }
    }
    else if (role == 'ADMIN') {
      if (ADMIN.indexOf(operation) > -1) {
        return true;
      }
    }
    else if (role == 'MEMBER') {
      if (MEMBER.indexOf(operation) > -1) {
        return true;
      }
    }
    return false;
  }

  checkPermission(operation: string): boolean {     //now in use
    var scope: string;
    PERMISSIONS.forEach(permission => {
      if(permission.label == operation){
        scope = permission.scope;
        return;
      }
    });
    if(!scope) throwError("scope entry is not found with availble entries");

    var permissions = sessionStorage.getItem("permissions");
    if(!permissions) return false;
    if(permissions.indexOf('*') > -1 && permissions.length == 1) return true; 
    return ((permissions.indexOf(scope)>-1) ? true : false);
  }

  setPermissions(permissions: string[]): void {
    this.permissions = permissions;
  }

  getPermissions(): string[] {
    return this.permissions;
  }

}
