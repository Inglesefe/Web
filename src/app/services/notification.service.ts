import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../entities/Notification';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para comunicarse con la api de notificaciones
 */
export class NotificationService extends BaseService<Notification> {

  /**
   * Configura la conexión http
   * @param http Cliente http
   */
  constructor(http: HttpClient) {
    super(http, sessionStorage.getItem("golden-token") ?? "", "Notification");
  }
}
