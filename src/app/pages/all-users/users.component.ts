import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownDTO } from '../../dto/dropdown.dto';
import { DisplayUserDTO, UpdateUserDTO } from '../../dto/user.dto';
import { AuthenticationService, UserService } from '../../services';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: DisplayUserDTO[];
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
    this.getAllUsers();
    this.setStaticRoles();
    this.setStaticGenders();
  }

  setStaticRoles() {
    this.userRoles = [
      {
        name: "Super Domain",
        code: "SUDO"
      },
      {
        name: "User",
        code: "USER"
      },
    ]
  }

  setStaticGenders() {
    this.genders = [
      {
        name: "Male",
        code: "MALE"
      },
      {
        name: "Female",
        code: "FEMALE"
      },
      {
        name: "Non-binary",
        code: "NON BINARY"
      },
      {
        name: "Prefer Not to say",
        code: "UNKNOWN"
      },
    ]
  }

  editUser(userId: number): void {
    const index: number = this.users.findIndex(user => user.id == userId);
    this.users[index].updatable = true;
  }

  updateUser(user: DisplayUserDTO): void {
    const updateUserObject: UpdateUserDTO = {
      name: user.name,
      role: user.role,
      gender: user.gender
    }
    this.userService.updateUser(user.id, updateUserObject).subscribe((userDetails) => {
      console.log(userDetails);
      this.getAllUsers();
    });
  }

  closeEditUser(userId: number): void {
    const index: number = this.users.findIndex(user => user.id == userId);
    this.users[index].updatable = false;
    this.getAllUsers();
  }

  getAllUsers(): void {

    this.userService.getUsers().subscribe((UserInformation: any[]) => {
      console.log(UserInformation);
      if (UserInformation && UserInformation.length > 0) {
        this.users = [];
        UserInformation.forEach((user) => {
          const userObject: DisplayUserDTO = {
            id: user.id,
            name: user.name,
            profilePictureUrl: user.profilePictureUrl,
            contactNo: user.twoFactorPhone,
            gender: user.gender,
            role: user.role,
            status: user.active == true ? 'Active' : 'Inactive',
            createdOn: this.dateToString(user.createdAt),
            updatable: false
          }
          this.users.push(userObject);
        })
      }
      console.log(this.users);
    })
  }

  userDetails(userId: number): void {
    console.log(userId);
    this.router.navigate([`/admin/users/${userId}`]);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe((user) => {
      console.log(user);
      this.getAllUsers();
    });
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

