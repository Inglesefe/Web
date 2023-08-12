import { Component } from '@angular/core';
import { Country } from '../../entities/Country';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent {
  title: string = "";
  country: Country = new Country();
  loading: boolean = false;

  /**
   * Incializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param countryService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, private router: Router, private countryService: CountryService, private _snackBar: MatSnackBar) {
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo país";
    }
    else {
      this.country.id = parseInt(route.snapshot.params["id"]);
      this.loading = true;
      countryService.read(this.country.id)
        .then(x => { this.country = x; this.title = "Editar país: " + this.country.name; this.loading = false; })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al consultar el país", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }

  /**
   * Retorna al listado de países
   */
  back() {
    this.router.navigate(["/home/countries"]);
  }

  /**
   * Inserta o actualiza el país
   */
  save() {
    if (this.country.id === 0) {//Insertar
      this.loading = true;
      this.countryService.insert(this.country)
        .then(x => {
          this.country = x;
          this._snackBar.open("País insertado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/countries"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al insertar el país", "Cerrar", { duration: 2000 }); } this.loading = false; });
    } else {//Actualizar
      this.loading = true;
      this.countryService.update(this.country)
        .then(x => {
          this.country = x;
          this._snackBar.open("País actualizado correctamente", "Cerrar", { duration: 2000 });
          setTimeout(() => { this.loading = false; this.router.navigate(["/home/countries"]) }, 2000);
        })
        .catch(r => { if (r.status === 403) { this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 }) } else { this._snackBar.open("Hubo un error al actualizar el país", "Cerrar", { duration: 2000 }); } this.loading = false; });
    }
  }
}
