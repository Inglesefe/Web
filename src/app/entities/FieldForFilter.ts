/**
 * Campo de una taba de datos
 */
export class FieldForFilter {
  /**
   * Valor original del campo
   */
  public field: string;

  /**
   * Nombre que se muestra en la interfaz de usuario
   */
  public name: string;

  /**
   * Inicializa con valores por defecto
   */
  public constructor() {
    this.field = "";
    this.name = "";
  }
}
