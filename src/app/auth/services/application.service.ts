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

  /**
   * Realiza la consulta de una aplicación
   * @param id Identificador de la aplicación
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<Application> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<Application>(environment.API_AUTH_URL + "Application/" + id, { headers }));
  }

  /**
   * Inserta una aplicación
   * @param app Aplicación a insertar
   * @returns Promesa con el resultado
   */
  public insert(app: Application): Promise<Application> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<Application>(environment.API_AUTH_URL + "Application", app, { headers }));
  }

  /**
   * Actualiza una aplicación
   * @param app Aplicación a actualizar
   * @returns Promesa con el resultado
   */
  public update(app: Application): Promise<Application> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<Application>(environment.API_AUTH_URL + "Application", app, { headers }));
  }

  /**
   * Elimina una aplicación
   * @param id Identificación de la aplicación a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<Application> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<Application>(environment.API_AUTH_URL + "Application/" + id, { headers }));
  }
}
