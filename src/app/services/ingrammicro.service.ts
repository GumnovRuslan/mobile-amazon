import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, ReplaySubject, interval, concatMap, catchError, finalize, take, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IngrammicroService {
  captchaValidationSiteKey: string = "6LcOnaoaAAAAAHAfSTxdmxb01LAQ1cplC2kl5-cC";
  private api_host = window.location.origin.includes("amazon-tradein.com")
  ? environment.baseUrl
  : "https://www.amazon-tradein.com";
  private tokenSubject = new ReplaySubject<void>(1);
  private tokenExpiryTime = 30 * 60 * 1000;

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.getToken();
    this.startTokenRefreshInterval();
  }

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  createRequest(type = 'GET', url: string, payload = null): Observable<Object> | null {
    this.setLoading(true);
    return this.checkTokenExpiry().pipe(
      concatMap(() => this.getData(type, url, payload)),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handle403Error(type, url, payload);
        } else {
          return null;
        }
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  private handle403Error(type: string, url: string, payload: any): Observable<Object> {
    return this.refreshToken().pipe(
      concatMap(() => this.getData(type, url, payload)),
      catchError(() => {
        return null;
      })
    );
  }

  private refreshToken(): Observable<void> {
    return new Observable<void>(observer => {
      this.getToken().then(() => {
        observer.next();
        observer.complete();
      });
    });
  }

  startTokenRefreshInterval() {
    interval(this.tokenExpiryTime)
      .pipe(
        concatMap(() => this.refreshToken()),
      )
      .subscribe();
  }

  async getToken() {
    try {
      const response: any = await this.http.get(this.api_host + '/api/token').toPromise();
      this.setCookie('token', response?.token, 0.05); // 0.5 hours, match ingram bearer token expiry
      this.tokenSubject.next();
    } catch (error) {
      console.error("Error getting token:", error);
    }
  }

  checkTokenExpiry(): Observable<void> {
    return new Observable<void>(observer => {
      const token = this.getCookie('token');
      if (token) {
        const currentTime = new Date().getTime();
        const tokenTimestamp = parseInt(token.split('.')[1], 10) * 1000;
        const tokenAge = currentTime - tokenTimestamp;

        if (tokenAge > this.tokenExpiryTime) {
          this.refreshToken().subscribe(() => {
            observer.next();
            observer.complete();
          });
        } else {
          observer.next();
          observer.complete();
        }
      } else {
        observer.next();
        observer.complete();
      }
    });
  }

  getData(type = 'GET', url: string, payload = null): Observable<Object> {
    const token = this.getCookie('token');
    var headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded',
      "device-id": this.getCookie('device_id'),
    };

    //if user logged in
    if(localStorage.getItem('user')) headers['user'] = JSON.parse(localStorage.getItem('user'))['Email'];

    if (type == 'GET') {
      return this.http.get(this.api_host + url, { headers: headers });
    } else if (type == 'POST') {
      return this.http.post(this.api_host + url, payload, { headers: headers });
    } else {
      return null;
    }
  }

  setCookie(name: string, value: string, hours: number) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 10000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/; secure;";
  }

  getCookie(name: string) {
    const cookieName = name + "=";
    var cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let item = cookieArray[i];
      while (item.charAt(0) == ' ') {
        item = item.substring(1);
      }
      if (item.indexOf(cookieName) == 0) {
        return item.substring(cookieName.length, item.length);
      }
    }
    return "";
  }

  deleteCookie(name: string) {
    document.cookie = name + "=null; expires=expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}
