import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environment/environment';
import { ListResult } from '../entities/ListResult';
import { Application } from '../entities/Application';
import { Role } from '../entities/Role';
import { User } from '../entities/User';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de usuarios
 */
export class RoleService extends BaseService<Role> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "Role");
  }

  /**
   * Realiza la consulta del listado de aplicaciones asociadas a un rol
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public listApplications(filters: string, orders: string, limit: number, offset: number, role: number): Promise<ListResult<Application>> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<Application>>(environment.API_URL + this._path + "/" + role + "/application?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta del listado de aplicaciones no asociadas a un rol
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public listNotApplications(filters: string, orders: string, limit: number, offset: number, role: number): Promise<ListResult<Application>> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<Application>>(environment.API_URL + this._path + "/" + role + "/not-application?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Adiciona una aplicación a un rol
   * @param app Aplicación a insertar
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public insertApplication(app: Application, role: number): Promise<Application> {
    let headers: HttpHeaders = this.headersPostPut;
    return lastValueFrom(this._http.post<Application>(environment.API_URL + this._path + "/" + role + "/application", app, { headers }));
  }

  /**
   * Elimina una aplicación de un rol
   * @param app Identificador de la aplicación a eliminar
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public deleteApplication(app: number, role: number): Promise<Application> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.delete<Application>(environment.API_URL + this._path + "/" + role + "/application/" + app, { headers }));
  }

  /**
   * Realiza la consulta del listado de usuarios asociados a un rol
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public listUsers(filters: string, orders: string, limit: number, offset: number, role: number): Promise<ListResult<User>> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<User>>(environment.API_URL + this._path + "/" + role + "/user?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta del listado de usuarios no asociados a un rol
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public listNotUsers(filters: string, orders: string, limit: number, offset: number, role: number): Promise<ListResult<User>> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<User>>(environment.API_URL + this._path + "/" + role + "/not-user?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Adiciona un usuario a un rol
   * @param user Usuario a insertar
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public insertUser(user: User, role: number): Promise<User> {
    let headers: HttpHeaders = this.headersPostPut;
    return lastValueFrom(this._http.post<User>(environment.API_URL + this._path + "/" + role + "/user", user, { headers }));
  }

  /**
   * Elimina un usuario de un rol
   * @param user Identificador del usuario a eliminar
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public deleteUser(user: number, role: number): Promise<User> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.delete<User>(environment.API_URL + this._path + "/" + role + "/user/" + user, { headers }));
  }
}
