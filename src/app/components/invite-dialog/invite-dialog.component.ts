import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreateMemberDTO } from '../../dto/create-member.dto';
import { DropdownDTO } from '../../dto/dropdown.dto';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css'],
})
export class InviteDialogComponent implements OnInit {
  private createMember: CreateMemberDTO = { name: null, email: null, role: "MEMBER" };
  private teamId: number;
  private roles: DropdownDTO[];
  private validationError: string;
  private serverError: string;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private readonly teamService: TeamService
  ) {
  }

  ngOnInit() {
    this.teamId = this.config.data.teamId;
    this.setStaticRoles();
  }
  setStaticRoles() {
    this.roles = [
      {
        name: "Team owner",
        code: "OWNER"
      },
      {
        name: "Administrator",
        code: "ADMIN"
      },
      {
        name: "Member",
        code: "MEMBER"
      },

    ]
  }

  private addMember(): void {
    if(this.isValid()){
      this.teamService.addMember(this.teamId, this.createMember.email, this.createMember.name,
        this.createMember.role).subscribe(
          () => { this.closeDialog(true) },
          err => {
            this.closeDialog(false);
          });
    }
  }

  private closeDialog(successFlag: boolean) {
    this.ref.close(successFlag);
  }

  private isValid(): boolean{
    if(!this.createMember.email){
      this.validationError = "Email is required"
      return false;
    }
    return true;
  }
}

