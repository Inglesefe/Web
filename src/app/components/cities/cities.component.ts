import { Component, ViewChild } from '@angular/core';
import { City } from '../../entities/City';
import { MatPaginator } from '@angular/material/paginator';
import { CityService } from '../../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';
import { Country } from '../../entities/Country';
import { ApplicationService } from '../../services/application.service';
import { CountryService } from '../../services/country.service';

/**
 * Listado de ciudades
 */
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent extends GridBase<City> {

  /**
   * Paginador de la tabla
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Ordenamientos de la tabla
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * País al que pertenece la ciudad
   */
  private country: Country;

  /**
   * Inicializa el paginador, el ordenador y carga los datos
   * @param cityService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private cityService: CityService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog, private countryService: CountryService, private route: ActivatedRoute) {
    super(['id', 'code', 'name', 'offices', 'edit', 'delete'], snackBar, router,
      'country/' + route.snapshot.params["id"] +'/city', 'Adicionar nueva ciudad', 'Listado de ciudades',
      [{ field: 'ci.idcity', name: 'ID' }, { field: 'ci.code', name: 'Código' }, { field: 'ci.name', name: 'Nombre' }]);
    this.country = new Country();
    countryService.read(parseInt(route.snapshot.params["id"]))
      .then(x => {
        this.country = x;
        this._title = "Listado de ciudades del país " + x.name;
        this.loading = false;
      })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar la aplicación", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de ciudades
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "ci.idcity" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "ci.idcity asc";
    }
    this.cityService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de ciudades", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Redirecciona al listado de oficinas de la ciudad
   * @param country Identificador del país
   * @param city Identificador de la ciudad
   */
  offices(city: number) {
    this._router.navigate(["/home/countries/" + this.country.id + "/cities/" + city + "/offices"]);
  }

  /**
   * Elimina una ciudad
   * @param city Identificador de la ciudad
   */
  delete(city: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.cityService.delete(city)
          .then(x => { this._snackBar.open("Ciudad eliminada correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar la ciudad", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }

  /**
   * Retorna al listado de paises
   */
  back() {
    this._router.navigate(["/home/countries"]);
  }
}
