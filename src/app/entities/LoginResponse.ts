/**
 * Respuesta a un llamado al API para realizar un inicio de sesión
 */
export interface LoginResponse {
  /**
   * Si el preoceso de validación fue o no exitoso
   */
  valid: boolean;

  /**
   * Token generadoi si el rpoceso fue exitoso
   */
  token: string;
}
