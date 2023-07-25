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
  /**
   * Usuario logueado
   */
  public user: string = '';

  /**
   * Inicializa le componente
   * @param router Componente de ruteo
   */
  constructor(private router: Router) { }

  /**
   * Valida el usuario logueado
   */
  ngOnInit() {
    let token = sessionStorage.getItem("golden-token");
    if (token != null) {
      try {
        let objToken: JwtToken = jwt_decode<JwtToken>(token);
        if (objToken.exp - Math.floor(Date.now() / 1000) < 0) {
          sessionStorage.removeItem("golden-token");
          this.router.navigate(["/login"]);
        }
        else {
          this.user = objToken.name;
        }
      } catch {
        sessionStorage.removeItem("golden-token");
      }
    } else {
      this.router.navigate(["/login"]);
    }
  }

  /**
   * Finaliza sesión del usuario logueado
   */
  logout() {
    this.router.navigate(["/logout"]);
  }
}
