import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeTypeService } from '../../services/income-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Formulario de inserción y edición de tipos de ingreso
 */
@Component({
  selector: 'app-edit-income-type',
  templateUrl: './edit-income-type.component.html'
})
export class EditIncomeTypeComponent extends FormBase {
  title: string = "";

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param incomeTypeService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private incomeTypeService: IncomeTypeService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(45)])
    }), snackBar, router, 'income-types')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo tipo de ingreso";
      this._form.setValue({ id: 0, code: '', name: '' });
    }
    else {
      this.loading = true;
      incomeTypeService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Editar tipo de ingreso: " + x.name;
          this._form.setValue(x);
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar el tipo de ingreso", "Cerrar", { duration: 2000 });
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
      this.incomeTypeService.insert({ id: this._form.get('id')!.value, code: this._form.get('code')!.value, name: this._form.get('name')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Tipo de ingreso insertado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar el tipo de ingreso", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.incomeTypeService.update({ id: this._form.get('id')!.value, code: this._form.get('code')!.value, name: this._form.get('name')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Tipo de ingreso actualizado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar el tipo de ingreso", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
