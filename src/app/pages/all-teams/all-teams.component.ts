import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SudoService } from 'src/app/services/sudo.service';
import { DropdownDTO } from '../../dto/dropdown.dto';
import { GroupDTO } from '../../dto/group.dto';
import { AuthenticationService, UserService } from '../../services';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.css']
})
export class AllTeamsComponent implements OnInit {

  teams: GroupDTO[];
  error: string;
  userRoles: DropdownDTO[];
  genders: DropdownDTO[];
  parentTeamOptions: DropdownDTO[];
  selectedParent: DropdownDTO = {name: "None", code: null};
  createTeamName: string;
  displayError: boolean = false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly teamService: TeamService,
    private readonly sudoService: SudoService,
    private readonly router: Router
  ) {

  }

  ngOnInit() {
    this.getAllTeams();
  }

  private editTeam(teamId: number): void {
    const index: number = this.teams.findIndex(team => team.id == teamId);
    this.teams[index].updatable = true;
  }

  private updateTeam(team: GroupDTO): void {
    this.teamService.updateTeam(team.id, team.name).subscribe((teamDetails) => {
      this.getAllTeams();
    },
    error => {
      this.displayError = true;
      this.error = "Could not update team"
    });
  }

  private closeEditTeam(teamId: number): void {
    const index: number = this.teams.findIndex(team => team.id == teamId);
    this.teams[index].updatable = false;
    this.getAllTeams();
  }

  private getAllTeams(): void {
    this.sudoService.getAllAvailableTeams().subscribe((teamInformation: any[]) => {
      this.teams = [];
      this.parentTeamOptions = [{name: "None", code: null}];
      if (teamInformation && teamInformation.length > 0) {
        teamInformation.forEach((team) => {
          const membershipObject: GroupDTO = {
            id: team.id,
            name: team.name,
            parentTeam: team.parent?.name ?? null,
            groupPictureUrl: team.groupPictureUrl,
            createdOn: this.dateToString(team.createdAt),
            isDefault: team.isDefault
          }
          this.teams.push(membershipObject);
          this.parentTeamOptions.push({name: team.name, code: (team.id).toString()})
        })
      }
      this.teams = this.sortTeams(this.teams);
      console.log(this.teams);
    })
  }

  private teamDetails(teamId: number): void {
    this.router.navigate([`/admin/teams/SUDO/${teamId}`]);
  }
  
  private teamRoleDetails(teamId: number): void {
    this.router.navigate([`/admin/team-roles/${teamId}`]);
  }

  private deleteTeam(teamId: number): void {
    this.teamService.deleteTeam(teamId).subscribe(() => {
      this.getAllTeams();
    })
  }

  private createTeam(): void {
    if (!this.createTeamName) {
      this.error = "Team name is required";
      return;
    }
    this.error = null;
    const parentId: number = this.selectedParent.code ? +this.selectedParent.code : null;
    this.teamService.createTeam(this.createTeamName, parentId).subscribe((teamDetails) => {
      this.getAllTeams();
    },
    error => {
      this.displayError = true;
      this.error = "Could not add team"
    });
    this.authenticationService.refreshAccessToken().subscribe((data) => {
      console.log(data);
      //history.go(0);
    });
  }

  private sortTeams(teams: GroupDTO[]): GroupDTO[]{
    return teams.sort((team1: GroupDTO, team2: GroupDTO) => {
      if(team1.isDefault && !team2.isDefault) return -1;
      else if(team1.isDefault == team2.isDefault){
        if(team1.createdOn < team2.createdOn) return 1;
        return -1;
      }
      return 1;
    })
  }

  dateToString(dateObj: string): string {
    var dateString: string;
    var date: string = dateObj.split('T')[0];
    var time: string = dateObj.split('T')[1];
    time = time.split('.')[0];
    dateString = date + '  ' + time + '  UTC'
    return dateString;
  }
}

