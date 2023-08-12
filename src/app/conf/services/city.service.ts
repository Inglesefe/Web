import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { City } from '../../entities/City';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de configuración general
 */
export class CityService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de ciudades
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<City>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<City>>(environment.API_CONF_URL + "City?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de una ciudad
   * @param id Identificador de la ciudad
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<City> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<City>(environment.API_CONF_URL + "City/" + id, { headers }));
  }

  /**
   * Inserta una ciudad
   * @param city Ciudad a insertar
   * @returns Promesa con el resultado
   */
  public insert(city: City): Promise<City> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<City>(environment.API_CONF_URL + "City", city, { headers }));
  }

  /**
   * Actualiza una ciudad
   * @param city Ciudad a actualizar
   * @returns Promesa con el resultado
   */
  public update(city: City): Promise<City> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<City>(environment.API_CONF_URL + "City", city, { headers }));
  }

  /**
   * Elimina una ciudad
   * @param id Identificación de la ciudad a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<City> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<City>(environment.API_CONF_URL + "City/" + id, { headers }));
  }
}
