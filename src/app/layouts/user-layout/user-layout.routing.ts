import { Routes } from '@angular/router';
import { GeolocationComponent } from 'src/app/pages/geolocation/geolocation.component';
import { AllTeamsComponent } from '../../pages/all-teams/all-teams.component';
import { UsersComponent } from '../../pages/all-users/users.component';
import { ChangePasswordComponent } from '../../pages/changepassword/changepassword.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { PeekUserComponent } from '../../pages/peek-user/peek-user.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TeamDetailsComponent } from '../../pages/team-details/team-details.component';
import { TeamsComponent } from '../../pages/teams/teams.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';


export const UserLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:userId', component: PeekUserComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'password-settings', component: ChangePasswordComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:role/:teamId', component: TeamDetailsComponent },
  { path: 'all-teams', component: AllTeamsComponent },
  { path: 'user-location', component: GeolocationComponent },
  
];
