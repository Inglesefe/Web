import { EntityBase } from "./EntityBase";

/**
 * Tipo de ingreso
 */
export class IncomeType extends EntityBase {
  /**
   * Código del tipo de ingreso
   */
  public code: string;

  /**
   * Nombre del tipo de ingreso
   */
  public name: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.code = "";
    this.name = "";
  }
}
