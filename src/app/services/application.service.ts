import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environment/environment';
import { ListResult } from '../entities/ListResult';
import { Application } from '../entities/Application';
import { Role } from '../entities/Role';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de aplicaciones
 */
export class ApplicationService extends BaseService<Application> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "Application");
  }

  /**
   * Realiza la consulta del listado de roles asociados a una aplicación
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @param app Identificador de la aplicación
   * @returns Promesa con el resultado
   */
  public listRoles(filters: string, orders: string, limit: number, offset: number, app: number): Promise<ListResult<Role>> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<Role>>(environment.API_URL + this._path + "/" + app + "/role?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta del listado de roles no asociados a una aplicación
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @param app Identificador de la aplicación
   * @returns Promesa con el resultado
   */
  public listNotRoles(filters: string, orders: string, limit: number, offset: number, app: number): Promise<ListResult<Role>> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<Role>>(environment.API_URL + this._path + "/" + app + "/not-role?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Adiciona un rol a una aplicación
   * @param role Rol a insertar
   * @param app Identificador de la aplicación
   * @returns Promesa con el resultado
   */
  public insertRole(role: Role, app: number): Promise<Role> {
    let headers: HttpHeaders = this.headersPostPut;
    return lastValueFrom(this._http.post<Role>(environment.API_URL + this._path + "/" + app + "/role", role, { headers }));
  }

  /**
   * Elimina un rol de una aplicación
   * @param role Identificador del rol a eliminar
   * @param app Identificador de la aplicación
   * @returns Promesa con el resultado
   */
  public deleteRole(role: number, app: number): Promise<Role> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.delete<Role>(environment.API_URL + this._path + "/" + app + "/role/" + role, { headers }));
  }
}
