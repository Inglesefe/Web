import { Component, ViewChild } from '@angular/core';
import { User } from '../../entities/User';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';

/**
 * Listado de usuarios
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends GridBase<User> {

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
   * @param userService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private userService: UserService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'login', 'name', 'active', 'roles', 'edit', 'delete'], snackBar, router,
      'user', 'Adicionar nuevo usuario', 'Listado de usuarios',
      [{ field: 'iduser', name: 'ID' }, { field: 'login', name: 'Login' }, { field: 'name', name: 'Nombre' }, { field: 'active', name: 'Activo' }]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de usuarios
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "iduser" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "iduser asc";
    }
    this.userService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de usuarios", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Redirecciona al listado de roles asociados y no asociados al usuario
   * @param user Identificador del usuario
   */
  roles(user: number) {
    this._router.navigate(["/home/user-role/" + user]);
  }

  /**
   * Elimina un usuario
   * @param user Identificador del usuario
   */
  delete(user: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.userService.delete(user)
          .then(x => { this._snackBar.open("Usuario eliminado correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar el usuario", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
