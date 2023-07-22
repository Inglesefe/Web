import { EntityBase } from "./EntityBase";

/**
 * Aplicación a la que tiene acceso un usuario
 */
export class Application extends EntityBase {
  /**
   * Nombre de la aplicación
   */
  public name: string;

  /**
   * Inicializa los datos por defecto
   */
  protected constructor() {
    super();
    this.name = '';
  }
}
