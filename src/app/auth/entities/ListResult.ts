import { EntityBase } from "./EntityBase";

/**
 * Resultado de una consulta de tipo listado
 */
export class ListResult<T extends EntityBase>  {
  /**
   * Listado de registros
   */
  public list: T[];

  /**
   * Total de registro que se pueden llegar a traer sin aplicar límites
   */
  public total: number;

  /**
   * Total de registro que se pueden llegar a traer sin aplicar límites
   */
  protected constructor() {
    this.list = [];
    this.total = 0;
  }
}
