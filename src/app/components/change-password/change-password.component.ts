import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordRequest } from '../../entities/ChangePasswordRequest';
import { FormBase } from '../FormBase';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Componente de cambio de contraseña
 */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends FormBase {

  /**
   * Token que llega desde el correo
   */
  private token: string;

  /**
   * Inicializa los servicios del componente
   * @param userService Consumo de la api de usuarios
   * @param _snackBar Servicio de mensajes emergentes
   * @param router Servicio de ruteo
   */
  constructor(private route: ActivatedRoute, private userService: UserService, snackBar: MatSnackBar, router: Router) {
    super(new FormGroup({
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required)
    }, {
      validators: (formGroup: AbstractControl): ValidationErrors | null => {
        let f: FormGroup = formGroup as FormGroup;
        let pass: string = formGroup.get('password')?.value;
        let confirmPass: string = formGroup.get('passwordConfirm')?.value;

        if (pass !== confirmPass) {
          return { notMatch: true };
        }
        return null;
      }
    }), snackBar, router, '')
    this.token = route.snapshot.params["token"]
  }

  /**
   * Realiza el cambio de contraseña
   */
  public submit(): void {
    this.loading = true;

    let request = new ChangePasswordRequest();
    request.password = this._form.get('password')!.value;
    request.token = this.token;

    this.userService.changePassword(request)
      .then(x => {
        if (x.success) {
          lastValueFrom(this._snackBar.open(x.message, "Cerrar", { duration: 2000 }).afterDismissed()).then(x => this._router.navigate(["/login"]));
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
}
