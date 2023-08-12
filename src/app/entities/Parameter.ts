import { EntityBase } from "./EntityBase";

/**
 * Parámetro del sistema
 */
export class Parameter extends EntityBase {
  /**
   * Nombre del parámetro
   */
  public name: string;

  /**
   * Valor del parámetro
   */
  public value: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.name = "";
    this.value = "";
  }
}
