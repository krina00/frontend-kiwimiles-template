import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleDTO } from 'src/app/dto/role.dto';
import { UserService } from 'src/app/services';
import { RoleService } from 'src/app/services/roles.service';
import { PermissionService } from '../../services/permission.service';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-team-roles',
  templateUrl: './team-roles.component.html',
  styleUrls: ['./team-roles.component.css']
})
export class TeamRolesComponent implements OnInit {

  private userId: number;
  private teamId: number;
  private userRoleInTeam: string;
  private teamName: string;
  private createMemberName: string;
  private createMemberEmail: string;
  private createMemberRole: string;
  private memberIds: number[];
  private roles: RoleDTO[];
  private givenRoles: RoleDTO[];
  private selectAll:boolean = false;
  private isAllocateAllRoles: boolean = false;

  constructor(
    private readonly teamService: TeamService,
    private readonly roleService: RoleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.activatedRoute.params.subscribe((data: { teamId: number }) => {
      this.teamId = data.teamId
    });
   }

  async ngOnInit() {
    const user: {id: number} = await this.userService.getUserProfile().toPromise();
    this.userId = user.id;
    this.teamService.getTeamDetails(this.teamId).subscribe((team: { name: string }) => {
      this.teamName = team.name;
    })
    this.getAllRoles();
  }

  private async getAllRoles(): Promise<void> {
    const roleInformation: any[] = await this.roleService.getAllRoles().toPromise();
    if (roleInformation && roleInformation.length > 0) {
      this.roles = [];
      roleInformation.forEach((role) => {
        const roleObject: RoleDTO = { 
          id: role.id,
          name: role.name, 
          isUpdatable: true,
          isAllocated: false
        }
        this.roles.push(roleObject);
      });
      const allotedRoles: any[] = await this.roleService.getTeamRoles(this.teamId).toPromise();
      if(allotedRoles && allotedRoles.length > 0 ) {
        allotedRoles.forEach((allotedRole) => {
          const index: number = this.roles.findIndex(role => role.id == allotedRole?.id);
          if(index > -1){
            this.roles[index].isAllocated = true;
          }
        });
      } 
      this.givenRoles = this.roles.filter(role => role.isAllocated);
    } 
  }

  private updateTeamRoles(): void {
    const roles: {name: string}[] = this.roles.map((role) => {
      if(role.isAllocated) { return {name: role.name}; }
    }).filter(value=> value);

    this.roleService.updateTeamRoles(this.teamId, roles).subscribe(async ()=>{
      await this.getAllRoles();
    },
    error => {
      console.log(error);
    })
  }

  private getAllPermissions(roleId: number): void{
    console.log(roleId);
    this.router.navigate([`/admin/roles/${roleId}`])
  }

  private selectAllRoles(){
    if(this.isAllocateAllRoles) this.roles.forEach(role => role.isAllocated = true); 
    else this.roles.forEach(role => role.isAllocated = false);
  }
}
