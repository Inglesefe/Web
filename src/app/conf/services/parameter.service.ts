import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { Parameter } from '../../entities/Parameter';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de configuración general
 */
export class ParameterService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de parámetros
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<Parameter>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Parameter>>(environment.API_CONF_URL + "Parameter?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de un parámetro
   * @param id Identificador del parámetro
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<Parameter> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<Parameter>(environment.API_CONF_URL + "Parameter/" + id, { headers }));
  }

  /**
   * Inserta un parámetro
   * @param parameter Parámetro a insertar
   * @returns Promesa con el resultado
   */
  public insert(parameter: Parameter): Promise<Parameter> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<Parameter>(environment.API_CONF_URL + "Parameter", parameter, { headers }));
  }

  /**
   * Actualiza un parámetro
   * @param parameter Parámetro a actualizar
   * @returns Promesa con el resultado
   */
  public update(parameter: Parameter): Promise<Parameter> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<Parameter>(environment.API_CONF_URL + "Parameter", parameter, { headers }));
  }

  /**
   * Elimina un parámetro
   * @param id Identificación del parámetro a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<Parameter> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<Parameter>(environment.API_CONF_URL + "Parameter/" + id, { headers }));
  }
}
