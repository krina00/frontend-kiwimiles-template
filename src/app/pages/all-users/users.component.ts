import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ROWS_PER_PAGE_OPTIONS } from 'src/app/constants/pagination.constant';
import { USER_GENDERS, USER_TYPES } from 'src/app/constants/user.constant';
import { DateFormatting } from 'src/app/helpers/date-formatting';
import { Sorting, SortingRuleFormat } from 'src/app/helpers/sorting';
import { SudoService } from 'src/app/services/sudo.service';
import { DropdownDTO } from '../../dto/dropdown.dto';
import { DisplayUserDTO, UpdateUserDTO } from '../../dto/user.dto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private users: DisplayUserDTO[];
  private error: string;
  private userRoles: DropdownDTO[] =  USER_TYPES;
  private genders: DropdownDTO[] = USER_GENDERS;
  private displayError: boolean = false;
  private skip: number;
  private take: number;
  private totalRecords: number;
  private numberOfRowsPerPageOptions: {rows: number}[] = ROWS_PER_PAGE_OPTIONS;
  private numberOfRowsPerPage: number = 5;
  constructor(
    private readonly sudoService: SudoService,
    private readonly router: Router,
  ) {

  }

  ngOnInit() {
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
    },
    error => {
      this.displayError = true;
      this.error = "Could not update user"
    });
  }

  private closeEditUser(userId: number): void {
    const index: number = this.users.findIndex(user => user.id == userId);
    this.users[index].updatable = false;
    this.getAllUsers();
  }

  private getAllUsers(): void {

    this.sudoService.getUsers(this.skip, this.take).subscribe((UserInformationData: {users: any[], length: number}) => {
      this.users = [];
      const UserInformation = UserInformationData.users;
      this.totalRecords = UserInformationData.length;
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
            createdOn: DateFormatting.utcDateToString(user.createdAt),
            displayTime: DateFormatting.getLocalDateTime12H(user.createdAt),
            updatable: false
          }
          this.users.push(userObject);
        })
      }
      this.users = this.sortUsers(this.users);
    })
  }

  private userDetails(userId: number): void {
    this.router.navigate([`/admin/users/${userId}`]);
  }

  private deleteUser(userId: number): void {
    this.sudoService.deleteUser(userId).subscribe((user) => {
      console.log(user);
      this.getAllUsers();
    },
    error => {
      this.displayError = true;
      this.error = "Could not delete user"
    });
  }

  private sortUsers(users: DisplayUserDTO[]): DisplayUserDTO[] {
    const sortingRules: SortingRuleFormat[] = [
      {field: "createdOn", order: "DESC"},
    ]
    return Sorting.dataSorting(users, sortingRules);
  }

  private loadUsers(tableElement){
    this.skip = tableElement._first;
    this.take = this.numberOfRowsPerPage;
    this.getAllUsers();
  }
}

