import { EntityBase } from "./EntityBase";

/**
 * Notificación enviada a un usuario
 */
export class Notification extends EntityBase {
  /**
   * Fecha de la notificación
   */
  public date: Date;

  /**
   * Destinatario de la notificación
   */
  public to: string;

  /**
   * Asunto de la notificación
   */
  public subject: string;

  /**
   * Contenido de la notificación
   */
  public content: string;

  /**
   * Usuario que envió la notificación
   */
  public user: number;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.date = new Date();
    this.to = '';
    this.subject = '';
    this.content = '';
    this.user = 0;
  }
}
