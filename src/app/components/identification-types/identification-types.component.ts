import { Component, ViewChild } from '@angular/core';
import { IdentificationType } from '../../entities/IdentificationType';
import { MatPaginator } from '@angular/material/paginator';
import { IdentificationTypeService } from '../../services/identification-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';

/**
 * Listado de tipos de identificación
 */
@Component({
  selector: 'app-identification-types',
  templateUrl: './identification-types.component.html',
  styleUrls: ['./identification-types.component.scss']
})
export class IdentificationTypesComponent extends GridBase<IdentificationType> {

  /**
   * Paginador de la tabla
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Ordenamientos de la tabla
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Inicializa el paginador, el ordenador y carga los datos
   * @param identificationTypeService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private identificationTypeService: IdentificationTypeService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'name', 'edit', 'delete'], snackBar, router,
      'identification-type', 'Adicionar nuevo tipo de identificación', 'Listado de tipos de identificación',
      [{ field: 'ididentificationtype', name: 'ID' }, { field: 'name', name: 'Nombre' }]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de tipos de identificación
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "ididentificationtype" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "ididentificationtype asc";
    }
    this.identificationTypeService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de tipos de identificación", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Elimina un tipo de identificación
   * @param identificationType Identificador del tipo de identificación
   */
  delete(identificationType: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.identificationTypeService.delete(identificationType)
          .then(x => { this._snackBar.open("Tipo de identificación eliminado correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar el tipo de identificación", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
