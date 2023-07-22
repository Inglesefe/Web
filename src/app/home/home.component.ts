import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { JwtToken } from '../auth/entities/JwtToken';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public user: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    let token = sessionStorage.getItem("golden-token");
    if (token != null) {
      let objToken: JwtToken = jwt_decode<JwtToken>(token);
      if (objToken.exp - Math.floor(Date.now() / 1000) < 0) {
        this.router.navigate(["/login"]);
      }
      else {
        this.user = objToken.name;
      }
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
