/**
 * Payload del token JWT
 */
export class JwtToken {
  /**
   * Audiencia del token
   */
  public aud: string;

  /**
   * Email del usuario
   */
  public email: string;

  /**
   * Fecha de expiracion
   */
  public exp: number;

  /**
   * Identificador del usuario
   */
  public id: string;

  /**
   * Nombre del usuario
   */
  public name: string;

  /**
   * Editor del token
   */
  public iss: string;

  /**
   * Roles a los que pertenece el usuario
   */
  public roles: string;

  /**
   * Inicializa los datos por defecto
   */
  protected constructor() {
    this.aud = '';
    this.email = '';
    this.exp = 0;
    this.id = '';
    this.name = '';
    this.iss = '';
    this.roles = '';
  }
}
