import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../entities/User';
import { UserService } from '../services/user.service';

/**
 * Formulario de inserción y edición de usuarios
 */
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  title: string = "";
  user: User = new User();
  currentActive: string = "false"
  loading: boolean = false;

  /**
   * Incializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param userService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo usuario";
    }
    else {
      this.user.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      userService.read(this.user.id)
        .then(x => { this.user = x; this.title = "Editar usuario: " + this.user.login; this.loading = false; this.currentActive = this.user.active ? "true" : "false"; })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el usuario", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }

  /**
   * Retorna al listado de usuarios
   */
  back() {
    this.router.navigate(["/home/users"]);
  }

  /**
   * Inserta o actualiza el usuario
   */
  save() {
    if (this.user.id === 0) {//Insertar
      this.loading = true;
      this.user.active = this.currentActive === "true";
      this.userService.insert(this.user)
        .then(x => {
          this.user = x;
          this.currentActive = this.user.active ? "true" : "false";
          this._snackBar.open("Usuario insertado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/users"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al insertar el usuario", "Cerrar", { duration: 2000 }); } this.loading = false; });
    } else {//Actualizar
      this.loading = true;
      this.userService.update(this.user)
        .then(x => {
          this.user = x;
          this.currentActive = this.user.active ? "true" : "false";
          this._snackBar.open("Usuario actualizado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/users"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al actualizar el usuario", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }
}
