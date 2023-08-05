import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Componente de recuperación de contraseña
 */
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent {
  /**
   * Login de acceso a la aplicación
   */
  public login: string = "";

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
   * Realiza el logeo del usuario
   */
  public send(): void {
    if (this.login !== "") {
      this.loading = true;
      this.userService.recovery(this.login)
        .then(x => {
          if (x.valid) {
            this._snackBar.open("Se enviaron los datos de reestablecimiento al correo " + this.login, "Cerrar", { duration: 3000 })
              .afterDismissed()
              .toPromise()
              .then(x => this.router.navigate(["/login"]));
          } else {
            this._snackBar.open("Datos inválidos", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        })
        .catch(x => {
          this._snackBar.open("Error al intentar procesar la recuperación de contraseña", "Cerrar", { duration: 2000 });
          this.loading = false;
        });
    }
    else {
      this._snackBar.open("Ingrese los datos del usuario", "Cerrar", { duration: 2000 });
    }
  }
}
