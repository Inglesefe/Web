/**
 * Solicitud de cambio de contraseña de un usuario
 */
export class ChangePasswordRequest  {
  /**
   * Token de verificación
   */
  public token: string;

  /**
   * Nueva contraseña para el usuario
   */
  public password: string;

  /**
   * Inicializa con valores por defecto
   */
  public constructor() {
    this.token = "";
    this.password = "";
  }
}
