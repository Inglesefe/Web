import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Formulario de inserción y edición de paises
 */
@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html'
})
export class EditCountryComponent extends FormBase {
  title: string = "";

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param countryService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private countryService: CountryService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(45)])
    }), snackBar, router, 'countries')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo país";
      this._form.setValue({ id: 0, code: '', name: '' });
    }
    else {
      this.loading = true;
      countryService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Editar país: " + x.name;
          this._form.setValue(x);
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar el país", "Cerrar", { duration: 2000 });
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
      this.countryService.insert({ id: this._form.get('id')!.value, code: this._form.get('code')!.value, name: this._form.get('name')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("País insertado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar el país", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.countryService.update({ id: this._form.get('id')!.value, code: this._form.get('code')!.value, name: this._form.get('name')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("País actualizado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar el país", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
