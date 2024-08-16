import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostcodeSearchService {
  private token:string = environment.lookupToken;
  constructor(private http: HttpClient) {}

  get(value: string) {
    return this.http.get(`https://postcode.devicetradein.co.uk/api/postcode/lookup?postcode=${value}&token=${this.token}`)
  }
}
