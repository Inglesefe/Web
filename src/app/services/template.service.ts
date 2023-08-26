import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Template } from '../entities/Template';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de plantillas
 */
export class TemplateService extends BaseService<Template> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "Template");
  }
}
