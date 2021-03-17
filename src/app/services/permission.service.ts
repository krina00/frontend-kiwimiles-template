import { Injectable } from '@angular/core';
import { ADMIN, OWNER, MEMBER} from '../constants/permissions.constant';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService {
  
  private permissions: string[];

  hasPermission(role: string, operation: string): boolean {
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

  setPermissions(permissions: string[]): void {
    this.permissions = permissions;
  }

  getPermissions(): string[] {
    return this.permissions;
  }

}
