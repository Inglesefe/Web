import { Component, ViewChild } from '@angular/core';
import { Application } from '../../entities/Application';
import { MatPaginator } from '@angular/material/paginator';
import { ApplicationService } from '../../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';

/**
 * Listado de aplicaciones
 */
@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent extends GridBase<Application> {

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
   * @param appService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private appService: ApplicationService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'name', 'roles', 'edit', 'delete'], snackBar, router,
      'app', 'Adicionar nueva aplicación', 'Listado de aplicaciones',
      [{ field: 'idapplication', name: 'ID' }, { field: 'name', name: 'Nombre' }]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de aplicaciones
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idapplication" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idapplication asc";
    }
    this.appService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el listado de aplicaciones", "Cerrar", { duration: 2000 }); } this.loading = false; });
  }

  /**
   * Redirecciona al listado de roles asociados y no asociados a la aplicación
   * @param app Identificador de la aplicación
   */
  roles(app: number) {
    this._router.navigate(["/home/app-role/" + app]);
  }

  /**
   * Elimina una aplicación
   * @param app Identificador de la aplicación
   */
  delete(app: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.appService.delete(app)
          .then(x => { this._snackBar.open("Aplicación eliminada correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar la aplicación", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
