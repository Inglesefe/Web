import { Component } from '@angular/core';
import { Parameter } from '../../entities/Parameter';
import { ActivatedRoute, Router } from '@angular/router';
import { ParameterService } from '../services/parameter.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Formulario de edición o inserción de un parámetro
 */
@Component({
  selector: 'app-edit-parameter',
  templateUrl: './edit-parameter.component.html',
  styleUrls: ['./edit-parameter.component.scss']
})
export class EditParameterComponent {
  title: string = "";
  parameter: Parameter = new Parameter();
  loading: boolean = false;

  /**
   * Incializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param parameterService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private parameterService: ParameterService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo parámetro";
    }
    else {
      this.parameter.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      parameterService.read(this.parameter.id)
        .then(x => { this.parameter = x; this.title = "Editar parámetro: " + this.parameter.name; this.loading = false; })
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
   * Retorna al listado de parámetroes
   */
  back() {
    this.router.navigate(["/home/parameters"]);
  }

  /**
   * Inserta o actualiza el parámetro
   */
  save() {
    if (this.parameter.id === 0) {//Insertar
      this.loading = true;
      this.parameterService.insert(this.parameter)
        .then(x => {
          this.parameter = x;
          this._snackBar.open("Parámetro insertado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/parameters"]) }, 2000);
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
      this.parameterService.update(this.parameter)
        .then(x => {
          this.parameter = x;
          this._snackBar.open("Parámetro actualizado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/parameters"]) }, 2000);
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
