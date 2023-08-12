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
import { CountriesComponent } from './conf/countries/countries.component';
import { EditCountryComponent } from './conf/edit-country/edit-country.component';
import { CitiesComponent } from './conf/cities/cities.component';
import { EditCityComponent } from './conf/edit-city/edit-city.component';
import { OfficesComponent } from './conf/offices/offices.component';
import { EditOfficeComponent } from './conf/edit-office/edit-office.component';
import { IdentificationTypesComponent } from './conf/identification-types/identification-types.component';
import { EditIdentificationTypeComponent } from './conf/edit-identification-type/edit-identification-type.component';
import { IncomeTypesComponent } from './conf/income-types/income-types.component';
import { EditIncomeTypeComponent } from './conf/edit-income-type/edit-income-type.component';
import { ParametersComponent } from './conf/parameters/parameters.component';
import { EditParameterComponent } from './conf/edit-parameter/edit-parameter.component';
import { PlansComponent } from './conf/plans/plans.component';
import { EditPlanComponent } from './conf/edit-plan/edit-plan.component';

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
      { path: "countries", component: CountriesComponent },
      { path: "country/:id", component: EditCountryComponent },
      { path: "cities", component: CitiesComponent },
      { path: "city/:id", component: EditCityComponent },
      { path: "offices", component: OfficesComponent },
      { path: "office/:id", component: EditOfficeComponent },
      { path: "identification-types", component: IdentificationTypesComponent },
      { path: "identification-type/:id", component: EditIdentificationTypeComponent },
      { path: "income-types", component: IncomeTypesComponent },
      { path: "income-type/:id", component: EditIncomeTypeComponent },
      { path: "parameters", component: ParametersComponent },
      { path: "parameter/:id", component: EditParameterComponent },
      { path: "plans", component: PlansComponent },
      { path: "plan/:id", component: EditPlanComponent },
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
