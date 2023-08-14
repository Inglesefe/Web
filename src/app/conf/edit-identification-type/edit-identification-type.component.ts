import { Component } from '@angular/core';
import { IdentificationType } from '../../entities/IdentificationType';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentificationTypeService } from '../services/identification-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Formulario de edición o inserción de un tipo de identificación
 */
@Component({
  selector: 'app-edit-identification-type',
  templateUrl: './edit-identification-type.component.html',
  styleUrls: ['./edit-identification-type.component.scss']
})
export class EditIdentificationTypeComponent {
  title: string = "";
  identificationType: IdentificationType = new IdentificationType();
  loading: boolean = false;

  /**
   * Incializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param identificationTypeService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private identificationTypeService: IdentificationTypeService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo tipo de identificación";
    }
    else {
      this.identificationType.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      identificationTypeService.read(this.identificationType.id)
        .then(x => { this.identificationType = x; this.title = "Editar tipo de identificación: " + this.identificationType.name; this.loading = false; })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar el tipo de identificación", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }

  /**
   * Retorna al listado de tipo de identificaciónes
   */
  back() {
    this.router.navigate(["/home/identification-types"]);
  }

  /**
   * Inserta o actualiza el tipo de identificación
   */
  save() {
    if (this.identificationType.id === 0) {//Insertar
      this.loading = true;
      this.identificationTypeService.insert(this.identificationType)
        .then(x => {
          this.identificationType = x;
          this._snackBar.open("Tipo de identificación insertado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/identification-types"]) }, 2000);
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
      this.identificationTypeService.update(this.identificationType)
        .then(x => {
          this.identificationType = x;
          this._snackBar.open("Tipo de identificación actualizado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/identification-types"]) }, 2000);
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
