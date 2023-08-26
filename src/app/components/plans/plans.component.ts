import { Component, ViewChild } from '@angular/core';
import { Plan } from '../../entities/Plan';
import { MatPaginator } from '@angular/material/paginator';
import { PlanService } from '../../services/plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';

/**
 * Listado de planes
 */
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent extends GridBase<Plan> {

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
   * @param planService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private planService: PlanService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'value', 'installmentsNumber', 'description', 'active', 'edit', 'delete'], snackBar, router,
      'plan', 'Adicionar nuevo plan', 'Listado de planes',
      [
        { field: 'idplan', name: 'ID' },
        { field: 'value', name: 'Valor' },
        { field: 'installmentsNumber', name: 'Número de cuotas' },
        { field: 'description', name: 'Descripción' },
        { field: 'active', name: 'Activo' }
      ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de planes
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idplan" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idplan asc";
    }
    this.planService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de planes", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Elimina un plan
   * @param plan Identificador del plan
   */
  delete(plan: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.planService.delete(plan)
          .then(x => { this._snackBar.open("Plan eliminado correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar el plan", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
