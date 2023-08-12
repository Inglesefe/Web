import { City } from "./City";
import { EntityBase } from "./EntityBase";

/**
 * Oficina en una ciudad donde está la compañía
 */
export class Office extends EntityBase {
  /**
   * Ciudad a la que pertenece la oficina
   */
  public city: City;

  /**
   * Nombre de la oficina
   */
  public name: string;

  /**
   * Dirección de la oficina
   */
  public address: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.city = new City();
    this.name = "";
    this.address = '';
  }
}
