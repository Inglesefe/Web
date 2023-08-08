import { Component } from '@angular/core';
import { Notification } from '../../entities/Notification';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Formulario de visualización de notificaciones
 */
@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.scss']
})
export class EditNotificationComponent {
  title: string = "";
  notification: Notification = new Notification();
  loading: boolean = false;

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param notificationService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService, private _snackBar: MatSnackBar) {
    this.notification.id = parseInt(route.snapshot.params["id"]);
    this.loading = true;
    notificationService.read(this.notification.id)
      .then(x => { this.notification = x; this.title = "Ver notificación: " + this.notification.id; this.loading = false; })
      .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar la notificación", "Cerrar", { duration: 2000 }); } this.loading = false; });
  }

  /**
   * Retorna al listado de notificaciones
   */
  back() {
    this.router.navigate(["/home/notifications"]);
  }
}
