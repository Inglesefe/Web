import { EntityBase } from "./EntityBase";

/**
 * Plantilla de una notificación
 */
export class Template extends EntityBase {
  /**
   * Nombre de la plantilla
   */
  public name: string;

  /**
   * Contenido de la plantilla
   */
  public content: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.name = '';
    this.content = '';
  }
}
