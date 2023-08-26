import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { EntityBase } from "../entities/EntityBase";
import { MatTableDataSource } from "@angular/material/table";
import { PageEvent } from "@angular/material/paginator";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

/**
 * Tabla de datos base
 */
export abstract class TwoGridsRelatedBase<T extends EntityBase, K extends EntityBase> {

  /**
   * Entidad padre de la relación con otra entidad
   */
  protected _entity: T;

  /**
   * Si se está cargando el listado de entidades relacionadas
   */
  protected loading: boolean;

  /**
   * Fuente de datos de la tabla de no relacionados
   */
  protected dataSourceNot: MatTableDataSource<K>;

  /**
   * Fuente de datos de la tabla de relacionados
   */
  protected dataSource: MatTableDataSource<K>;

  /**
   * Si se está cargando el listado de entidades no relacionadas
   */
  protected loadingNot: boolean;

  /**
   * Título de la relación de entidades
   */
  protected title: string;

  /**
   * Columnas que se muestran en las dos tablas
   */
  protected _displayedColumns: string[];

  /**
   * Número total de registros de la tabla de no relacionados
   */
  protected totalRowsNot;

  /**
   * Número de registros que se muestran en la tabla de no relacionados
   */
  protected pageSizeNot;

  /**
   * Página actual de la tabla de no relacionados
   */
  protected currentPageNot;

  /**
   * Campo por el que se filtra en la tabla de no relacionados
   */
  protected fieldFilterNot: string;

  /**
   * Operador aplicado en el filtro de la tabla de no relacionados
   */
  protected operatorFilterNot: string;

  /**
   * Valor por el que se filtra en la tabla de no relacionados
   */
  protected valueFilterNot: string;

  /**
   * Valor enviado a la API para filtrar la tabla de no relacionados
   */
  protected filterStrNot: string;

  /**
   * Número total de registros de la tabla de relacionados
   */
  protected totalRows;

  /**
   * Número de registros que se muestran en la tabla de relacionados
   */
  protected pageSize;

  /**
   * Página actual de la tabla de relacionados
   */
  protected currentPage;

  /**
   * Campo por el que se filtra en la tabla de relacionados
   */
  protected fieldFilter: string;

  /**
   * Operador aplicado en el filtro de la tabla de relacionados
   */
  protected operatorFilter: string;

  /**
   * Valor por el que se filtra en la tabla de relacionados
   */
  protected valueFilter: string;

  /**
   * Valor enviado a la API para filtrar la tabla de relacionados
   */
  protected filterStr: string;

  /**
   * Router entrante
   */
  protected _route: ActivatedRoute;

  /**
   * Router de salida
   */
  protected _router: Router;

  /**
   * Notificador de mensajes
   */
  protected _snackBar: MatSnackBar

  /**
   * Ruta a la que debe volver
   */
  protected _pathParent: string;

  /**
   * Inicializa los valores
   */
  constructor(entity: T, displayedColumns: string[], route: ActivatedRoute, router: Router, snackBar: MatSnackBar, pathParent: string) {
    this._entity = entity;
    this._displayedColumns = displayedColumns;
    this._route = route;
    this._router = router;
    this._snackBar = snackBar;
    this._pathParent = pathParent;

    this.dataSourceNot = new MatTableDataSource();
    this.dataSource = new MatTableDataSource();
    this.loading = false;
    this.loadingNot = false;
    this.title = "";
    this.totalRowsNot = 0;
    this.pageSizeNot = 25;
    this.currentPageNot = 0;
    this.fieldFilterNot = "";
    this.operatorFilterNot = "";
    this.valueFilterNot = "";
    this.filterStrNot = "";
    this.totalRows = 0;
    this.pageSize = 25;
    this.currentPage = 0;
    this.fieldFilter = "";
    this.operatorFilter = "";
    this.valueFilter = "";
    this.filterStr = "";
  }

  /**
   * Retorna al listado de aplicaciones
   */
  back() {
    this._router.navigate(["/home/" + this._pathParent]);
  }

  /**
   * Debe tener una función que cargue el listado de datos no relacionados
   */
  protected abstract loadDataNot(): void;

  /**
   * Debe tener una función que cargue el listado de datos relacionados
   */
  protected abstract loadData(): void;

  /**
   * Cambio de paginación del listado de roles no asignados
   */
  protected pageChangedNot(event: PageEvent) {
    this.pageSizeNot = event.pageSize;
    this.currentPageNot = event.pageIndex;
    this.loadDataNot();
  }

  /**
   * Ordena el listado de roles no asignados
   */
  protected sortedNot() {
    this.loadDataNot();
  }

  /**
   * Cambio de paginación del listado de roles asignados
   */
  protected pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  /**
   * Ordena el listado de roles asignados
   */
  protected sorted() {
    this.loadData();
  }

  /**
   * Debe tener una función de insertado a la tabla de relacionados
   * @param event Datos del Drag and drop al pasar de la tabla de no relacionados a la de relacionados
   */
  protected abstract insert(event: CdkDragDrop<string[]>): void;

  /**
   * Debe tener una función de eliminar de la tabla de relacionados
   * @param event Datos del Drag and drop al pasar de la tabla de relacionados a la de no relacionados
   */
  protected abstract delete(event: CdkDragDrop<string[]>): void;
}
