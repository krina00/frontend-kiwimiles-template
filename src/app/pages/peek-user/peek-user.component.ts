import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../dto/user.dto';
import { UserService } from '../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-peek-user',
  templateUrl: './peek-user.component.html',
  styleUrls: ['./peek-user.component.scss']
})
export class PeekUserComponent implements OnInit {

  userId: number;
  user: UserDTO;

  constructor(
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((data: { userId: number }) => {
      this.userId = data.userId;
    })
  }

  async ngOnInit() {
    await this.getUserProfile();
    await this.getUserEmailId();
  }

  async getUserEmailId() {
    if (this.userId) {
      const emailData: { email: string }[] = await this.userService.getuserEmailId(this.userId).toPromise();
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
    const userDetails = await this.userService.getUserProfile(this.userId).toPromise();
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
}
