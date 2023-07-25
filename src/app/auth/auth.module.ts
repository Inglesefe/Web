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

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    AppsComponent
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
    MatTableModule
  ],
  exports: []
})
export class AuthModule { }
