import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Application } from '../../entities/Application';
import { Role } from '../../entities/Role';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TwoGridsRelatedBase } from '../TwoGridsRelatedBase';
import { RoleService } from '../../services/role.service';

/**
 * Listado de aplicaciones asignadas y no asignadas a un rol
 */
@Component({
  selector: 'app-role-app',
  templateUrl: './role-app.component.html',
  styleUrls: ['./role-app.component.scss']
})
export class RoleAppComponent extends TwoGridsRelatedBase<Role, Application> {

  @ViewChild("paginatorNot") paginatorNot!: MatPaginator;
  @ViewChild(MatSort) sortNot!: MatSort;
  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Inicializa el componente
   * @param route Router de entrada del componente
   * @param router Router de salida del componente
   * @param roleService Servicio para procesar los datos del rol
   * @param _snackBar Notificador de mensajes
   */
  constructor(route: ActivatedRoute, router: Router, private roleService: RoleService, snackBar: MatSnackBar) {
    super(new Role(), ['id', 'name'], route, router, snackBar, 'roles');
    this._entity.id = parseInt(route.snapshot.params["id"]);
    this.loading = true;
    roleService.read(this._entity.id)
      .then(x => { this._entity = x; this.title = "Aplicaciones asociadas con el rol: " + this._entity.name; this.loading = false; this.loadDataNot(); this.loadData(); })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el rol", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Carga el listado de aplicaciones no asociadas al rol
   */
  loadDataNot() {
    this.loadingNot = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idapplication" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idapplication asc";
    }
    this.roleService.listNotApplications(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this._entity.id)
      .then(r => { this.totalRowsNot = r.total; this.dataSourceNot.data = r.list; this.loadingNot = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de aplicaciones no asignadas", "Cerrar", { duration: 2000 });
        }
        this.loadingNot = false;
      });
  }

  /**
   * Carga el listado de aplicaciones asociadas al rol
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "a.idapplication" : "a." + this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "a.idapplication asc";
    }
    this.roleService.listApplications(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this._entity.id)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de aplicaciones asignadas", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Inserta una aplicación a las asignadas
   * @param event Datos de la aplicación a insertar
   */
  insert(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      let app = new Application();
      app.id = event.item.data.id;
      app.name = event.item.data.name;
      this.roleService.insertApplication(app, this._entity.id)
        .then(r => { this._snackBar.open("Aplicación asignada con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al asignar la aplicación al rol", "Cerrar", { duration: 2000 });
          }
        });
    }
  }

  /**
   * Elimina una aplicación de las asignadas
   * @param event Datos de la aplicación a eliminar
   */
  delete(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      this.roleService.deleteApplication(event.item.data.id, this._entity.id)
        .then(r => { this._snackBar.open("Aplicación eliminada con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al eliminar la aplicación del rol", "Cerrar", { duration: 2000 });
          }
        });
    }
  }
}
