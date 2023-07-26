import { Injectable } from '@angular/core';
import { LoginResponse } from '../entities/LoginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environment/environment';
import { ListResult } from '../entities/ListResult';
import { Application } from '../entities/Application';

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
   * @param login Login del usuario
   * @param password Contraseña del usuario en texto plano
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<Application>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<Application>>(environment.API_AUTH_URL + "User?filters=" + filters + "&orders=" + orders + "&limit=" + limit + "&offset=" + offset, { headers }));
  }
}
