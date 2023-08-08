import { Component } from '@angular/core';
import { Template } from '../../entities/Template';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../services/template.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Formulario de inserción y edición de plantillas
 */
@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent {
  title: string = "";
  template: Template = new Template();
  loading: boolean = false;

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param templateService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private templateService: TemplateService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nueva plantilla";
    }
    else {
      this.template.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      templateService.read(this.template.id)
        .then(x => { this.template = x; this.title = "Editar plantilla: " + this.template.name; this.loading = false; })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar la plantilla", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }

  /**
   * Retorna al listado de plantillas
   */
  back() {
    this.router.navigate(["/home/templates"]);
  }

  /**
   * Inserta o actualiza la plantilla
   */
  save() {
    if (this.template.id === 0) {//Insertar
      this.loading = true;
      this.templateService.insert(this.template)
        .then(x => {
          this.template = x;
          this._snackBar.open("Plantilla insertada correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/templates"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al insertar la plantilla", "Cerrar", { duration: 2000 }); } this.loading = false; });
    } else {//Actualizar
      this.loading = true;
      this.templateService.update(this.template)
        .then(x => {
          this.template = x;
          this._snackBar.open("Plantilla actualizada correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/templates"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al actualizar la plantilla", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }
}
