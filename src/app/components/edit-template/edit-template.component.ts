import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../services/template.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Formulario de inserción y edición de plantillas
 */
@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html'
})
export class EditTemplateComponent extends FormBase {
  title: string = "";

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param templateService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private templateService: TemplateService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      content: new FormControl('', Validators.required)
    }), snackBar, router, 'templates')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nueva plantilla";
      this._form.setValue({ id: 0, name: '', content: '' });
    }
    else {
      this.loading = true;
      templateService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Editar plantilla: " + x.name;
          this._form.setValue(x);
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar la plantilla", "Cerrar", { duration: 2000 });
          } this.loading = false;
        });
    }
  }

  /**
   * Inserta o actualiza la plantilla
   */
  submit() {
    if (this._form.get('id')!.value === 0) {//Insertar
      this.loading = true;
      this.templateService.insert({ id: this._form.get('id')!.value, name: this._form.get('name')!.value, content: this._form.get('content')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Plantilla insertada correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar la plantilla", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.templateService.update({ id: this._form.get('id')!.value, name: this._form.get('name')!.value, content: this._form.get('content')!.value })
        .then(x => {
          lastValueFrom(this._snackBar.open("Plantilla actualizada correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar la plantilla", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
