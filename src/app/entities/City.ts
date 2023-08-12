import { Country } from "./Country";
import { EntityBase } from "./EntityBase";

/**
 * Ciudad en el que tiene presencia la compañía
 */
export class City extends EntityBase {
  /**
   * País al que pertenece la ciudad
   */
  public country: Country;

  /**
   * Código de la ciudad
   */
  public code: string;

  /**
   * Nombre de la ciudad
   */
  public name: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.country = new Country();
    this.code = "";
    this.name = '';
  }
}
