import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ROWS_PER_PAGE_OPTIONS } from 'src/app/constants/pagination.constant';
import { RoleDTO } from 'src/app/dto/role.dto';
import { Sorting, SortingRuleFormat } from 'src/app/helpers/sorting';
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
  private skip: number;
  private take: number;
  private totalRecords: number;
  private numberOfRowsPerPageOptions: {rows: number}[] = ROWS_PER_PAGE_OPTIONS;
  private numberOfRowsPerPage: number = 5;

  constructor(
    private readonly roleService: RoleService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    //this.getAllRoles();
  }

  private async getAllRoles(): Promise<void> {
    const roleData: {roles: any[], length: number} = await this.roleService.getAllRoles(this.skip, this.take).toPromise();
    this.roles = [];
    const roleInformation = roleData.roles;
    this.totalRecords = roleData.length;
    if (roleInformation && roleInformation.length > 0) {
      roleInformation.forEach((role) => {
        const roleObject: RoleDTO = { 
          id: role.id,
          name: role.name, 
          isUpdatable: true,
          isAllocated: false,
          isDefault: role.isDefault,
          createdAt: role.createdAt
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

  private sortRoles(roles: RoleDTO[]): RoleDTO[] {
    const sortingRules: SortingRuleFormat[] = [
      {field: "createdAt", order: "DESC"},
      {field: "isDefault", order: "DESC"},
    ]
    return Sorting.dataSorting(roles, sortingRules);
  }

  private loadRoles(tableElement){
    this.skip = tableElement._first;
    this.take = this.numberOfRowsPerPage;
    this.getAllRoles();
  }
}
