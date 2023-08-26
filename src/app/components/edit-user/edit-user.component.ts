import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';

/**
 * Formulario de inserción y edición de usuarios
 */
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends FormBase {
  title: string = "";

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param userService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private userService: UserService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      login: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      active: new FormControl('', Validators.required)
    }), snackBar, router, 'users')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo usuario";
      this._form.setValue({ id: 0, login: '', name: '', active: 'false' });
    }
    else {
      this.loading = true;
      userService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Editar usuario: " + x.name;
          this._form.setValue({ id: x.id, login: x.login, name: x.name, active: x.active ? 'true' : 'false' });
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar el usuario", "Cerrar", { duration: 2000 });
          } this.loading = false;
        });
    }
  }

  /**
   * Inserta o actualiza el usuario
   */
  submit() {
    if (this._form.get('id')!.value === 0) {//Insertar
      this.loading = true;
      this.userService.insert({ id: this._form.get('id')!.value, login: this._form.get('login')!.value, name: this._form.get('name')!.value, active: this._form.get('active')!.value === "true" })
        .then(x => {
          lastValueFrom(this._snackBar.open("Usuario insertado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar el usuario", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.userService.update({ id: this._form.get('id')!.value, login: this._form.get('login')!.value, name: this._form.get('name')!.value, active: this._form.get('active')!.value === "true" })
        .then(x => {
          lastValueFrom(this._snackBar.open("Usuario actualizado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar el usuario", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
