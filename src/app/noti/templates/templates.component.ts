import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Template } from '../../entities/Template';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TemplateService } from '../services/template.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../utils/confirm/confirm.component';

/**
 * Listado de plantillas
 */
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  loading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  dataSource: MatTableDataSource<Template> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fieldFilter: string = "";
  operatorFilter: string = "";
  valueFilter: string = "";
  filterStr: string = "";

  /**
   * Inicializa el paginador, el ordenador y carga los datos
   * @param templateService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private templateService: TemplateService, private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de plantillas
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idtemplate" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idtemplate asc";
    }
    this.templateService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el listado de plantillas", "Cerrar", { duration: 2000 }); } this.loading = false; });
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
    this.router.navigate(["/home/template/0"]);
  }

  /**
   * Redirecciona al formulario de edición de plantilla
   * @param template Identificador de la plantilla
   */
  edit(template: number) {
    this.router.navigate(["/home/template/" + template]);
  }

  /**
   * Elimina una plantilla
   * @param template Identificador de la plantilla
   */
  delete(template: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.templateService.delete(template)
          .then(x => { this._snackBar.open("Plantilla eliminada correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al eliminar la plantilla", "Cerrar", { duration: 2000 }); } })
      }
    });
  }

  /**
   * Aplica filtros al listado de plantillas
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
