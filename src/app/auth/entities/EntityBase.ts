/**
 * Clase base de las entidades
 */
export abstract class EntityBase {
  /**
   * Identificador único de la entidad
   */
  public id: number;

  /**
   * Inicializa el identificador en 0
   */
  protected constructor() {
    this.id = 0;
  }
}
