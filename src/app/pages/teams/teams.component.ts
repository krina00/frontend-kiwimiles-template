import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipDTO } from '../../dto/membership.dto';
import { AuthenticationService, UserService } from '../../services';
import { PermissionService } from '../../services/permission.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  private userName: string;
  memberships: MembershipDTO[];
  createTeamName: string;
  error: string;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    private readonly teamService: TeamService,
    private readonly permissionService: PermissionService,
    private readonly router: Router,
  ) {
    this.userService.getUserProfile().subscribe((user) => {
      this.userName = user.name;
    },
      (error) => {
        console.error("Failed to get user profile");
      }
    );
  }

  ngOnInit() {
    this.getAllMemberships();
  }

  private hasPermission(role: string, operation: string): boolean {
    return this.permissionService.hasPermission(role, operation);
  }

  private createTeam(): void {
    if (!this.createTeamName) {
      this.error = "team name is required";
      return;
    }
    this.error = null;
    this.teamService.createTeam(this.createTeamName).subscribe((teamDetails) => {
      console.log(teamDetails);
      this.getAllMemberships();
    });
    this.authenticationService.refreshAccessToken().subscribe((data) => {
      console.log(data);
      history.go(0);
    });
  }

  private editTeam(teamId: number): void {
    const index: number = this.memberships.findIndex(membership => membership.group.id == teamId);
    this.memberships[index].group.updatable = true;
  }

  private updateTeam(teamId: number): void {
    const index: number = this.memberships.findIndex(membership => membership.group.id == teamId);
    this.teamService.updateTeam(teamId, this.memberships[index].group.name).subscribe((teamDetails) => {
      console.log(teamDetails);
      this.getAllMemberships();
    });
  }

  private closeEditTeam(teamId: number): void {
    const index: number = this.memberships.findIndex(membership => membership.group.id == teamId);
    this.memberships[index].group.updatable = false;
    this.getAllMemberships();
  }

  private getAllMemberships(): void {

    this.teamService.getAllMemberships().subscribe((membershipInformation: any[]) => {
      console.log(membershipInformation);
      this.memberships = [];
      if (membershipInformation && membershipInformation.length > 0) {
        membershipInformation.forEach((membership) => {
          const membershipObject: MembershipDTO = {
            group: {
              id: membership?.group?.id,
              name: membership?.group?.name,
              groupPictureUrl: membership?.group?.profilePictureUrl
            },
            role: membership.role ?? null,
            since: this.dateToString(membership.createdAt)
          }
          this.memberships.push(membershipObject);
        })
      }
      console.log(this.memberships);
    })
  }

  private teamDetails(teamId: number, role: string): void {
    console.log(teamId);
    this.router.navigate([`/admin/teams/${role}/${teamId}`]);
  }

  private deleteTeam(teamId: number): void {
    this.teamService.deleteTeam(teamId).subscribe((teamDetails) => {
      console.log(teamDetails);
      this.getAllMemberships();
    });
  }

  private dateToString(dateObj: string): string {
    var dateString: string;
    var date: string = dateObj.split('T')[0];
    var time: string = dateObj.split('T')[1];
    time = time.split('.')[0];
    dateString = date + '  ' + time + '  UTC'
    return dateString;
  }
}

