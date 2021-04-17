import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  
  permissionsLoaded: boolean = false;
  constructor(
    private readonly userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserPrivilege().subscribe(async permissions => {
      sessionStorage.setItem("permissions", permissions);
      this.permissionsLoaded = true;
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

}
