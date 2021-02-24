import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    private readonly teamService: TeamService,
    private readonly router: Router,
  ) {

  }

  ngOnInit() {
    this.getAllTeams();
  }


  editTeam(teamId: number): void {
    const index: number = this.teams.findIndex(team => team.id == teamId);
    this.teams[index].updatable = true;
  }

  updateTeam(team: GroupDTO): void {
    this.teamService.updateTeam(team.id, team.name).subscribe((teamDetails) => {
      console.log(teamDetails);
      this.getAllTeams();
    });
  }

  closeEditTeam(teamId: number): void {
    const index: number = this.teams.findIndex(team => team.id == teamId);
    this.teams[index].updatable = false;
    this.getAllTeams();
  }

  getAllTeams(): void {
    this.teamService.getAllAvailableTeams().subscribe((teamInformation: any[]) => {
      console.log(teamInformation);
      if (teamInformation && teamInformation.length > 0) {
        this.teams = [];
        teamInformation.forEach((team) => {
          const membershipObject: GroupDTO = {
            id: team.id,
            name: team.name,
            groupPictureUrl: team.groupPictureUrl,
            createdOn: this.dateToString(team.createdAt)
          }
          this.teams.push(membershipObject);
        })
      }
      console.log(this.teams);
    })
  }

  teamDetails(teamId: number): void {
    console.log(teamId);
    this.router.navigate([`/admin/teams/SUDO/${teamId}`]);
  }

  deleteTeam(teamId: number): void {
    this.teamService.deleteTeam(teamId).subscribe(() => {
      this.getAllTeams();
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

