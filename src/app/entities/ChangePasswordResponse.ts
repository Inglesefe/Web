/**
 * Respuesta de cambio de contraseña de un usuario
 */
export class ChangePasswordResponse  {
  /**
   * Si el resultado es exitoso o no
   */
  public success: boolean;

  /**
   * Mensaje recibido de la operación
   */
  public message: string;

  /**
   * Inicializa con valores por defecto
   */
  public constructor() {
    this.success = false;
    this.message = "";
  }
}
