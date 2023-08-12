import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ListResult } from '../../entities/ListResult';
import { IncomeType } from '../../entities/IncomeType';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de configuración general
 */
export class IncomeTypeService {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Realiza la consulta del listado de tipos de ingreso
   * @param filters Filtros aplicados a la consulta
   * @param orders Ordenamientos aplicados a la consulta
   * @param limit Límite de registros a traer
   * @param offset Registro incial dese el que se cuenta el número de registros a traer
   * @returns Promesa con el resultado
   */
  public list(filters: string, orders: string, limit: number, offset: number): Promise<ListResult<IncomeType>> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<ListResult<IncomeType>>(environment.API_CONF_URL + "IncomeType?filters=" + encodeURI(filters) + "&orders=" + encodeURI(orders) + "&limit=" + limit + "&offset=" + offset, { headers }));
  }

  /**
   * Realiza la consulta de un tipo de ingreso
   * @param id Identificador del tipo de ingreso
   * @returns Promesa con el resultado
   */
  public read(id: number): Promise<IncomeType> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.get<IncomeType>(environment.API_CONF_URL + "IncomeType/" + id, { headers }));
  }

  /**
   * Inserta un tipo de ingreso
   * @param incomeType Tipo de ingreso a insertar
   * @returns Promesa con el resultado
   */
  public insert(incomeType: IncomeType): Promise<IncomeType> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.post<IncomeType>(environment.API_CONF_URL + "IncomeType", incomeType, { headers }));
  }

  /**
   * Actualiza un tipo de ingreso
   * @param incomeType Tipo de ingreso a actualizar
   * @returns Promesa con el resultado
   */
  public update(incomeType: IncomeType): Promise<IncomeType> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token"), "Content-Type": "application/json" });
    return lastValueFrom(this.http.put<IncomeType>(environment.API_CONF_URL + "IncomeType", incomeType, { headers }));
  }

  /**
   * Elimina un tipo de ingreso
   * @param id Identificación del tipo de ingreso a eliminar
   * @returns Promesa con el resultado
   */
  public delete(id: number): Promise<IncomeType> {
    let headers: HttpHeaders = new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem("golden-token") });
    return lastValueFrom(this.http.delete<IncomeType>(environment.API_CONF_URL + "IncomeType/" + id, { headers }));
  }
}
