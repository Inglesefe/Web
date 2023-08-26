import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Formulario de inserción y edición de notificaciones
 */
@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html'
})
export class EditNotificationComponent extends FormBase {
  title: string = "";
  content: string = "alguna cosa";
  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param notificationService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private notificationService: NotificationService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      date: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    }), snackBar, router, 'notifications')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nueva notificación";
      this._form.setValue({ id: 0, date: '' });
    }
    else {
      this.loading = true;
      notificationService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Ver notificación: " + x.id;
          this._form.setValue(x);
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar la aplicación", "Cerrar", { duration: 2000 });
          } this.loading = false;
        });
    }
  }

  /**
   * Retorna al listado
   */
  submit() {
    this._router.navigate(["/home/" + this._pathParent])
  }
}
