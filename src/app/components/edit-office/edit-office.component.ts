import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { OfficeService } from '../../services/office.service';

/**
 * Formulario de inserción y edición de oficinas
 */
@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html'
})
export class EditOfficeComponent extends FormBase {
  title: string = "";
  country: number = 0;
  city: number = 0;

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param officeService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private officeService: OfficeService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(200)])
    }), snackBar, router, 'countries/' + route.snapshot.params["id"] + '/cities/' + route.snapshot.params["id1"] + '/offices')
    if (parseInt(route.snapshot.params["id2"]) === 0) {
      this.title = "Insertar nueva oficina";
      this._form.setValue({ id: 0, name: '', address: '' });
    }
    else {
      this.loading = true;
      officeService.read(parseInt(route.snapshot.params["id2"]))
        .then(x => {
          this.title = "Editar oficina: " + x.name;
          this._form.setValue({ id: x.id, name: x.name, address: x.address });
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar la oficina", "Cerrar", { duration: 2000 });
          } this.loading = false;
        });
    }
  }

  /**
   * Inserta o actualiza la oficina
   */
  submit() {
    if (this._form.get('id')!.value === 0) {//Insertar
      this.loading = true;
      this.officeService.insert(
        {
          id: this._form.get('id')!.value,
          name: this._form.get('name')!.value,
          address: this._form.get('address')!.value,
          city: {
            id: parseInt(this.route.snapshot.params["id1"]),
            code: '',
            name: '',
            country: {
              id: parseInt(this.route.snapshot.params["id"]),
              code: '',
              name: ''
            }
          }
        })
        .then(x => {
          lastValueFrom(this._snackBar.open("Oficina insertada correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar la oficina", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.officeService.update({
        id: this._form.get('id')!.value,
        name: this._form.get('name')!.value,
        address: this._form.get('address')!.value,
        city: {
          id: parseInt(this.route.snapshot.params["id1"]),
          code: '',
          name: '',
          country: {
            id: parseInt(this.route.snapshot.params["id"]),
            code: '',
            name: ''
          }
        }
      })
        .then(x => {
          lastValueFrom(this._snackBar.open("Oficina actualizada correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar la oficina", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
