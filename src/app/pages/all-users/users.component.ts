import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SudoService } from 'src/app/services/sudo.service';
import { DropdownDTO } from '../../dto/dropdown.dto';
import { DisplayUserDTO, UpdateUserDTO } from '../../dto/user.dto';

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
    private readonly sudoService: SudoService,
    private readonly router: Router,
  ) {

  }

  ngOnInit() {
    this.getAllUsers();
    this.setStaticRoles();
    this.setStaticGenders();
  }

  private setStaticRoles() {
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

  private setStaticGenders() {
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

  private editUser(userId: number): void {
    const index: number = this.users.findIndex(user => user.id == userId);
    this.users[index].updatable = true;
  }

  private updateUser(user: DisplayUserDTO): void {
    const updateUserObject: UpdateUserDTO = {
      name: user.name,
      role: user.role,
      gender: user.gender
    }
    this.sudoService.updateUser(user.id, updateUserObject).subscribe((userDetails) => {
      console.log(userDetails);
      this.getAllUsers();
    });
  }

  private closeEditUser(userId: number): void {
    const index: number = this.users.findIndex(user => user.id == userId);
    this.users[index].updatable = false;
    this.getAllUsers();
  }

  private getAllUsers(): void {

    this.sudoService.getUsers().subscribe((UserInformation: any[]) => {
      console.log(UserInformation);
      this.users = [];
      if (UserInformation && UserInformation.length > 0) {
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

  private userDetails(userId: number): void {
    console.log(userId);
    this.router.navigate([`/admin/users/${userId}`]);
  }

  private deleteUser(userId: number): void {
    this.sudoService.deleteUser(userId).subscribe((user) => {
      console.log(user);
      this.getAllUsers();
    });
  }

  private dateToString(dateObj: string): string {
    var dateString: string;
    var date: string = dateObj.split('T')[0];
    var time: string = dateObj.split('T')[1];
    time = time.split('.')[0];
    dateString = date + '  ' + time + '  UTC'
    return dateString;
  }
}

