import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { AppsComponent } from './components/apps/apps.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { AppRoleComponent } from './components/app-role/app-role.component';
import { RolesComponent } from './components/roles/roles.component';
import { EditRoleComponent } from './components/edit-role/edit-role.component';
import { RoleAppComponent } from './components/role-app/role-app.component';
import { RoleUserComponent } from './components/role-user/role-user.component';
import { UsersComponent } from './components/users/users.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { EditNotificationComponent } from './components/edit-notification/edit-notification.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { EditTemplateComponent } from './components/edit-template/edit-template.component';
import { CountriesComponent } from './components/countries/countries.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';
import { CitiesComponent } from './components/cities/cities.component';
import { EditCityComponent } from './components/edit-city/edit-city.component';
import { OfficesComponent } from './components/offices/offices.component';
import { EditOfficeComponent } from './components/edit-office/edit-office.component';
import { IdentificationTypesComponent } from './components/identification-types/identification-types.component';
import { EditIdentificationTypeComponent } from './components/edit-identification-type/edit-identification-type.component';
import { IncomeTypesComponent } from './components/income-types/income-types.component';
import { EditIncomeTypeComponent } from './components/edit-income-type/edit-income-type.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { EditParameterComponent } from './components/edit-parameter/edit-parameter.component';
import { PlansComponent } from './components/plans/plans.component';
import { EditPlanComponent } from './components/edit-plan/edit-plan.component';

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
      { path: "user-role/:id", component: UserRoleComponent },
      { path: "user/:id", component: EditUserComponent },
      { path: "notifications", component: NotificationsComponent },
      { path: "notification/:id", component: EditNotificationComponent },
      { path: "templates", component: TemplatesComponent },
      { path: "template/:id", component: EditTemplateComponent },
      { path: "countries", component: CountriesComponent },
      { path: "country/:id", component: EditCountryComponent },
      { path: "countries/:id/cities", component: CitiesComponent },
      { path: "country/:id/city/:id1", component: EditCityComponent },
      { path: "countries/:id/cities/:id1/offices", component: OfficesComponent },
      { path: "country/:id/city/:id1/office/:id2", component: EditOfficeComponent },
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
  { path: "", component: HomeComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
