import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { Application } from '../../entities/Application';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Formulario de inserción y edición de aplicaciones
 */
@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent {
  title: string = "";
  app: Application = new Application();
  loading: boolean = false;

  /**
   * Incializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param appService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private appService: ApplicationService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nueva aplicación";
    }
    else {
      this.app.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      appService.read(this.app.id)
        .then(x => { this.app = x; this.title = "Editar aplicación: " + this.app.name; this.loading = false; })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar la aplicación", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }

  /**
   * Retorna al listado de aplicaciones
   */
  back() {
    this.router.navigate(["/home/apps"]);
  }

  /**
   * Inserta o actualiza la aplicación
   */
  save() {
    if (this.app.id === 0) {//Insertar
      this.loading = true;
      this.appService.insert(this.app)
        .then(x => {
          this.app = x;
          this._snackBar.open("Aplicación insertada correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/apps"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al insertar la aplicación", "Cerrar", { duration: 2000 }); } this.loading = false; });
    } else {//Actualizar
      this.loading = true;
      this.appService.update(this.app)
        .then(x => {
          this.app = x;
          this._snackBar.open("Aplicación actualizada correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/apps"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al actualizar la aplicación", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }
}
