import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { Application } from '../../entities/Application';
import { Role } from '../../entities/Role';
import { User } from '../../entities/User';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de usuarios
 */
export class RoleService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de roles
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<Role>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Role>>(environment.API_AUTH_URL + "Role?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de un rol
   * @param id Identificador del rol
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<Role> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<Role>(environment.API_AUTH_URL + "Role/" + id, { headers }));
  }

  /**
   * Inserta un rol
   * @param role Rol a insertar
   * @returns Promesa con el resultado
   */
  public insert(role: Role): Promise<Role> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<Role>(environment.API_AUTH_URL + "Role", role, { headers }));
  }

  /**
   * Actualiza un rol
   * @param role Rol a actualizar
   * @returns Promesa con el resultado
   */
  public update(role: Role): Promise<Role> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<Role>(environment.API_AUTH_URL + "Role", role, { headers }));
  }

  /**
   * Elimina un rol
   * @param id Identificación del rol a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<Role> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<Role>(environment.API_AUTH_URL + "Role/" + id, { headers }));
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
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Application>>(environment.API_AUTH_URL + "Role/" + role + "/application?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
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
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Application>>(environment.API_AUTH_URL + "Role/" + role + "/not-application?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Adiciona una aplicación a un rol
   * @param app Aplicación a insertar
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public insertApplication(app: Application, role: number): Promise<Application> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<Application>(environment.API_AUTH_URL + "Role/" + role + "/application", app, { headers }));
  }

  /**
   * Elimina una aplicación de un rol
   * @param app Identificador de la aplicación a eliminar
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public deleteApplication(app: number, role: number): Promise<Application> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<Application>(environment.API_AUTH_URL + "Role/" + role + "/application/" + app, { headers }));
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
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<User>>(environment.API_AUTH_URL + "Role/" + role + "/user?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
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
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<User>>(environment.API_AUTH_URL + "Role/" + role + "/not-user?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Adiciona un usuario a un rol
   * @param user Usuario a insertar
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public insertUser(user: User, role: number): Promise<User> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<User>(environment.API_AUTH_URL + "Role/" + role + "/user", user, { headers }));
  }

  /**
   * Elimina un usuario de un rol
   * @param user Identificador del usuario a eliminar
   * @param role Identificador del rol
   * @returns Promesa con el resultado
   */
  public deleteUser(user: number, role: number): Promise<User> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<User>(environment.API_AUTH_URL + "Role/" + role + "/user/" + user, { headers }));
  }
}
