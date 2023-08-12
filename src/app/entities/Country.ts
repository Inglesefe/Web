import { EntityBase } from "./EntityBase";

/**
 * País en el que tiene presencia la compañía
 */
export class Country extends EntityBase {
  /**
   * Código del país
   */
  public code: string;

  /**
   * Nombre del país
   */
  public name: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.code = "";
    this.name = '';
  }
}
