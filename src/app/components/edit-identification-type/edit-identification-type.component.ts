import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentificationTypeService } from '../../services/identification-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Formulario de inserción y edición de tipos de identificación
 */
@Component({
  selector: 'app-edit-identification-type',
  templateUrl: './edit-identification-type.component.html'
})
export class EditIdentificationTypeComponent extends FormBase {
  title: string = "";

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param identificationTypeService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private identificationTypeService: IdentificationTypeService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(45)])
    }), snackBar, router, 'identification-types')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo tipo de identificación";
      this._form.setValue({ id: 0, name: '' });
    }
    else {
      this.loading = true;
      identificationTypeService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Editar tipo de identificación: " + x.name;
          this._form.setValue(x);
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar el tipo de identificación", "Cerrar", { duration: 2000 });
          } this.loading = false;
        });
    }
  }

  /**
   * Inserta o actualiza el país
   */
  submit() {
    if (this._form.get('id')!.value === 0) {//Insertar
      this.loading = true;
      this.identificationTypeService.insert({ id: this._form.get('id')!.value, name: this._form.get('name')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Tipo de identificación insertado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar el tipo de identificación", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.identificationTypeService.update({ id: this._form.get('id')!.value, name: this._form.get('name')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Tipo de identificación actualizado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar el tipo de identificación", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
