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

  constructor(
    private readonly roleService: RoleService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  async getAllRoles(): Promise<void> {
    const roleInformation: any[] = await this.roleService.getAllRoles().toPromise();
    this.roles = [];
    if (roleInformation && roleInformation.length > 0) {
      roleInformation.forEach((role) => {
        const roleObject: RoleDTO = { 
          id: role.id,
          name: role.name, 
          isUpdatable: true,
          isAllocated: false
        }
        this.roles.push(roleObject);
      });
    } 
  }

  getAllPermissions(roleId: number): void {
    this.router.navigate([`/admin/roles/${roleId}`])
  }

  addRole(): void {
    this.roleService.addRole({name: this.createRoleName}).subscribe(()=>{
      this.getAllRoles();
    });
  }

  deleteRole(roleId: number): void {
    this.roleService.deleteRole(roleId).subscribe(()=>{
      this.getAllRoles();
    });
  }
}
