import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../entities/User';
import { Role } from '../../entities/Role';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TwoGridsRelatedBase } from '../TwoGridsRelatedBase';
import { RoleService } from '../../services/role.service';

/**
 * Listado de usaurios asignados y no asignados a un rol
 */
@Component({
  selector: 'app-role-user',
  templateUrl: './role-user.component.html',
  styleUrls: ['./role-user.component.scss']
})
export class RoleUserComponent extends TwoGridsRelatedBase<Role, User> {

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
    super(new User(), ['id', 'login', 'name'], route, router, snackBar, 'roles');
    this._entity.id = parseInt(route.snapshot.params["id"]);
    this.loading = true;
    roleService.read(this._entity.id)
      .then(x => { this._entity = x; this.title = "Uusarios asociados con el rol: " + this._entity.name; this.loading = false; this.loadDataNot(); this.loadData(); })
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
   * Carga el listado de usuarios no asociados al rol
   */
  loadDataNot() {
    this.loadingNot = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "iduser" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "iduser asc";
    }
    this.roleService.listNotUsers(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this._entity.id)
      .then(r => { this.totalRowsNot = r.total; this.dataSourceNot.data = r.list; this.loadingNot = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de usuarios no asignados", "Cerrar", { duration: 2000 });
        }
        this.loadingNot = false;
      });
  }

  /**
   * Carga el listado de usuarios asociados al rol
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "u.iduser" : "u." + this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "u.iduser asc";
    }
    this.roleService.listUsers(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this._entity.id)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de usuarios asignados", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Inserta un usuario a los asignados
   * @param event Datos del usuario a insertar
   */
  insert(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      let user = new User();
      user.id = event.item.data.id;
      user.login = event.item.data.login;
      user.name = event.item.data.name;
      this.roleService.insertUser(user, this._entity.id)
        .then(r => { this._snackBar.open("Usuario asignado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al asignar el usuario al rol", "Cerrar", { duration: 2000 });
          }
        });
    }
  }

  /**
   * Elimina un usuario de las asignados
   * @param event Datos del usuario a eliminar
   */
  delete(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      this.roleService.deleteUser(event.item.data.id, this._entity.id)
        .then(r => { this._snackBar.open("Usuario eliminado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al eliminar el usuario del rol", "Cerrar", { duration: 2000 });
          }
        });
    }
  }
}
