import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppConfig } from 'app/app.config';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  appconfig = new AppConfig();
  API_URL = this.appconfig.getURL();
  constructor(private _httpClient: HttpClient) { }

  //#region Product
  public GetAllProduct(filter){
    return this._httpClient
            .post(this.API_URL + '/api/product/all-product', filter)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  public GetAllNoCode(){
    return this._httpClient
            .get(this.API_URL + '/api/product/get-no-code')
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  public GetAllCode(filter){
    return this._httpClient
            .post(this.API_URL + '/api/product/get-code', filter)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  public GetProductById(productCode){
    return this._httpClient
            .get(this.API_URL + '/api/product/product-detail',{
              params:{
                ProductCode: productCode
              }
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  public EditProduct(obj, userName){
    let header = new HttpHeaders({'userName':userName});
    //header.set('userName', userName);
    return this._httpClient.post(this.API_URL + '/api/product/update-product', obj, {
      headers: header
    }).
    pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
  public AddProduct(obj, userName){
    let header = new HttpHeaders({'userName':userName});
    //header.set('userName', userName);
    return this._httpClient.post(this.API_URL + '/api/product/add-product', obj, {
      headers: header
    }).
    pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
  public AddCode(obj, userName){
    let header = new HttpHeaders({'userName':userName});
    //header.set('userName', userName);
    return this._httpClient.post(this.API_URL + '/api/product/add-code', obj, {
      headers: header
    }).
    pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
  public DelCode(productCode){
    return this._httpClient.delete(this.API_URL + `/api/qrcode/delete-qr?productCode=${productCode}`).
    pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
  public DelProduct(productCode, userName){
    let header = new HttpHeaders({'userName':userName});
    return this._httpClient.delete(this.API_URL + `/api/product/delete-product?productCode=${productCode}`,{
      headers: header
    }).
    pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
  //#endregion
  //#region Image
  public PostImage(formData: any, productCode: any){
    let header = new HttpHeaders({'productCode':productCode});
    return this._httpClient
            .post(this.API_URL + '/api/image/add-image', formData, {
              headers: header
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  public DelImage(id){
    return this._httpClient
            .delete(this.API_URL + `/api/image/delete-image?Id=${id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  //#endregion
  //#region InOutLog
  public GetAllInOut(filter){
    return this._httpClient
            .post(this.API_URL + '/api/in-out/get-all', filter)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  public ScannedProd(obj, Username){
    let header = new HttpHeaders({'userName':Username});
    //header.set('userName', userName);
    return this._httpClient.post(this.API_URL + '/api/in-out/scanned-product', obj, {
      headers: header
    }).
    pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
  public ScannedAmountProd(obj, Username, amount){
    let header = new HttpHeaders({'userName':Username});
    //header.set('userName', userName);
    return this._httpClient.post(this.API_URL + `/api/in-out/scanned-amount-product?amount=${amount}`, obj, {
      headers: header
    }).
    pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
  public GetAllByProd(filter){
    return this._httpClient
            .post(this.API_URL + '/api/in-out/get-all-by-product', filter)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  //#endregion
  //#region Notifycation
  public GetAll(){
    return this._httpClient
            .get(this.API_URL + '/api/notifycation/get-all')
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
  }
  public GetStatus(status: string){
    return this._httpClient
    .get(this.API_URL + `/api/notifycation/get-by-status?status=${status}`)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public changeStatus(id){
    return this._httpClient
    .post(this.API_URL + `/api/notifycation/change-status?id=${id}`,null)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public changeAllStatus(){
    return this._httpClient
    .post(this.API_URL + `/api/notifycation/change-all-status`,null)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  //#endregion
  //#region Profile
  public getProfileByUsername(username){
    return this._httpClient
    .get(this.API_URL + `/api/profile/get-by-username?userName=${username}`)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public EditProfile(profile, userName){
    return this._httpClient
    .post(this.API_URL + `/api/profile/edit-profile?userName=${userName}`,profile)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public DeleteProfile(userName){
    return this._httpClient
    .delete(this.API_URL + `/api/profile/update-profile?userName=${userName}`)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  //#endregion
  //#region QrCode
  public DownloadAll(){
    return this._httpClient
    .get(this.API_URL + `/api/qrcode/save-all`)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public DownloadByProd(prodCode){
    return this._httpClient
    .get(this.API_URL + `/api/qrcode/save-by-prod?ProductCode=${prodCode}`)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  //#endregion
  //#region Dashboard
  public getAllDashboard(){
    return this._httpClient
    .get(this.API_URL + `/api/dashboard/getData`)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public getPreviousDateLog(){
    return this._httpClient
    .get(this.API_URL + `/api/dashboard/previous-date-log`)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public getWarnProd(filter){
    return this._httpClient
    .post(this.API_URL + `/api/dashboard/warnProd`,filter)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  //#endregion
  //#region Report
  public ReportPord(){
    return this._httpClient
    .get(this.API_URL + `/api/report/product`)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  public ReportInOutLog(filterModel){
    return this._httpClient
    .post(this.API_URL + `/api/report/in-out-log`,filterModel)
    .pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
  }
  //#endregion
}
