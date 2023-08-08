import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordRequest } from '../../entities/ChangePasswordRequest';

/**
 * Componente de cambio de contraseña
 */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  /**
   * Contraseña del usuario
   */
  public password: string = "";

  /**
   * Confirmación de la contraseña
   */
  public confirmPassword: string = "";

  /**
   * Si se está cargando o procesando el componente
   */
  public loading: boolean = false;

  /**
   * Token de validación
   */
  public token: string = "";

  /**
   * Inicializa los servicios del componente
   * @param userService Consumo de la api de usuarios
   * @param _snackBar Servicio de mensajes emergentes
   * @param router Servicio de ruteo
   */
  constructor(private route: ActivatedRoute, private userService: UserService, private _snackBar: MatSnackBar, private router: Router) {
    this.token = route.snapshot.params["token"];
  }

  /**
   * Realiza el cambio de contraseña
   */
  public changePass(): void {
    if (this.password !== "" && this.confirmPassword !== "" && this.password === this.confirmPassword) {
      this.loading = true;

      let request = new ChangePasswordRequest();
      request.password = this.password;
      request.token = this.token;

      this.userService.changePassword(request)
        .then(x => {
          if (x.success) {
            this._snackBar.open(x.message, "Cerrar", { duration: 2000 }).afterDismissed().toPromise().then(x => this.router.navigate(["/login"]));
          } else {
            this._snackBar.open(x.message, "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        })
        .catch(x => {
          this._snackBar.open("Error al intentar procesar el cambio de contraseña", "Cerrar", { duration: 2000 });
          this.loading = false;
        });
    }
    else {
      this._snackBar.open("Ingrese correctamente los datos de la nueva contraseña", "Cerrar", { duration: 2000 });
    }
  }
}
