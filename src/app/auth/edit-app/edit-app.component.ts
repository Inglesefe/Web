import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { Application } from '../entities/Application';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent {
  title: string = "";
  app: Application = new Application();
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private appService: ApplicationService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nueva aplicación";
    }
    else {
      this.app.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      appService.read(this.app.id)
        .then(x => { this.app = x; this.title = "Editar aplicación: " + this.app.name; this.loading = false; })
        .catch(() => { this._snackBar.open("Hubo un error al consultar el listado de aplicaciones", "Cerrar", { duration: 2000 }); this.loading = false; });
    }
  }

  back() {
    this.router.navigate(["/home/apps"]);
  }

  save() {
    if (this.app.id === 0) {//Insertar
      this.loading = true;
      this.appService.insert(this.app)
        .then(x => {
          this.app = x;
          this._snackBar.open("Aplicación insertada correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/apps"]) }, 2000);
        })
        .catch(() => { this._snackBar.open("Hubo un error al insertar la aplicación", "Cerrar", { duration: 2000 }); this.loading = false; });
    } else {//Actualizar
      this.loading = true;
      this.appService.update(this.app)
        .then(x => {
          this.app = x;
          this._snackBar.open("Aplicación actualizada correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/apps"]) }, 2000);
        })
        .catch(() => { this._snackBar.open("Hubo un error al actualizar la aplicación", "Cerrar", { duration: 2000 }); this.loading = false; });
    }
  }
}
