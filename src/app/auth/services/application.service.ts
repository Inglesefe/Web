import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../entities/ListResult';
import { Application } from '../entities/Application';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de aplicaciones
 */
export class ApplicationService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de aplicaciones
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<Application>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Application>>(environment.API_AUTH_URL + "Application?filters=" + filters + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }
}
