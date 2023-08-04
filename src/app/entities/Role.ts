import { EntityBase } from "./EntityBase";

/**
 * Role que tiene un usuario
 */
export class Role extends EntityBase {
  /**
   * Nombre del rol
   */
  public name: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.name = '';
  }
}
