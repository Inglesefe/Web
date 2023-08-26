import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../entities/City';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de ciudades
 */
export class CityService extends BaseService<City> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "City");
  }
}
