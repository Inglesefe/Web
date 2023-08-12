import { EntityBase } from "./EntityBase";

/**
 * Tipo de identificación
 */
export class IdentificationType extends EntityBase {
  /**
   * Nombre del tipo de identificación
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
