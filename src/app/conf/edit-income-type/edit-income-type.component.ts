import { Component } from '@angular/core';
import { IncomeType } from '../../entities/IncomeType';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeTypeService } from '../services/income-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Formulario de edición o inserción de un tipo de ingreso
 */
@Component({
  selector: 'app-edit-income-type',
  templateUrl: './edit-income-type.component.html',
  styleUrls: ['./edit-income-type.component.scss']
})
export class EditIncomeTypeComponent {
  title: string = "";
  incomeType: IncomeType = new IncomeType();
  loading: boolean = false;

  /**
   * Incializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param incomeTypeService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private incomeTypeService: IncomeTypeService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo tipo de ingreso";
    }
    else {
      this.incomeType.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      incomeTypeService.read(this.incomeType.id)
        .then(x => { this.incomeType = x; this.title = "Editar tipo de ingreso: " + this.incomeType.name; this.loading = false; })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar el tipo de ingreso", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }

  /**
   * Retorna al listado de tipo de ingresoes
   */
  back() {
    this.router.navigate(["/home/income-types"]);
  }

  /**
   * Inserta o actualiza el tipo de ingreso
   */
  save() {
    if (this.incomeType.id === 0) {//Insertar
      this.loading = true;
      this.incomeTypeService.insert(this.incomeType)
        .then(x => {
          this.incomeType = x;
          this._snackBar.open("Tipo de ingreso insertado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/income-types"]) }, 2000);
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
      this.incomeTypeService.update(this.incomeType)
        .then(x => {
          this.incomeType = x;
          this._snackBar.open("Tipo de ingreso actualizado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/income-types"]) }, 2000);
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
