import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { Template } from '../../entities/Template';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de plantillas
 */
export class TemplateService {

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
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<Template>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Template>>(environment.API_NOTI_URL + "Template?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de una plantilla
   * @param id Identificador de la plantilla
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<Template> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<Template>(environment.API_NOTI_URL + "Template/" + id, { headers }));
  }

  /**
   * Inserta una plantilla
   * @param template Plantilla a insertar
   * @returns Promesa con el resultado
   */
  public insert(template: Template): Promise<Template> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<Template>(environment.API_NOTI_URL + "Template", template, { headers }));
  }

  /**
   * Actualiza una plantilla
   * @param template Plantilla a actualizar
   * @returns Promesa con el resultado
   */
  public update(template: Template): Promise<Template> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<Template>(environment.API_NOTI_URL + "Template", template, { headers }));
  }

  /**
   * Elimina una plantilla
   * @param id Identificación de la plantilla a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<Template> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<Template>(environment.API_NOTI_URL + "Template/" + id, { headers }));
  }
}
