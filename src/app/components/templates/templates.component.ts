import { Component, ViewChild } from '@angular/core';
import { Template } from '../../entities/Template';
import { MatPaginator } from '@angular/material/paginator';
import { TemplateService } from '../../services/template.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';

/**
 * Listado de plantillas
 */
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent extends GridBase<Template> {

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
   * @param templateService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private templateService: TemplateService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'name', 'edit', 'delete'], snackBar, router,
      'template', 'Adicionar nueva plantilla', 'Listado de plantillas',
      [{ field: 'idtemplate', name: 'ID' }, { field: 'name', name: 'Nombre' }]);
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
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de plantillas", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
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
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar la plantilla", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
