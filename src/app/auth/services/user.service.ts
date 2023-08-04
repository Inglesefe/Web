import { Injectable } from '@angular/core';
import { LoginResponse } from '../../entities/LoginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { User } from '../../entities/User';
import { Role } from '../../entities/Role';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de usuarios
 */
export class UserService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la solicitud de inicio de sesión
   * @param login Login del usuario
   * @param password Contraseña del usuario en texto plano
   * @returns Promesa con el resultado
   */
  public login(login: string, password: string): Promise<LoginResponse> {
    let key = CryptoJS.enc.Utf8.parse(environment.AES_KEY);
    let iv = CryptoJS.enc.Utf8.parse(environment.AES_IV);
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    let data = {
      login: login,
      password: encrypted.toString()
    };
    let headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<LoginResponse>(environment.API_AUTH_URL + "User/login", JSON.stringify(data), { headers }));
  }

  /**
   * Realiza la consulta del listado de usuarios
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<User>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<User>>(environment.API_AUTH_URL + "User?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de un usuario
   * @param id Identificador del usuario
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<User> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<User>(environment.API_AUTH_URL + "User/" + id, { headers }));
  }

  /**
   * Inserta un usuario
   * @param user Usuario a insertar
   * @returns Promesa con el resultado
   */
  public insert(user: User): Promise<User> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<User>(environment.API_AUTH_URL + "User", user, { headers }));
  }

  /**
   * Actualiza un usuario
   * @param user Usuario a actualizar
   * @returns Promesa con el resultado
   */
  public update(user: User): Promise<User> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<User>(environment.API_AUTH_URL + "User", user, { headers }));
  }

  /**
   * Elimina un usuario
   * @param id Identificación del usuario a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<User> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<User>(environment.API_AUTH_URL + "User/" + id, { headers }));
  }

  /**
   * Realiza la consulta del listado de role asociados a un usuario
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @param user Identificador del usuario
   * @returns Promesa con el resultado
   */
  public listRoles(filters: string, orders: string, limit: number, offset: number, user: number): Promise<ListResult<Role>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Role>>(environment.API_AUTH_URL + "User/" + user + "/role?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta del listado de roles no asociados a un usuario
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @param user Identificador del usuario
   * @returns Promesa con el resultado
   */
  public listNotRoles(filters: string, orders: string, limit: number, offset: number, user: number): Promise<ListResult<Role>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Role>>(environment.API_AUTH_URL + "User/" + user + "/not-role?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Adiciona un rol a un usuario
   * @param role Rol a insertar
   * @param user Identificador del usuario
   * @returns Promesa con el resultado
   */
  public insertRole(role: Role, user: number): Promise<Role> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<Role>(environment.API_AUTH_URL + "User/" + user + "/role", role, { headers }));
  }

  /**
   * Elimina un rol de un usuario
   * @param role Identificador del rol a eliminar
   * @param user Identificador del usuario
   * @returns Promesa con el resultado
   */
  public deleteRole(role: number, user: number): Promise<Role> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<Role>(environment.API_AUTH_URL + "User/" + user + "/role/" + role, { headers }));
  }
}
