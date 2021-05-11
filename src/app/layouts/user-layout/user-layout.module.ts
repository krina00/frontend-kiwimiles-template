import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout.component';
import { UserLayoutRoutes } from './user-layout.routing';
import { AdminLayoutModule } from '../admin-layout/admin-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table'
import { AuthLayoutModule } from '../auth-layout/auth-layout.module';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminLayoutModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    AuthLayoutModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    CheckboxModule,
    DropdownModule,
    TableModule,
    BadgeModule
  ]
})
export class UserLayoutModule { }
