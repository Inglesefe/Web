import { Component, ViewChild } from '@angular/core';
import { Notification } from '../../entities/Notification';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from '../../services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';

/**
 * Listado de aplicaciones
 */
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends GridBase<Notification> {

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
   * @param notificationService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private notificationService: NotificationService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'date', 'to', 'subject', 'view'], snackBar, router,
      'notification', 'Adicionar nueva notificación', 'Listado de notificaciones',
      [{ field: 'idnotification', name: 'ID' }, { field: 'date', name: 'Fecha' }, { field: 'to', name: 'Destinatario' }, { field: 'subject', name: 'Asunto' }]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de notificaciones
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idnotification" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idnotification asc";
    }
    this.notificationService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de notificaciones", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Elimina una notificación
   * @param notification Identificador de la notificación
   */
  delete(notification: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.notificationService.delete(notification)
          .then(x => { this._snackBar.open("Notificación eliminada correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar la notificación", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
