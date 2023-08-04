import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { Notification } from '../../entities/Notification';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de notificaciones
 */
export class NotificationService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de plantillas
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<Notification>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Notification>>(environment.API_NOTI_URL + "Notification?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de una notificación
   * @param id Identificador de la notificación
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<Notification> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<Notification>(environment.API_NOTI_URL + "Notification/" + id, { headers }));
  }
}
