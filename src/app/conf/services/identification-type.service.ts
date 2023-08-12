import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { IdentificationType } from '../../entities/IdentificationType';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de configuración general
 */
export class IdentificationTypeService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de tipos de identificación
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<IdentificationType>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<IdentificationType>>(environment.API_CONF_URL + "IdentificationType?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de un tipo de identificación
   * @param id Identificador del tipo de identificación
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<IdentificationType> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<IdentificationType>(environment.API_CONF_URL + "IdentificationType/" + id, { headers }));
  }

  /**
   * Inserta un tipo de identificación
   * @param identificationType Tipo de identificación a insertar
   * @returns Promesa con el resultado
   */
  public insert(identificationType: IdentificationType): Promise<IdentificationType> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<IdentificationType>(environment.API_CONF_URL + "IdentificationType", identificationType, { headers }));
  }

  /**
   * Actualiza un tipo de identificación
   * @param identificationType Tipo de identificación a actualizar
   * @returns Promesa con el resultado
   */
  public update(identificationType: IdentificationType): Promise<IdentificationType> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<IdentificationType>(environment.API_CONF_URL + "IdentificationType", identificationType, { headers }));
  }

  /**
   * Elimina un tipo de identificación
   * @param id Identificación del tipo de identificación a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<IdentificationType> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<IdentificationType>(environment.API_CONF_URL + "IdentificationType/" + id, { headers }));
  }
}
