import { Component, OnInit } from '@angular/core';
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

  userId: number;
  user: UserDTO;
  editable: boolean = false;
  genders: GenderDTO[] = [
    { label: 'Male', type: 'MALE' },
    { label: 'Female', type: 'FEMALE' },
    { label: 'Transgender', type: 'NON BINARY' },
    { label: 'Prefer Not to say', type: 'UNKNOWN' },
  ];

  constructor(
    private userService: UserService
  ) {
    this.userId = +localStorage.getItem('id') ?? null;
  }

  async ngOnInit() {
    await this.getUserProfile();
    await this.getUserEmailId();
  }

  async getUserEmailId() {
    if (this.userId) {
      const emailData: {email:string}[] = await this.userService.getuserEmailId(this.userId).toPromise();
      if (emailData.length > 0) {
        this.user.email = emailData[0].email;
      }
      else {
        console.error('No emails found');
      }
    }
    else {
      console.error('user id not found');
    }
  }

  async getUserProfile() {
    if (localStorage.getItem('id') && localStorage.getItem('id') != undefined) {
      const userId: number = JSON.parse(localStorage.getItem('id'));
      const userDetails = await this.userService.getUserProfile(userId).toPromise();
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
          isMFA: userDetails.twoFactorMethod == 'NONE' ? false: true,
          isNotifications: userDetails.notificationEmail == 'NONE' ? false: true,
          ispasswordLess: false
        }
      }
    }
    else {
      console.log('Unable to find user')
    }
  }

  async stopEditing() {
    await this.getUserProfile();
    await this.getUserEmailId();
    this.editable = false;
  }

  updateUser() {
    this.userService.updateUserProfile(this.user).subscribe(
      () => {
        this.editable = false;
      },
      error => {
        console.error(error);
      }
    )
  }
}
