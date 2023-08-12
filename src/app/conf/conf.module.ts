import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries/countries.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { UtilsModule } from '../utils/utils.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from '../app-routing.module';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { IdentificationTypesComponent } from './identification-types/identification-types.component';
import { IncomeTypesComponent } from './income-types/income-types.component';
import { ParametersComponent } from './parameters/parameters.component';
import { PlansComponent } from './plans/plans.component';
import { EditIdentificationTypeComponent } from './edit-identification-type/edit-identification-type.component';
import { EditIncomeTypeComponent } from './edit-income-type/edit-income-type.component';
import { EditParameterComponent } from './edit-parameter/edit-parameter.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { CitiesComponent } from './cities/cities.component';
import { EditCityComponent } from './edit-city/edit-city.component';
import { OfficesComponent } from './offices/offices.component';
import { EditOfficeComponent } from './edit-office/edit-office.component';

@NgModule({
  declarations: [
    CountriesComponent,
    EditCountryComponent,
    IdentificationTypesComponent,
    IncomeTypesComponent,
    ParametersComponent,
    PlansComponent,
    EditIdentificationTypeComponent,
    EditIncomeTypeComponent,
    EditParameterComponent,
    EditPlanComponent,
    CitiesComponent,
    EditCityComponent,
    OfficesComponent,
    EditOfficeComponent
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
  ]
})
export class ConfModule { }
