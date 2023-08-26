import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApplicationService } from '../../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';
import { Role } from '../../entities/Role';
import { RoleService } from '../../services/role.service';

/**
 * Listado de roles
 */
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends GridBase<Role> {

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
   * @param roleService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private roleService: RoleService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'name', 'apps', 'users', 'edit', 'delete'], snackBar, router,
      'role', 'Adicionar nuevo rol', 'Listado de roles',
      [{ field: 'idrole', name: 'ID' }, { field: 'name', name: 'Nombre' }]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de roles
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idrole" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idrole asc";
    }
    this.roleService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de roles", "Cerrar", { duration: 2000 });
        } this.loading = false;
      });
  }

  /**
   * Redirecciona al listado de aplicaciones asociadas y no asociadas al rol
   * @param role Identificador del rol
   */
  apps(role: number) {
    this._router.navigate(["/home/role-app/" + role]);
  }

  /**
   * Redirecciona al listado de usuarios asociados y no asociados al rol
   * @param role Identificador del rol
   */
  users(role: number) {
    this._router.navigate(["/home/role-user/" + role]);
  }

  /**
   * Elimina un rol
   * @param role Identificador del rol
   */
  delete(role: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.roleService.delete(role)
          .then(x => { this._snackBar.open("Rol eliminado correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar el rol", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
