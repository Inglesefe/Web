import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../entities/Role';
import { RoleService } from '../services/role.service';

/**
 * Formulario de inserción y edición de roles
 */
@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent {
  title: string = "";
  role: Role = new Role();
  loading: boolean = false;

  /**
   * Incializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param roleService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private roleService: RoleService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo rol";
    }
    else {
      this.role.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      roleService.read(this.role.id)
        .then(x => { this.role = x; this.title = "Editar rol: " + this.role.name; this.loading = false; })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el rol", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }

  /**
   * Retorna al listado de roles
   */
  back() {
    this.router.navigate(["/home/roles"]);
  }

  /**
   * Inserta o actualiza el rol
   */
  save() {
    if (this.role.id === 0) {//Insertar
      this.loading = true;
      this.roleService.insert(this.role)
        .then(x => {
          this.role = x;
          this._snackBar.open("Rol insertado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/roles"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al insertar el rol", "Cerrar", { duration: 2000 }); } this.loading = false; });
    } else {//Actualizar
      this.loading = true;
      this.roleService.update(this.role)
        .then(x => {
          this.role = x;
          this._snackBar.open("Rol actualizado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/roles"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al actualizar el rol", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }
}
