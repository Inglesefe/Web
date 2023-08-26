import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncomeType } from '../entities/IncomeType';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de configuración general
 */
export class IncomeTypeService extends BaseService<IncomeType> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "IncomeType");
  }
}
