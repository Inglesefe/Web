import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdentificationType } from '../entities/IdentificationType';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de configuración general
 */
export class IdentificationTypeService extends BaseService<IdentificationType> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "IdentificationType");
  }
}
