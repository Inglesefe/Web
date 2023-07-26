import { Component, Inject, ViewChild } from '@angular/core';
import { Application } from '../entities/Application';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApplicationService } from '../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const ELEMENT_DATA: Application[] = [
  { id: 1, name: 'Autenticación' },
  { id: 2, name: 'Otra cosa' }
];

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  loading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  dataSource: MatTableDataSource<Application> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fieldFilter: string = "";
  operatorFilter: string = "";
  valueFilter: string = "";
  filterStr: string = "";
  option: string = "";

  /**
   * Inicializa el servicio a la api de autenticación
   * @param userService
   */
  constructor(private appService: ApplicationService, private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    let orders: string = "";
    if (this.sort != undefined) {
      orders = (this.sort.active === "id" ? "idapplication" : this.sort.active) + " " + (this.sort.direction === "" ? "asc" : this.sort.direction);
    } else {
      orders = "idapplication asc";
    }
    this.appService.list(this.filterStr, orders, this.pageSize, this.currentPage * this.pageSize)
      .then(r => { this.totalRows = r.total; this.dataSource.data = r.list; this.loading = false; })
      .catch(() => { this._snackBar.open("Hubo un error al consultar el listado de aplicaciones", "Cerrar", { duration: 2000 }); this.loading = false; });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  sorted(sortState: Sort) {
    this.loadData();
  }

  add() {
    this.router.navigate(["/home/app/0"]);
  }

  edit(app: number) {
    this.router.navigate(["/home/app/" + app]);
  }

  delete(app: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { option: this.option }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "ok") {
        this.appService.delete(app)
          .then(x => { this._snackBar.open("Aplicación eliminada correctamente", "Cerrar", { duration: 2000 }); this.loadData(); })
          .catch(() => this._snackBar.open("Hubo un error al insertar la aplicación", "Cerrar", { duration: 2000 }))
      }
    });
  }

  filter() {
    if (this.fieldFilter !== "" && this.operatorFilter !== "" && this.valueFilter !== "") {
      this.filterStr = this.fieldFilter;
      switch (this.operatorFilter) {
        case "eq":
          this.filterStr += " = " + this.valueFilter;
          break;
        case "lt":
          this.filterStr += " < " + this.valueFilter;
          break;
        case "gt":
          this.filterStr += " > " + this.valueFilter;
          break;
        case "like":
          this.filterStr += " like %" + this.valueFilter + "%";
          break;
      }
      this.loadData();
    }
    else {
      this._snackBar.open("Debe diligenciar correctamente el filtro", "Cerrar", { duration: 2000 })
    }
  }

  clearFilter() {
    this.fieldFilter = "";
    this.operatorFilter = "";
    this.valueFilter = "";
    this.filterStr = "";
    this.loadData();
  }
}

@Component({
  selector: 'confirm-dialog',
  template: `<h1 mat-dialog-title>Confirmación</h1>
<div mat-dialog-content>
  ¿Desea eliminar este registro?
</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close (click)="cancel()">No</button>
  <button mat-button mat-dialog-close (click)="ok()" cdkFocusInitial>Si</button>
</div>`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmDialog>) { }

  cancel() {
    this.dialogRef.close("cancel");
  }

  ok() {
    this.dialogRef.close("ok");
  }
}
