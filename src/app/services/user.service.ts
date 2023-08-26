import { Injectable } from '@angular/core';
import { LoginResponse } from '../entities/LoginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environment/environment';
import { ListResult } from '../entities/ListResult';
import { User } from '../entities/User';
import { Role } from '../entities/Role';
import { ChangePasswordResponse } from '../entities/ChangePasswordResponse';
import { ChangePasswordRequest } from '../entities/ChangePasswordRequest';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de usuarios
 */
export class UserService extends BaseService<User> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "User");
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
    return lastValueFrom(this._http.post<LoginResponse>(environment.API_URL + this._path + "/login", JSON.stringify(data), { headers }));
  }

  /**
   * Realiza una solicitud de cambio de contraseña
   * @param login Login del usuario
   * @returns Promesa con el resultado
   */
  public recovery(login: string): Promise<LoginResponse> {
    return lastValueFrom(this._http.get<LoginResponse>(environment.API_URL + this._path + "/recovery/" + encodeURI(login)));
  }

  /**
   * Actualiza la contraseña de un usuario
   * @param user Usuario a actualizar
   * @returns Promesa con el resultado
   */
  public changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    let key = CryptoJS.enc.Utf8.parse(environment.AES_KEY);
    let iv = CryptoJS.enc.Utf8.parse(environment.AES_IV);
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.password), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    data.password = encrypted.toString();
    return lastValueFrom(this._http.put<ChangePasswordResponse>(environment.API_URL + this._path + "/password", data));
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
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<Role>>(environment.API_URL + this._path + "/" + user + "/role?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
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
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<Role>>(environment.API_URL + this._path + "/" + user + "/not-role?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Adiciona un rol a un usuario
   * @param role Rol a insertar
   * @param user Identificador del usuario
   * @returns Promesa con el resultado
   */
  public insertRole(role: Role, user: number): Promise<Role> {
    let headers: HttpHeaders = this.headersPostPut;
    return lastValueFrom(this._http.post<Role>(environment.API_URL + this._path + "/" + user + "/role", role, { headers }));
  }

  /**
   * Elimina un rol de un usuario
   * @param role Identificador del rol a eliminar
   * @param user Identificador del usuario
   * @returns Promesa con el resultado
   */
  public deleteRole(role: number, user: number): Promise<Role> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.delete<Role>(environment.API_URL + this._path + "/" + user + "/role/" + role, { headers }));
  }
}
