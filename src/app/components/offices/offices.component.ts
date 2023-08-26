import { Component, ViewChild } from '@angular/core';
import { Office } from '../../entities/Office';
import { MatPaginator } from '@angular/material/paginator';
import { OfficeService } from '../../services/office.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../utils/confirm/confirm.component';
import { GridBase } from '../GridBase';
import { Country } from '../../entities/Country';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { City } from '../../entities/City';

/**
 * Listado de ciudades
 */
@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent extends GridBase<Office> {

  /**
   * Paginador de la tabla
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Ordenamientos de la tabla
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Ciudad a la que pertenece la oficina
   */
  private city: City;

  /**
   * Inicializa el paginador, el ordenador y carga los datos
   * @param officeService Servicio para consultar los datos
   * @param _snackBar Notificador de mensajes
   * @param router Enrutador
   * @param dialog Mensaje de confirmación
   */
  constructor(private officeService: OfficeService, snackBar: MatSnackBar, router: Router, public dialog: MatDialog, private cityService: CityService, private route: ActivatedRoute) {
    super(['id', 'name', 'address', 'edit', 'delete'], snackBar, router,
      'country/' + route.snapshot.params["id"] + '/city/' + route.snapshot.params["id1"] + '/office', 'Adicionar nueva oficina', 'Listado de oficinas',
      [{ field: 'o.idoffice', name: 'ID' }, { field: 'o.name', name: 'Nombre' }, { field: 'o.address', name: 'Dirección' }]);
    this.city = new City();
    cityService.read(parseInt(route.snapshot.params["id1"]))
      .then(x => {
        this.city = x;
        this._title = "Listado de oficinas de la ciudad " + x.name;
        this.loading = false;
      })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar la ciudad", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  /**
   * Carga el listado de oficinas
   */
  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "o.idoffice" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "o.idoffice asc";
    }
    this.officeService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(r => {
        if (r.status === 403) {
          this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
        } else {
          this._snackBar.open("Hubo un error al consultar el listado de oficinas", "Cerrar", { duration: 2000 });
        }
        this.loading = false;
      });
  }

  /**
   * Elimina una oficina
   * @param office Identificador de la oficina
   */
  delete(office: number) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.officeService.delete(office)
          .then(x => { this._snackBar.open("Oficina eliminada correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(r => {
            if (r.status === 403) {
              this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
            } else {
              this._snackBar.open("Hubo un error al eliminar la oficina", "Cerrar", { duration: 2000 });
            }
          })
      }
    });
  }

  /**
   * Retorna al listado de paises
   */
  back() {
    this._router.navigate(["/home/countries/" + this.route.snapshot.params["id"] + '/cities/']);
  }
}
