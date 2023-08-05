import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AppsComponent } from './auth/apps/apps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAppComponent } from './auth/edit-app/edit-app.component';
import { AppRoleComponent } from './auth/app-role/app-role.component';
import { RolesComponent } from './auth/roles/roles.component';
import { EditRoleComponent } from './auth/edit-role/edit-role.component';
import { RoleAppComponent } from './auth/role-app/role-app.component';
import { RoleUserComponent } from './auth/role-user/role-user.component';
import { UsersComponent } from './auth/users/users.component';
import { EditUserComponent } from './auth/edit-user/edit-user.component';
import { UserRoleComponent } from './auth/user-role/user-role.component';
import { TemplatesComponent } from './noti/templates/templates.component';
import { EditTemplateComponent } from './noti/edit-template/edit-template.component';
import { NotificationsComponent } from './noti/notifications/notifications.component';
import { EditNotificationComponent } from './noti/edit-notification/edit-notification.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "recovery", component: RecoveryComponent },
  { path: "change-password/:token", component: ChangePasswordComponent },
  {
    path: "home", component: HomeComponent,
    children: [
      { path: "apps", component: AppsComponent },
      { path: "app/:id", component: EditAppComponent },
      { path: "app-role/:id", component: AppRoleComponent },
      { path: "roles", component: RolesComponent },
      { path: "role/:id", component: EditRoleComponent },
      { path: "role-app/:id", component: RoleAppComponent },
      { path: "role-user/:id", component: RoleUserComponent },
      { path: "users", component: UsersComponent },
      { path: "user/:id", component: EditUserComponent },
      { path: "user-role/:id", component: UserRoleComponent },
      { path: "templates", component: TemplatesComponent },
      { path: "template/:id", component: EditTemplateComponent },
      { path: "notifications", component: NotificationsComponent },
      { path: "notification/:id", component: EditNotificationComponent },
      { path: "", component: DashboardComponent },
      { path: "**", component: DashboardComponent }
    ]
  },
  { path: "logout", component: LogoutComponent },
  { path: "", component: HomeComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
