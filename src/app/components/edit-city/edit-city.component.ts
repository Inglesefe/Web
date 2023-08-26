import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { CityService } from '../../services/city.service';

/**
 * Formulario de inserción y edición de ciudades
 */
@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html'
})
export class EditCityComponent extends FormBase {
  title: string = "";
  country: number = 0;

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param cityService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private cityService: CityService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      code: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(45)])
    }), snackBar, router, 'countries/' + route.snapshot.params["id"] + '/cities')
    if (parseInt(route.snapshot.params["id1"]) === 0) {
      this.title = "Insertar nueva ciudad";
      this._form.setValue({ id: 0, code: '', name: '' });
    }
    else {
      this.loading = true;
      cityService.read(parseInt(route.snapshot.params["id1"]))
        .then(x => {
          this.title = "Editar ciudad: " + x.name;
          this._form.setValue({ id: x.id, code: x.code, name: x.name });
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar la ciudad", "Cerrar", { duration: 2000 });
          } this.loading = false;
        });
    }
  }

  /**
   * Inserta o actualiza la ciudad
   */
  submit() {
    if (this._form.get('id')!.value === 0) {//Insertar
      this.loading = true;
      this.cityService.insert(
        {
          id: this._form.get('id')!.value,
          code: this._form.get('code')!.value,
          name: this._form.get('name')!.value,
          country: {
            id: parseInt(this.route.snapshot.params["id"]),
            code: '',
            name: ''
          }
        })
        .then(x => {
          lastValueFrom(this._snackBar.open("Ciudad insertada correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar la ciudad", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.cityService.update({
        id: this._form.get('id')!.value,
        code: this._form.get('code')!.value,
        name: this._form.get('name')!.value,
        country: {
          id: parseInt(this.route.snapshot.params["id"]),
          code: '',
          name: ''
        }
      })
        .then(x => {
          lastValueFrom(this._snackBar.open("Ciudad actualizada correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar la ciudad", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
