import { Component, ViewChild } from '@angular/core';
import { IncomeType } from '../../entities/IncomeType';
import { MatPaginator } from '@angular/material/paginator';
import { IncomeTypeService } from '../../services/income-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';

/**
 * Listado de tipos de ingreso
 */
@Component({
  selector: 'app-income-types',
  templateUrl: './income-types.component.html',
  styleUrls: ['./income-types.component.scss']
})
export class IncomeTypesComponent extends GridBase<IncomeType> {

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
   * @param incomeTypeService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private incomeTypeService: IncomeTypeService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'code', 'name', 'edit', 'delete'], snackBar, router,
      'income-type', 'Adicionar nuevo tipo de ingreso', 'Listado de tipos de ingreso',
      [{ field: 'idincometype', name: 'ID' }, { field: 'code', name: 'Código' }, { field: 'name', name: 'Nombre' }]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de tipos de ingreso
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idincometype" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idincometype asc";
    }
    this.incomeTypeService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de tipos de ingreso", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Elimina un tipo de ingreso
   * @param incomeType Identificador del tipo de ingreso
   */
  delete(incomeType: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.incomeTypeService.delete(incomeType)
          .then(x => { this._snackBar.open("Tipo de ingreso eliminado correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar el tipo de ingreso", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
