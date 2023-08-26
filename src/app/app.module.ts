/* Módulos */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorModule } from '@tinymce/tinymce-angular';

/* Proveedores */
import { MatPaginatorSpanish } from './MatPaginatorSpanish';

/* Componentes */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { AppsComponent } from './components/apps/apps.component';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { ConfirmComponent } from './components/utils/confirm/confirm.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RecoveryComponent,
    AppsComponent,
    EditAppComponent,
    ConfirmComponent,
    AppRoleComponent,
    RolesComponent,
    EditRoleComponent,
    RoleAppComponent,
    RoleUserComponent,
    UsersComponent,
    ChangePasswordComponent,
    EditUserComponent,
    UserRoleComponent,
    NotificationsComponent,
    EditNotificationComponent,
    TemplatesComponent,
    EditTemplateComponent,
    CountriesComponent,
    EditCountryComponent,
    CitiesComponent,
    EditCityComponent,
    OfficesComponent,
    EditOfficeComponent,
    IdentificationTypesComponent,
    EditIdentificationTypeComponent,
    IncomeTypesComponent,
    EditIncomeTypeComponent,
    ParametersComponent,
    EditParameterComponent,
    PlansComponent,
    EditPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    DragDropModule,
    EditorModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorSpanish }],
  bootstrap: [AppComponent]
})
export class AppModule { }
