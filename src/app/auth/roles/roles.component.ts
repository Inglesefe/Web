import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../utils/confirm/confirm.component';
import { Role } from '../entities/Role';
import { RoleService } from '../services/role.service';

/**
 * Listado de roles
 */
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  displayedColumns: string[] = ['id', 'name', 'users', 'apps', 'edit', 'delete'];
  loading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fieldFilter: string = "";
  operatorFilter: string = "";
  valueFilter: string = "";
  filterStr: string = "";

  /**
   * Inicializa el paginador, el ordenador y carga los datos
   * @param roleService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private roleService: RoleService, private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {
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
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el listado de roles", "Cerrar", { duration: 2000 }); } this.loading = false; });
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
    this.router.navigate(["/home/role/0"]);
  }

  /**
   * Redirecciona al listado de usuarios asociados y no asociados al rol
   * @param role Identificador del rol
   */
  users(role: number) {
    this.router.navigate(["/home/role-user/" + role]);
  }

  /**
   * Redirecciona al listado de aplicaciones asociadas y no asociadas al rol
   * @param role Identificador del rol
   */
  apps(role: number) {
    this.router.navigate(["/home/role-app/" + role]);
  }

  /**
   * Redirecciona al formulario de edición de rol
   * @param role Identificador del rol
   */
  edit(role: number) {
    this.router.navigate(["/home/role/" + role]);
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
          .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al eliminar el rol", "Cerrar", { duration: 2000 }); } })
      }
    });
  }

  /**
   * Aplica filtros al listado de roles
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
