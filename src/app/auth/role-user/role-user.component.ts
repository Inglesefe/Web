import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../entities/Role';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RoleService } from '../services/role.service';
import { User } from '../entities/User';

/**
 * Listado de roles asignados y no asignados a una aplicación
 */
@Component({
  selector: 'app-role-user',
  templateUrl: './role-user.component.html',
  styleUrls: ['./role-user.component.scss']
})
export class RoleUserComponent {
  role: Role = new Role();
  loading: boolean = false;
  loadingNot: boolean = false;
  title: string = "";
  displayedColumns: string[] = ['id', 'login'];
  dataSourceNot: MatTableDataSource<User> = new MatTableDataSource();
  totalRowsNot = 0;
  pageSizeNot = 25;
  currentPageNot = 0;
  @ViewChild("paginatorNot") paginatorNot!: MatPaginator;
  @ViewChild(MatSort) sortNot!: MatSort;
  fieldFilterNot: string = "";
  operatorFilterNot: string = "";
  valueFilterNot: string = "";
  filterStrNot: string = "";
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
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
   * @param roleService Servicio para procesar los datos de la aplicación
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private roleService: RoleService, private _snackBar: MatSnackBar) {
    this.role.id = parseInt(route.snapshot.params["id"]);
    this.loading = true;
    roleService.read(this.role.id)
      .then(x => { this.role = x; this.title = "Usuarios asociados con el rol: " + this.role.name; this.loading = false; this.loadDataNot(); this.loadData(); })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el rol", "Cerrar", { duration: 2000 }); } this.loading = false; });
  }

  /**
   * Retorna al listado de roles
   */
  back() {
    this.router.navigate(["/home/roles"]);
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
    this.roleService.listNotUsers(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this.role.id)
      .then(r => { this.totalRowsNot = r.total; this.dataSourceNot.data = r.list; this.loadingNot = false; })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el listado de usuarios no asignados", "Cerrar", { duration: 2000 }); } this.loadingNot = false; });
  }

  /**
   * Cambio de paginación del listado de usuarios no asignados
   */
  pageChangedNot(event: PageEvent) {
    this.pageSizeNot = event.pageSize;
    this.currentPageNot = event.pageIndex;
    this.loadDataNot();
  }

  /**
   * Ordena el listado de usuarios no asignados
   */
  sortedNot() {
    this.loadDataNot();
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
    this.roleService.listUsers(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize, this.role.id)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el listado de usuarios asignados", "Cerrar", { duration: 2000 }); } this.loading = false; });
  }

  /**
   * Cambio de paginación del listado de usuarios asignados
   */
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  /**
   * Ordena el listado de usuarios asignados
   */
  sorted() {
    this.loadData();
  }

  /**
   * Inserta un usuario a los asignados
   * @param event Datos del usuario a insertar
   */
  insertUser(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      let user = new User();
      user.id = event.item.data.id;
      user.login = event.item.data.login;
      this.roleService.insertUser(user, this.role.id)
        .then(r => { this._snackBar.open("Usuario asignado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al asignar el usuario al rol", "Cerrar", { duration: 2000 }); } });
    }
  }

  /**
   * Elimina un usuario de los asignados
   * @param event Datos del usuario a eliminar
   */
  deleteUser(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      this.roleService.deleteUser(event.item.data.id, this.role.id)
        .then(r => { this._snackBar.open("Usuario eliminado con éxito", "Cerrar", { duration: 2000 }); this.loadData(); this.loadDataNot(); })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al eliminar el usuario del rol", "Cerrar", { duration: 2000 }); } });
    }
  }
}
