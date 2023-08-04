import { EntityBase } from "./EntityBase";

/**
 * Usuario que ejecuta la aplicación
 */
export class User extends EntityBase {
  /**
   * Login de acceso
   */
  public login: string;

  /**
   * Nombre completo del usuario
   */
  public name: string;

  /**
   * Si está o no activo
   */
  public active: boolean;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.login = '';
    this.name = '';
    this.active = false;
  }
}
