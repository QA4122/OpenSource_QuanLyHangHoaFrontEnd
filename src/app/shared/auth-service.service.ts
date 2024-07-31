import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  appconfig = new AppConfig();
  API_URL = this.appconfig.getURL();
  isLogged : boolean = false;

  constructor(private _httpClient: HttpClient) { }

  //#region Account
  public Login(account){
    return this._httpClient
    .post(this.API_URL + `/api/account/login`,account)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public Logout(){
    this.isLogged = false;
  }
  public isAuthentication(){
    return this.isLogged;
  }
  public setAuthentication(){
    this.isLogged = true;
  }
  public changePassword(account, username){
    return this._httpClient
    .post(this.API_URL + `/api/account/change-password?username=${username}`,account)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  //#endregion
}
