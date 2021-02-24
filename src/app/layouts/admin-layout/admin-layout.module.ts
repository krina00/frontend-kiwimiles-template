import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { ToastrModule } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table'
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { TablesComponent } from '../../pages/tables/tables.component';
//import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AuthLayoutModule } from '../auth-layout/auth-layout.module';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DropdownModule } from 'primeng/dropdown';
import { TeamsComponent } from '../../pages/teams/teams.component';
import { TeamDetailsComponent } from '../../pages/team-details/team-details.component';
import { BadgeModule } from 'primeng/badge';
import { InviteDialogComponent } from '../../components/invite-dialog/invite-dialog.component';
import { UsersComponent } from '../../pages/all-users/users.component';
import { PeekUserComponent } from '../../pages/peek-user/peek-user.component';
import { AllTeamsComponent } from '../../pages/all-teams/all-teams.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    AuthLayoutModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    CheckboxModule,
    DropdownModule,
    TableModule,
    BadgeModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    AllTeamsComponent,
    TeamsComponent,
    TeamDetailsComponent,
    InviteDialogComponent,
    UsersComponent,
    PeekUserComponent
    //MapsComponent
  ],
})

export class AdminLayoutModule {}
