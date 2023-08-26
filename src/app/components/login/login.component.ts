import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { JwtToken } from '../../entities/JwtToken';
import { environment } from '../../../environment/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { FormBase } from '../FormBase';

/**
 * Componente de inicio de sesión
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBase {

  /**
   * Versión de la aplicación
   */
  public version: string;

  /**
   * Inicializa los servicios del componente
   * @param userService Consumo de la api de usuarios
   * @param _snackBar Servicio de mensajes emergentes
   * @param router Servicio de ruteo
   */
  constructor(private userService: UserService, snackBar: MatSnackBar, router: Router) {
    super(
      new FormGroup({
        login: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      }),
      snackBar, router, '');
    this.version = environment.VERSION;
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
          this._router.navigate(["/home"]);
        }
      } catch {
        sessionStorage.removeItem("golden-token");
      }
    }
  }

  /**
   * Realiza el logeo del usuario
   */
  public submit(): void {
    if (this._form.status == 'VALID') {
      this.loading = true;
      this.userService.login(this._form.get('login')!.value ?? "", this._form.get('password')!.value ?? "")
        .then(x => {
          if (x.valid) {
            let objToken = jwt_decode<JwtToken>(x.token);
            lastValueFrom(this._snackBar.open("Bienvenido " + objToken.name, "Cerrar", { duration: 2000 }).afterDismissed()).then(x => this._router.navigate(["/home"]));
            sessionStorage.setItem("golden-token", x.token);
          } else {
            lastValueFrom(this._snackBar.open("Datos inválidos", "Cerrar", { duration: 2000 }).afterDismissed()).then(() => this.loading = false);
          }
        })
        .catch(x => {
          this._snackBar.open("Error al intentar procesar el inicio de sesión", "Cerrar", { duration: 2000 });
          this.loading = false;
        });
    }
    else {
      lastValueFrom(this._snackBar.open("Ingrese los datos de usuario y contraseña", "Cerrar", { duration: 2000 }).afterDismissed()).then(() => this.loading = false);
    }
  }
}
