import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ROWS_PER_PAGE_OPTIONS } from 'src/app/constants/pagination.constant';
import { DateFormatting } from 'src/app/helpers/date-formatting';
import { Sorting, SortingRuleFormat } from 'src/app/helpers/sorting';
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

  /* component specific variables */
  private teams: GroupDTO[];
  private userRoles: DropdownDTO[];
  private genders: DropdownDTO[];
  private parentTeamOptions: DropdownDTO[];
  private selectedParent: DropdownDTO = {name: "None", code: null};
  private createTeamName: string;
  private error: string;
  private displayError: boolean = false;

  /* pagination variables */
  private skip: number;
  private take: number;
  private totalRecords: number;
  private numberOfRowsPerPageOptions: {rows: number}[] = ROWS_PER_PAGE_OPTIONS;
  private numberOfRowsPerPage: number = 10;

  /* filtering variables */
  private where: string = null;
  private whereName: string = null;
  private whereParent: string = null;
  private nameFilterInput: string;
  private parentTeamFilterOptions: DropdownDTO[];
  private selectedParentFilter: string = 'All'
  private displayCalendar: boolean = false;
  private startDateFilterInput: string = null;
  private endDateFilterInput: string = DateFormatting.dateStringToUTC(new Date());
  private dateRange: {start: string, end: string} = null;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly teamService: TeamService,
    private readonly sudoService: SudoService,
    private readonly router: Router
  ) {

  }

  async ngOnInit() {
    await this.getAllParents();
    //this.getAllTeams();
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
    this.sudoService.getAllAvailableTeams(this.skip, this.take, this.where, this.dateRange)
    .subscribe((teamInformationData: {groups: any[], length: number}) => {
      this.teams = [];
      this.parentTeamOptions = [{name: "None", code: null}];
      const teamInformation = teamInformationData.groups;
      this.totalRecords = teamInformationData.length;
      if (teamInformation && teamInformation.length > 0) {
        teamInformation.forEach((team) => {
          const membershipObject: GroupDTO = {
            id: team.id,
            name: team.name,
            parentTeam: team.parent?.name ?? null,
            groupPictureUrl: team.groupPictureUrl,
            createdOn: DateFormatting.utcDateToString(team.createdAt),
            displayTime: DateFormatting.getLocalDateTime12H(team.createdAt),
            isDefault: team.isDefault
          }
          this.teams.push(membershipObject);
          this.parentTeamOptions.push({name: team.name, code: (team.id).toString()})
        })
      }
      this.teams = this.sortTeams(this.teams);
    })
  }

  private async getAllParents(): Promise<void> {
    const ParentInformationData: any = await this.sudoService.getAllParentTeams().toPromise();
    this.parentTeamFilterOptions = [{name: "All", code: null}];
    if(ParentInformationData && ParentInformationData.length > 0){
      ParentInformationData.forEach(parent => {
        this.parentTeamFilterOptions.push({name: parent.name, code: parent.id});
      })
    }
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
      //history.go(0);
    });
  }

  private sortTeams(teams: GroupDTO[]): GroupDTO[] {
    const sortingRules: SortingRuleFormat[] = [
      {field: "createdOn", order: "DESC"},
      {field: "isDefault", order: "DESC"},
    ]
    return Sorting.dataSorting(teams, sortingRules);
  }

  private loadTeams(tableElement) {
    this.skip = tableElement._first;
    this.take = tableElement._rows;
    this.getAllTeams();
  }

  private applyNameFilter() {
    if(this.nameFilterInput && this.nameFilterInput.length>0) {
      this.whereName = `name:contains ${this.nameFilterInput}`;
    }
    else {
      this.whereName = null;
    }
    this.getWhereQuery();
    this.getAllTeams();
  }

  private applyParentFilter() {
    if(this.selectedParentFilter){
      this.whereParent = `parentId: int(+${this.selectedParentFilter})`
    }
    else{
      this.whereParent = null;
    }
    this.getWhereQuery();
    this.getAllTeams();
  }

  private applyDateFilter() {
    if(this.startDateFilterInput && this.endDateFilterInput) {
      this.displayCalendar = false;
      this.dateRange = {
        start : this.startDateFilterInput + ':00.000Z',
        end : this.endDateFilterInput + ':00.000Z',
      }
    }
    else {
      this.dateRange = null;
    }
    this.getAllTeams();
  }

  private removeDateFilter() {
    this.startDateFilterInput = null;
    this.endDateFilterInput = DateFormatting.dateStringToUTC(new Date());
    this.displayCalendar = false;
    this.dateRange = null;
    this.getAllTeams();
  }

  private removeAllFilters() {
    this.nameFilterInput = null;
    this.selectedParentFilter = 'All';
    this.whereName = null;
    this.whereParent = null;
    this.where = null;
    this.removeDateFilter();
    this.getAllTeams();
  }

  private getWhereQuery(){
    this.where = 
      (this.whereName ? this.whereName + ',': '') + (this.whereParent ? this.whereParent: '');
  }
}

