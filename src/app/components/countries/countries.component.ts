import { Component, ViewChild } from '@angular/core';
import { Country } from '../../entities/Country';
import { MatPaginator } from '@angular/material/paginator';
import { CountryService } from '../../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';

/**
 * Listado de paises
 */
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent extends GridBase<Country> {

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
   * @param countryService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private countryService: CountryService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog) {
    super(['id', 'code', 'name', 'cities', 'edit', 'delete'], snackBar, router,
      'country', 'Adicionar nuevo país', 'Listado de paises',
      [{ field: 'idcountry', name: 'ID' }, { field: 'code', name: 'Código' }, { field: 'name', name: 'Nombre' }]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de paises
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idcountry" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idcountry asc";
    }
    this.countryService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de paises", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Redirecciona al listado de ciudades del país
   * @param country Identificador del pais
   */
  cities(country: number) {
    this._router.navigate(["/home/countries/" + country + "/cities"]);
  }

  /**
   * Elimina un país
   * @param country Identificador del país
   */
  delete(country: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.countryService.delete(country)
          .then(x => { this._snackBar.open("País eliminado correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar el país", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }
}
