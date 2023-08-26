import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParameterService } from '../../services/parameter.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Formulario de inserción y edición de parámetros
 */
@Component({
  selector: 'app-edit-parameter',
  templateUrl: './edit-parameter.component.html'
})
export class EditParameterComponent extends FormBase {
  title: string = "";

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param parameterService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private parameterService: ParameterService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      value: new FormControl('', [Validators.required, Validators.maxLength(200)])
    }), snackBar, router, 'parameters')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo parámetro";
      this._form.setValue({ id: 0, name: '', value: '' });
    }
    else {
      this.loading = true;
      parameterService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Editar parámetro: " + x.name;
          this._form.setValue(x);
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar el parámetro", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }

  /**
   * Inserta o actualiza el parámetro
   */
  submit() {
    if (this._form.get('id')!.value === 0) {//Insertar
      this.loading = true;
      this.parameterService.insert({ id: this._form.get('id')!.value, name: this._form.get('name')!.value, value: this._form.get('value')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Parámetro insertado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar el parámetro", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.parameterService.update({ id: this._form.get('id')!.value, name: this._form.get('name')!.value, value: this._form.get('value')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Parámetro actualizado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar el parámetro", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
