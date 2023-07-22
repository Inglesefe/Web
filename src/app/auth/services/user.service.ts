import { Injectable } from '@angular/core';
import { LoginResponse } from '../entities/LoginResponse';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public login(login: string, password: string): Promise<LoginResponse> {
    let key = CryptoJS.enc.Utf8.parse("AesKey*Golden$23");
    let iv = CryptoJS.enc.Utf8.parse("AesIV*Golden2023");
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return lastValueFrom(this.http.get<LoginResponse>("http://localhost:30000/User/login?login=" + login + "&password=" + encrypted.toString()));
  }
}
