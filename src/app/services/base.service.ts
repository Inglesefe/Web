import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ListResult } from "../entities/ListResult";
import { lastValueFrom } from "rxjs";
import { environment } from "../../environment/environment";
import { EntityBase } from "../entities/EntityBase";

/**
 * Clase base de los servicios de consumo de las APIs
 */
export class BaseService<T extends EntityBase> {
  /**
   * Cliente http
   */
  protected _http: HttpClient;

  /**
   * Token JWT que se envía en las peticiones a la API
   */
  protected _token: string;

  /**
   * Ruta de la API a donde se hacen las consultas en la API
   */
  protected _path: string;

  /**
   * Headers HTTP enviados a la API con los métodos GET y DELETE
   */
  protected headersGetDelete: HttpHeaders;

  /**
   * Headers HTTP enviados a la API con los métodos POST y PUT
   */
  protected headersPostPut: HttpHeaders;

  /**
   * Inicializa los valore del servicio
   * @param http Cliente http
   * @param token Token JWT que se envía a la API
   * @param path Ruta de la API a donde se hacen las consultas
   */
  public constructor(http: HttpClient, token: string, path: string) {
    this._http = http;
    this._token = token;
    this._path = path;
    this.headersGetDelete = new HttpHeaders({ "Authorization": "Bearer " + this._token });
    this.headersPostPut = new HttpHeaders({ "Authorization": "Bearer " + this._token, "Content-Type": "application/json" });
  }

  /**
   * Realiza la consulta del listado de entidades
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<T>> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<ListResult<T>>(environment.API_URL + this._path + "?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de una entidad
   * @param id Identificador de la entidad
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<T> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.get<T>(environment.API_URL + this._path + "/" + id, { headers }));
  }

  /**
   * Inserta una entidad
   * @param entity Entidad a insertar
   * @returns Promesa con el resultado
   */
  public insert(entity: T): Promise<T> {
    let headers: HttpHeaders = this.headersPostPut;
    return lastValueFrom(this._http.post<T>(environment.API_URL + this._path, entity, { headers }));
  }

  /**
   * Actualiza una entidad
   * @param entity Entidad a actualizar
   * @returns Promesa con el resultado
   */
  public update(entity: T): Promise<T> {
    let headers: HttpHeaders = this.headersPostPut;
    return lastValueFrom(this._http.put<T>(environment.API_URL + this._path, entity, { headers }));
  }

  /**
   * Elimina una entidad
   * @param id Identificación de la entidad a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<T> {
    let headers: HttpHeaders = this.headersGetDelete;
    return lastValueFrom(this._http.delete<T>(environment.API_URL + this._path + "/" + id, { headers }));
  }
}
