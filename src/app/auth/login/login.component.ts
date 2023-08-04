import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { JwtToken } from '../../entities/JwtToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Componente de inicio de sesión
 */
export class LoginComponent {
  /**
   * Login de acceso a la aplicación
   */
  public login: string = "";

  /**
   * Contraseña del usuario
   */
  public password: string = "";

  /**
   * Si se está cargando o procesando el componente
   */
  public loading: boolean = false;

  /**
   * Inicializa los servicios del componente
   * @param userService Consumo de la api de usuarios
   * @param _snackBar Servicio de mensajes emergentes
   * @param router Servicio de ruteo
   */
  constructor(private userService: UserService, private _snackBar: MatSnackBar, private router: Router) {
  }

  /**
   * Valida que el usuario aun no esté logueado
   */
  ngOnInit() {
    let token = sessionStorage.getItem("golden-token");
    if (token != null) {
      try {
        let objToken: JwtToken = jwt_decode<JwtToken>(token);
        if (objToken.exp - Math.floor(Date.now() / 1000) > 0) {
          this.router.navigate(["/home"]);
        }
      } catch {
        sessionStorage.removeItem("golden-token");
      }
    }
  }

  /**
   * Realiza el logeo del usuario
   */
  public loginUser(): void {
    if (this.login != "" && this.password != "") {
      this.loading = true;
      this.userService.login(this.login, this.password)
        .then(x => {
          if (x.valid) {
            let objToken = jwt_decode<JwtToken>(x.token);
            this._snackBar.open("Bienvenido " + objToken.name, "Cerrar", { duration: 2000 });
            sessionStorage.setItem("golden-token", x.token);
            this.router.navigate(["/home"]);
          } else {
            this._snackBar.open("Datos inválidos", "Cerrar", { duration: 2000 });
          }

          this.loading = false;
        })
        .catch(x => {
          this._snackBar.open("Error al intentar procesar el inicio de sesión", "Cerrar", { duration: 2000 });
          this.loading = false;
        });
    }
    else {
      this._snackBar.open("Ingrese los datos de usuario y contraseña", "Cerrar", { duration: 2000 });
    }
  }
}
