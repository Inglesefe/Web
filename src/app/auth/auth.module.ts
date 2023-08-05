import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LogoutComponent } from './logout/logout.component';
import { MatButtonModule } from '@angular/material/button';
import { AppsComponent } from './apps/apps.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditAppComponent } from './edit-app/edit-app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UtilsModule } from '../utils/utils.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from '../app-routing.module';

import { AppRoleComponent } from './app-role/app-role.component';
import { RolesComponent } from './roles/roles.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { RoleAppComponent } from './role-app/role-app.component';
import { RoleUserComponent } from './role-user/role-user.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    AppsComponent,
    EditAppComponent,
    AppRoleComponent,
    RolesComponent,
    EditRoleComponent,
    RoleAppComponent,
    RoleUserComponent,
    UsersComponent,
    EditUserComponent,
    UserRoleComponent,
    RecoveryComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    UtilsModule,
    DragDropModule,
    AppRoutingModule
  ],
  exports: []
})
export class AuthModule { }
