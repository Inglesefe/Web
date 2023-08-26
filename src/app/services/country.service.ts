import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Country } from '../entities/Country';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de paises
 */
export class CountryService extends BaseService<Country> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "Country");
  }
}
