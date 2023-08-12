import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { Country } from '../../entities/Country';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de configuración general
 */
export class CountryService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de paises
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<Country>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Country>>(environment.API_CONF_URL + "Country?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de un país
   * @param id Identificador del país
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<Country> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<Country>(environment.API_CONF_URL + "Country/" + id, { headers }));
  }

  /**
   * Inserta un país
   * @param app País a insertar
   * @returns Promesa con el resultado
   */
  public insert(app: Country): Promise<Country> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<Country>(environment.API_CONF_URL + "Country", app, { headers }));
  }

  /**
   * Actualiza un país
   * @param app País a actualizar
   * @returns Promesa con el resultado
   */
  public update(app: Country): Promise<Country> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<Country>(environment.API_CONF_URL + "Country", app, { headers }));
  }

  /**
   * Elimina un país
   * @param id Identificación del país a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<Country> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<Country>(environment.API_CONF_URL + "Country/" + id, { headers }));
  }
}
