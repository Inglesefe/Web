import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { Office } from '../../entities/Office';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de configuración general
 */
export class OfficeService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de oficinas
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<Office>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Office>>(environment.API_CONF_URL + "Office?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de una oficina
   * @param id Identificador de la oficina
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<Office> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<Office>(environment.API_CONF_URL + "Office/" + id, { headers }));
  }

  /**
   * Inserta una oficina
   * @param office Oficina a insertar
   * @returns Promesa con el resultado
   */
  public insert(office: Office): Promise<Office> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<Office>(environment.API_CONF_URL + "Office", office, { headers }));
  }

  /**
   * Actualiza una oficina
   * @param office Oficina a actualizar
   * @returns Promesa con el resultado
   */
  public update(office: Office): Promise<Office> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<Office>(environment.API_CONF_URL + "Office", office, { headers }));
  }

  /**
   * Elimina una oficina
   * @param id Identificación de la oficina a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<Office> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<Office>(environment.API_CONF_URL + "Office/" + id, { headers }));
  }
}
