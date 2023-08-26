import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Application } from '../../entities/Application';
import { Role } from '../../entities/Role';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TwoGridsRelatedBase } from '../TwoGridsRelatedBase';

/**
 * Listado de roles asignados y no asignados a una aplicación
 */
@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.scss']
})
export class AppRoleComponent extends TwoGridsRelatedBase<Application, Role> {

  @ViewChild("paginatorNot") paginatorNot!: MatPaginator;
  @ViewChild(MatSort) sortNot!: MatSort;
  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Inicializa el componente
   * @param route Router de entrada del componente
   * @param router Router de salida del componente
   * @param appService Servicio para procesar los datos de la aplicación
   * @param _snackBar Notificador de mensajes
   */
  constructor(route: ActivatedRoute, router: Router, private appService: ApplicationService, snackBar: MatSnackBar) {
    super(new Application(), ['id', 'name'], route, router, snackBar, 'apps');
    this._entity.id = parseInt(route.snapshot.params["id"]);
    this.loading = true;
    appService.read(this._entity.id)
      .then(x => { this._entity = x; this.title = "Roles asociados con la aplicación: " + this._entity.name; this.loading = false; this.loadDataNot(); this.loadData(); })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar la aplicación", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
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
    this.appService.listNotRoles(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this._entity.id)
      .then(r => { this.totalRowsNot = r.total; this.dataSourceNot.data = r.list; this.loadingNot = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de roles no asignados", "Cerrar", { duration: 2000 });
        }
        this.loadingNot = false;
      });
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
    this.appService.listRoles(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this._entity.id)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de roles asignados", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Inserta un rol a los asignados
   * @param event Datos del rol a insertar
   */
  insert(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      let role = new Role();
      role.id = event.item.data.id;
      role.name = event.item.data.name;
      this.appService.insertRole(role, this._entity.id)
        .then(r => { this._snackBar.open("Rol asignado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al asignar el rol a la aplicación", "Cerrar", { duration: 2000 });
          }
        });
    }
  }

  /**
   * Elimina un rol de los asignados
   * @param event Datos del rol a eliminar
   */
  delete(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      this.appService.deleteRole(event.item.data.id, this._entity.id)
        .then(r => { this._snackBar.open("Rol eliminado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al eliminar el rol a la aplicación", "Cerrar", { duration: 2000 });
          }
        });
    }
  }
}
