import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { UserDTO } from '../../dto/user.dto';
import { UserService } from '../../services';

interface GenderDTO {
  label: string,
  type: string
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: UserDTO;
  editable: boolean = false;
  hasEmailReadPermission: boolean = false;
  hasProfileWritePermission: boolean = false;
  hasEmailWritePermission: boolean = false;
  genders: GenderDTO[] = [
    { label: 'Male', type: 'MALE' },
    { label: 'Female', type: 'FEMALE' },
    { label: 'Transgender', type: 'NON BINARY' },
    { label: 'Prefer Not to say', type: 'UNKNOWN' },
  ];

  constructor(
    private userService: UserService,
    private permissionService: PermissionService
  ) { }

  async ngOnInit() {
    this.checkPermissions();
    await this.getUserProfile();
    await this.getUserEmailId();
  }

  private async getUserEmailId() {
    if(this.permissionService.checkPermission("Read user email")) {
      const emailData: { email: string }[] = await this.userService.getuserEmailId().toPromise();
      if (emailData.length > 0) {
        this.user.email = emailData[0].email;
      }
      else {
        console.error('No emails found');
      }
    }
    else {

    }
  }

  private async getUserProfile() {
    const userDetails = await this.userService.getUserProfile().toPromise();
    console.log(userDetails);
    if (!userDetails) {
      console.log('user details not found!');
    }
    else {
      this.user = {
        name: userDetails.name,
        email: null,
        role: userDetails.role,
        gender: userDetails.gender,
        mfaMethod: userDetails.twoFactorMethod,
        contactNo: userDetails.twoFactorPhone,
        country: userDetails.countryCode,
        isDetectLocationOnLogin: userDetails.checkLocationOnLogin,
        isMFA: userDetails.twoFactorMethod == 'NONE' ? false : true,
        isNotifications: userDetails.notificationEmail == 'NONE' ? false : true,
        ispasswordLess: false
      }
    }
  }

  private async stopEditing() {
    await this.getUserProfile();
    await this.getUserEmailId();
    this.editable = false;
  }

  private updateUser() {
    this.userService.updateUserProfile(this.user).subscribe(
      () => {
        this.editable = false;
      },
      error => {
        console.error(error);
      }
    )
  }

  private checkPermissions(){
    this.hasEmailReadPermission = this.permissionService.checkPermission("Read user email");
    this.hasProfileWritePermission = this.permissionService.checkPermission("Write user details");
  }
}
