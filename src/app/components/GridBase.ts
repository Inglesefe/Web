import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { EntityBase } from "../entities/EntityBase";
import { MatTableDataSource } from "@angular/material/table";
import { PageEvent } from "@angular/material/paginator";
import { FieldForFilter } from "../entities/FieldForFilter";

/**
 * Tabla de datos base
 */
export abstract class GridBase<T extends EntityBase> {

  /**
   * Listado de columnas de la tabla
   */
  protected _displayedColumns: string[];

  /**
   * Si la tabla de datos se está cargando o no
   */
  protected loading;

  /**
   * Número total de registros que tiene la tabla de datos
   */
  protected totalRows;

  /**
   * Número de registros que se muestran por página
   */
  protected pageSize;

  /**
   * Página actual que se está visualizando
   */
  protected currentPage;

  /**
   * Fuente de datos de la tabla
   */
  protected dataSource: MatTableDataSource<T>;

  /**
   * Campo por el que se está filtrando
   */
  protected fieldFilter: string;

  /**
   * Operador que se está usando para el filtro
   */
  protected operatorFilter: string;

  /**
   * Valor por el que se filtra el campo
   */
  protected valueFilter: string;

  /**
   * Cadena que se envía a la API para realizar el filtrado
   */
  protected filterStr: string;

  /**
   * Snackbar para notificar el resultado de las acciones de la tabla
   */
  protected _snackBar: MatSnackBar;

  /**
   * Ruteador de la aplicación
   */
  protected _router: Router;

  /**
   * Path a donde se redirige para insertar o editar una entidad
   */
  protected _path: string;

  /**
   * Tooltip que tiene el botón de nueva entidad
   */
  protected _tooltipNewEntity: string;

  /**
   * Título de la tabla
   */
  protected _title: string;

  /**
   * Campos por los que se filtran en la tabla
   */
  protected _fields: FieldForFilter[];

  /**
   * Operadores de los filtros
   */
  protected operators: FieldForFilter[] = [
    { field: 'eq', name: 'Igual' },
    { field: 'neq', name: 'No igual' },
    { field: 'lt', name: 'Menor que' },
    { field: 'lte', name: 'Menor e igual que' },
    { field: 'gt', name: 'Mayor que' },
    { field: 'gte', name: 'Mayor e igual que' },
    { field: 'like', name: 'Como' }
  ];

  /**
   * Inicializa los atributos del formulario
   * @param displayedColumns Listado de columnas de la tabla
   * @param snackBar Snackbar para notificar el resultado de las acciones de la tabla
   * @param router Ruteador de la aplicación
   * @param path Path a donde se redirige para insertar o editar una entidad
   * @param tooltipNewEntity Tooltip que tiene el botón de nueva entidad
   * @param title Título de la tabla
   */
  protected constructor(
    displayedColumns: string[], snackBar: MatSnackBar, router: Router,
    path: string, tooltipNewEntity: string, title: string,
    fields: FieldForFilter[]) {

    this._displayedColumns = displayedColumns;
    this._snackBar = snackBar;
    this._router = router;
    this._path = path;
    this._tooltipNewEntity = tooltipNewEntity;
    this._title = title;
    this._fields = fields;

    this.loading = false;
    this.totalRows = 0;
    this.pageSize = 25;
    this.currentPage = 0;
    this.dataSource = new MatTableDataSource();
    this.fieldFilter = "";
    this.operatorFilter = "";
    this.valueFilter = "";
    this.filterStr = "";
  }

  protected abstract loadData(): void;

  /**
   * Redirecciona al formulario de adición
   */
  add() {
    this._router.navigate(["/home/" + this._path + "/0"]);
  }

  /**
   * Redirecciona al formulario de edición
   * @param id Identificador de la entidad
   */
  edit(id: number) {
    this._router.navigate(["/home/" + this._path + "/" + id]);
  }

  /**
   * Cambio de página en el paginador
   * @param event Datos del cambio de página
   */
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  /**
   * Consulta el listado nuevamente con el ordenamiento actual
   */
  sorted() {
    this.loadData();
  }

  /**
   * Aplica filtros al listado de aplicaciones
   */
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
          this.filterStr += " like '%" + this.valueFilter + "%'";
          break;
      }
      this.loadData();
    }
    else {
      this._snackBar.open("Debe diligenciar correctamente el filtro", "Cerrar", { duration: 2000 })
    }
  }

  /**
   * Reestablece los filtros
   */
  clearFilter() {
    this.fieldFilter = "";
    this.operatorFilter = "";
    this.valueFilter = "";
    this.filterStr = "";
    this.loadData();
  }
}
