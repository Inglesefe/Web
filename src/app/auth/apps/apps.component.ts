import { Component, ViewChild } from '@angular/core';
import { Application } from '../../entities/Application';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApplicationService } from '../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../utils/confirm/confirm.component';

/**
 * Listado de aplicaciones
 */
@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  displayedColumns: string[] = ['id', 'name', 'roles', 'edit', 'delete'];
  loading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  dataSource: MatTableDataSource<Application> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fieldFilter: string = "";
  operatorFilter: string = "";
  valueFilter: string = "";
  filterStr: string = "";

  /**
   * Inicializa el paginador, el ordenador y carga los datos
   * @param appService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private appService: ApplicationService, private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {
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
   * Cambio de página en el paginador
   * @param event Datos del cambio de página
   */
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  /**
   * Consulta el listado nuevamente con el ordenamiento actual
   */
  sorted() {
    this.loadData();
  }

  /**
   * Redirecciona al formulario de adición
   */
  add() {
    this.router.navigate(["/home/app/0"]);
  }

  /**
   * Redirecciona al listado de roles asociados y no asociados a la aplicación
   * @param app Identificador de la aplicación
   */
  roles(app: number) {
    this.router.navigate(["/home/app-role/" + app]);
  }

  /**
   * Redirecciona al formulario de edición de aplicación
   * @param app Identificador de la aplicación
   */
  edit(app: number) {
    this.router.navigate(["/home/app/" + app]);
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
          .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al eliminar la aplicación", "Cerrar", { duration: 2000 }); } })
      }
    });
  }

  /**
   * Aplica filtros al listado de aplicaciones
   */
  filter() {
    if (this.fieldFilter !== "" && this.operatorFilter !== "" && this.valueFilter !== "") {
      this.filterStr = this.fieldFilter;
      switch (this.operatorFilter) {
        case "eq":
          this.filterStr += " = " + this.valueFilter;
          break;
        case "lt":
          this.filterStr += " < " + this.valueFilter;
          break;
        case "gt":
          this.filterStr += " > " + this.valueFilter;
          break;
        case "like":
          this.filterStr += " like '%" + this.valueFilter + "%'";
          break;
      }
      this.loadData();
    }
    else {
      this._snackBar.open("Debe diligenciar correctamente el filtro", "Cerrar", { duration: 2000 })
    }
  }

  /**
   * Reestablece los filtros
   */
  clearFilter() {
    this.fieldFilter = "";
    this.operatorFilter = "";
    this.valueFilter = "";
    this.filterStr = "";
    this.loadData();
  }
}
