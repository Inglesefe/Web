import { EntityBase } from "./EntityBase";

/**
 * Plan de estudio ofrecido por la compañía
 */
export class Plan extends EntityBase {
  /**
   * Valor del plan
   */
  public value: number;

  /**
   * Valor de la cuota inicial
   */
  public initialFee: number;

  /**
  * Número de cuotas
  */
  public installmentsNumber: number;

  /**
   * Valor de la cuota mensual
   */
  public installmentValue: number;

  /**
   * Si el plan está o no activo
   */
  public active: boolean;

  /**
   * Descripción
   */
  public description: string;

  /**
   * Inicializa los datos por defecto
   */
  public constructor() {
    super();
    this.value = 0;
    this.initialFee = 0;
    this.installmentsNumber = 0;
    this.installmentValue = 0;
    this.active = false;
    this.description = "";
  }
}
