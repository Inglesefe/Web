import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AppsComponent } from './auth/apps/apps.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "home", component: HomeComponent,
    children: [
      { path: "apps", component: AppsComponent },
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
