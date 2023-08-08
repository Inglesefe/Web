import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Application } from '../../entities/Application';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../../entities/Role';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

/**
 * Listado de roles asignados y no asignados a una aplicación
 */
@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.scss']
})
export class AppRoleComponent {
  app: Application = new Application();
  loading: boolean = false;
  loadingNot: boolean = false;
  title: string = "";
  displayedColumns: string[] = ['id', 'name'];
  dataSourceNot: MatTableDataSource<Role> = new MatTableDataSource();
  totalRowsNot = 0;
  pageSizeNot = 25;
  currentPageNot = 0;
  @ViewChild("paginatorNot") paginatorNot!: MatPaginator;
  @ViewChild(MatSort) sortNot!: MatSort;
  fieldFilterNot: string = "";
  operatorFilterNot: string = "";
  valueFilterNot: string = "";
  filterStrNot: string = "";
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fieldFilter: string = "";
  operatorFilter: string = "";
  valueFilter: string = "";
  filterStr: string = "";

  /**
   * Inicializa el componente
   * @param route Router de entrada del componente
   * @param router Router de salida del componente
   * @param appService Servicio para procesar los datos de la aplicación
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private appService: ApplicationService, private _snackBar: MatSnackBar) {
    this.app.id = parseInt(route.snapshot.params["id"]);
    this.loading = true;
    appService.read(this.app.id)
      .then(x => { this.app = x; this.title = "Roles asociados con la aplicación: " + this.app.name; this.loading = false; this.loadDataNot(); this.loadData(); })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar la aplicación", "Cerrar", { duration: 2000 }); } this.loading = false; });
  }

  /**
   * Retorna al listado de aplicaciones
   */
  back() {
    this.router.navigate(["/home/apps"]);
  }

  /**
   * Carga el listado de roles no asociados a la aplicación
   */
  loadDataNot() {
    this.loadingNot = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idrole" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idrole asc";
    }
    this.appService.listNotRoles(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this.app.id)
      .then(r => { this.totalRowsNot = r.total; this.dataSourceNot.data = r.list; this.loadingNot = false; })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el listado de roles no asignados", "Cerrar", { duration: 2000 }); } this.loadingNot = false; });
  }

  /**
   * Cambio de paginación del listado de roles no asignados
   */
  pageChangedNot(event: PageEvent) {
    this.pageSizeNot = event.pageSize;
    this.currentPageNot = event.pageIndex;
    this.loadDataNot();
  }

  /**
   * Ordena el listado de roles no asignados
   */
  sortedNot() {
    this.loadDataNot();
  }

  /**
   * Carga el listado de roles asociados a la aplicación
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "r.idrole" : "r." + this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "r.idrole asc";
    }
    this.appService.listRoles(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this.app.id)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el listado de roles asignados", "Cerrar", { duration: 2000 }); } this.loading = false; });
  }

  /**
   * Cambio de paginación del listado de roles asignados
   */
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  /**
   * Ordena el listado de roles asignados
   */
  sorted() {
    this.loadData();
  }

  /**
   * Inserta un rol a los asignados
   * @param event Datos del rol a insertar
   */
  insertRole(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      let role = new Role();
      role.id = event.item.data.id;
      role.name = event.item.data.name;
      this.appService.insertRole(role, this.app.id)
        .then(r => { this._snackBar.open("Rol asignado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al asignar el rol a la aplicación", "Cerrar", { duration: 2000 }); } });
    }
  }

  /**
   * Elimina un rol de los asignados
   * @param event Datos del rol a eliminar
   */
  deleteRole(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      this.appService.deleteRole(event.item.data.id, this.app.id)
        .then(r => { this._snackBar.open("Rol eliminado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al eliminar el rol a la aplicación", "Cerrar", { duration: 2000 }); } });
    }
  }
}
