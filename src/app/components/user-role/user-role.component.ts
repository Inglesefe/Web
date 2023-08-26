import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../entities/User';
import { Role } from '../../entities/Role';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TwoGridsRelatedBase } from '../TwoGridsRelatedBase';

/**
 * Listado de roles asignados y no asignados a un usuario
 */
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent extends TwoGridsRelatedBase<User, Role> {

  @ViewChild("paginatorNot") paginatorNot!: MatPaginator;
  @ViewChild(MatSort) sortNot!: MatSort;
  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Inicializa el componente
   * @param route Router de entrada del componente
   * @param router Router de salida del componente
   * @param userService Servicio para procesar los datos del usuario
   * @param _snackBar Notificador de mensajes
   */
  constructor(route: ActivatedRoute, router: Router, private userService: UserService, snackBar: MatSnackBar) {
    super(new User(), ['id', 'name'], route, router, snackBar, 'users');
    this._entity.id = parseInt(route.snapshot.params["id"]);
    this.loading = true;
    userService.read(this._entity.id)
      .then(x => { this._entity = x; this.title = "Roles asociados con el usuario: " + this._entity.name; this.loading = false; this.loadDataNot(); this.loadData(); })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el usuario", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Carga el listado de roles no asociados al usuario
   */
  loadDataNot() {
    this.loadingNot = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idrole" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idrole asc";
    }
    this.userService.listNotRoles(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this._entity.id)
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
   * Carga el listado de roles asociados al usuario
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "r.idrole" : "r." + this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "r.idrole asc";
    }
    this.userService.listRoles(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this._entity.id)
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
      this.userService.insertRole(role, this._entity.id)
        .then(r => { this._snackBar.open("Rol asignado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al asignar el rol al usuario", "Cerrar", { duration: 2000 });
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
      this.userService.deleteRole(event.item.data.id, this._entity.id)
        .then(r => { this._snackBar.open("Rol eliminado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al eliminar el rol al usuario", "Cerrar", { duration: 2000 });
          }
        });
    }
  }
}
