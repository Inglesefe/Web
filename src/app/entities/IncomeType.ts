import { EntityBase } from "./EntityBase";

/**
 * Tipo de ingreso
 */
export class IncomeType extends EntityBase {
  /**
   * Nombre del tipo de ingreso
   */
  public name: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.name = "";
  }
}
