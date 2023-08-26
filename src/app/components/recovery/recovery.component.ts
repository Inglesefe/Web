import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Componente de recuperación de contraseña
 */
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent extends FormBase {
  /**
   * Inicializa los servicios del componente
   * @param userService Consumo de la api de usuarios
   * @param _snackBar Servicio de mensajes emergentes
   * @param router Servicio de ruteo
   */
  constructor(private userService: UserService, snackBar: MatSnackBar, router: Router) {
    super(new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email])
    }), snackBar, router, '')
  }

  /**
   * Realiza el logeo del usuario
   */
  public submit(): void {
    if (this._form.status === "VALID") {
      this.loading = true;
      this.userService.recovery(this._form.get('login')!.value)
        .then(x => {
          if (x.valid) {
            lastValueFrom(this._snackBar.open("Se enviaron los datos de reestablecimiento al correo " + this._form.get('login')!.value, "Cerrar", { duration: 3000 }).afterDismissed())
              .then(x => this._router.navigate(["/login"]));
          } else {
            lastValueFrom(this._snackBar.open("Datos inválidos", "Cerrar", { duration: 2000 }).afterDismissed()).then(() => this.loading = false);
          }
        })
        .catch(x => {
          lastValueFrom(this._snackBar.open("Error al intentar procesar la recuperación de contraseña", "Cerrar", { duration: 2000 }).afterDismissed()).then(() => this.loading = false);
        });
    }
    else {
      this._snackBar.open("Ingrese los datos del usuario", "Cerrar", { duration: 2000 });
    }
  }
}
