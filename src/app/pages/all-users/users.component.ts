import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ROWS_PER_PAGE_OPTIONS } from 'src/app/constants/pagination.constant';
import { USER_GENDERS, USER_GENDERS_FILTER_OPTIONS, USER_TYPES, USER_TYPE_FILTER_OPTIONS } from 'src/app/constants/user.constant';
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

  /* pagination variables */
  private skip: number;
  private take: number;
  private totalRecords: number;
  private numberOfRowsPerPageOptions: {rows: number}[] = ROWS_PER_PAGE_OPTIONS;
  private numberOfRowsPerPage: number = 10;

  /* filtering variables */
  private where: string = null;
  private whereName: string = null;
  private whereGender: string = null;
  private whereType: string = null;
  private nameFilterInput: string;
  private genderFilterInputOptions: DropdownDTO[] = USER_GENDERS_FILTER_OPTIONS;
  private genderFilterInput: string = null;
  private typeFilterInputOptions: DropdownDTO[] = USER_TYPE_FILTER_OPTIONS;
  private typeFilterInput: string = null;
  private displayCalendar: boolean = false;
  private startDateFilterInput: string = null;
  private endDateFilterInput: string = DateFormatting.dateStringToUTC(new Date());
  private dateRange: {start: string, end: string} = null;

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

    this.sudoService.getUsers(this.skip, this.take, this.where, this.dateRange).subscribe((UserInformationData: {users: any[], length: number}) => {
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
    this.take = tableElement._rows;
    this.getAllUsers();
  }

  private applyNameFilter() {
    if(this.nameFilterInput && this.nameFilterInput.length>0) {
      this.whereName = `name:contains ${this.nameFilterInput}`;
    }
    else {
      this.whereName = null;
    }
    this.getWhereQuery();
    this.getAllUsers();
  }

  private applyGenderFilter(gender: string) {
    if(gender) {
      this.whereGender = `gender:equals ${gender}`;
    }
    else {
      this.whereGender = null;
    }
    this.getWhereQuery();
    this.getAllUsers();
  }

  private applyTypeFilter(type: string) {
    if(type) {
      this.whereType = `role:equals ${type}`;
    }
    else {
      this.whereType = null;
    }
    this.getWhereQuery();
    this.getAllUsers();
  }

  private applyDateFilter() {
    if(this.startDateFilterInput && this.endDateFilterInput) {
      this.displayCalendar = false;
      this.dateRange = {
        start : this.startDateFilterInput + ':00.000Z',
        end : this.endDateFilterInput + ':00.000Z',
      }
    }
    else {
      this.dateRange = null;
    }
    this.getAllUsers();
  }

  private removeDateFilter() {
    this.startDateFilterInput = null;
    this.endDateFilterInput = DateFormatting.dateStringToUTC(new Date());
    this.displayCalendar = false;
    this.dateRange = null;
    this.getAllUsers();
  }

  private removeAllFilters() {
    this.nameFilterInput = null;
    this.typeFilterInput = null;
    this.genderFilterInput = null;
    this.whereName = null;
    this.whereGender = null;
    this.whereType = null;
    this.where = null;
    this.removeDateFilter();
    this.getAllUsers();
  }
  
  private getWhereQuery(){
    this.where = 
      (this.whereName ? this.whereName + ',': '') +
      (this.whereGender ? this.whereGender + ',':'') +
      (this.whereType ? this.whereType:'');
  }
}

