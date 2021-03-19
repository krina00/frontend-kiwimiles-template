import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/roles.service';
@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  private roleId: number;
  private roleName: string;
  private selectAll: boolean = false;
  private isGrantAllPermissions: boolean = false;
  private scopes: {id: number, name: string, privileges: string, isGiven: boolean}[];
  private permittedScopes: {id: number, name: string, privileges: string, isGiven: boolean}[];
  
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService
  ) {

    this.activatedRoute.params.subscribe((params:{roleId:string}) => {
      this.roleId = +params.roleId;
      this.roleService.getRoleDetails(this.roleId).subscribe((role: { name: string }) => {
        this.roleName = role.name;
      })
    })

   }

  async ngOnInit(): Promise<void> {
    await this.getScopes();
  }

  private async getScopes(): Promise<void> {
    const scopeInformation: {id: number, name: string, privileges: string}[] = await this.roleService.getAllScopes().toPromise();
    if (scopeInformation && scopeInformation.length > 0) {
      this.scopes = [];
      scopeInformation.forEach((scope) => {
        this.scopes.push({id: scope.id, name: scope.name, privileges: scope.privileges, isGiven: false});
      });
    }
    const allotedScopes: {id: number, name: string, privileges: string}[] = await this.roleService.getRoleScopes(this.roleId).toPromise();
    console.log(allotedScopes);
    if(allotedScopes && allotedScopes.length > 0 ) {
      allotedScopes.forEach((allotedScope) => {
        const index: number = this.scopes.findIndex(scope => scope.id == allotedScope?.id);
        if(index > -1){
          this.scopes[index].isGiven = true;
        }
      }); 
    }
    this.permittedScopes = this.scopes.filter(scope => scope.isGiven);
  }

  private updateRoleScopes(): void {
    const scopes: {name: string}[] = this.scopes.map((scope) => {
      if(scope.isGiven) { return {name: scope.name}; }
    }).filter(value=> value);

    this.roleService.updateRoleScopes(this.roleId, scopes).subscribe(async ()=>{
      await this.getScopes();
    },
    error => {
      console.log(error);
    })
  }

  private selectAllPermissions() {
    if(this.isGrantAllPermissions) this.scopes.forEach(scope => scope.isGiven = true); 
    else this.scopes.forEach(scope => scope.isGiven = false);
  }
}
