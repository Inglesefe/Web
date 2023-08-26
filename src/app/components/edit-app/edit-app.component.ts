import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Formulario de inserción y edición de aplicaciones
 */
@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html'
})
export class EditAppComponent extends FormBase {
  title: string = "";

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param appService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private appService: ApplicationService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(45)])
    }), snackBar, router, 'apps')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nueva aplicación";
      this._form.setValue({ id: 0, name: '' });
    }
    else {
      this.loading = true;
      appService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Editar aplicación: " + x.name;
          this._form.setValue(x);
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar la aplicación", "Cerrar", { duration: 2000 });
          } this.loading = false;
        });
    }
  }

  /**
   * Inserta o actualiza la aplicación
   */
  submit() {
    if (this._form.get('id')!.value === 0) {//Insertar
      this.loading = true;
      this.appService.insert({ id: this._form.get('id')!.value, name: this._form.get('name')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Aplicación insertada correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar la aplicación", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.appService.update({ id: this._form.get('id')!.value, name: this._form.get('name')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Aplicación actualizada correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar la aplicación", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
