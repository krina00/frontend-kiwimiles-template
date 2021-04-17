import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../dto/user.dto';
import { ActivatedRoute } from '@angular/router';
import { SudoService } from 'src/app/services/sudo.service';

@Component({
  selector: 'app-peek-user',
  templateUrl: './peek-user.component.html',
  styleUrls: ['./peek-user.component.scss']
})
export class PeekUserComponent implements OnInit {

  userId: number;
  user: UserDTO;

  constructor(
    private readonly sudoService: SudoService,
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
      const emailData: { email: string }[] = await this.sudoService.getuserEmailId(this.userId).toPromise();
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
    const userDetails = await this.sudoService.getUserProfile(this.userId).toPromise();
    if (!userDetails) {
      console.log('user details not found!');
    }
    else {
      this.user = {
        name: userDetails.name,
        email: null,
        profilePictureUrl: userDetails.profilePictureUrl,
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
