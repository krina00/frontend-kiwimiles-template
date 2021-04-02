import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleDTO } from 'src/app/dto/role.dto';
import { UserService } from 'src/app/services';
import { RoleService } from 'src/app/services/roles.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.css']
})
export class AllRolesComponent implements OnInit {

  private createRoleName: string;
  private roles: RoleDTO[];
  private error: string;
  displayError: boolean = false;

  constructor(
    private readonly roleService: RoleService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  private async getAllRoles(): Promise<void> {
    const roleInformation: any[] = await this.roleService.getAllRoles().toPromise();
    this.roles = [];
    if (roleInformation && roleInformation.length > 0) {
      roleInformation.forEach((role) => {
        const roleObject: RoleDTO = { 
          id: role.id,
          name: role.name, 
          isUpdatable: true,
          isAllocated: false,
          isDefault: role.isDefault
        }
        this.roles.push(roleObject);
      });
      this.roles = this.sortRoles(this.roles);
    } 
  }

  private getAllPermissions(roleId: number): void {
    this.router.navigate([`/admin/roles/${roleId}`])
  }

  private addRole(): void {
    if (!this.createRoleName) {
      this.error = "Role name is required";
      return;
    }
    this.error = null;
    this.roleService.addRole({name: this.createRoleName}).subscribe(()=>{
      this.getAllRoles();
    },
    error => {
      this.displayError = true;
      this.error = "Could not add role"
    });
  }

  private deleteRole(roleId: number): void {
    this.roleService.deleteRole(roleId).subscribe(()=>{
      this.getAllRoles();
    },
    error => {
      this.displayError = true;
      this.error = "Could not delete role"
    });
  }

  private sortRoles(roles: RoleDTO[]): RoleDTO[]{
    return roles.sort((role1: RoleDTO, role2: RoleDTO) => {
      if(role1.isDefault && !role2.isDefault) return -1;
      return 1;
    })
  }
}
