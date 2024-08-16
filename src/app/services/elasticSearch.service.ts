import { Injectable } from '@angular/core';
import { IngrammicroService } from './ingrammicro.service';
import {
  BehaviorSubject,
  Subscription,
  combineLatest,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { Router } from '@angular/router';
import getCorrectImage from '../utils/getCorrectImage';
import smartlook from 'smartlook-client';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchService {
  private subscription!: Subscription;
  private _searchResults: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public readonly searchResults$ = this._searchResults.asObservable();
  private _errorMessage: BehaviorSubject<String> = new BehaviorSubject('');
  public readonly errorMessage$ = this._errorMessage.asObservable();
  private isImeiSearchInProgress = false;
  constructor(private ingram: IngrammicroService, private router: Router) {}

  get searchResults(): Array<any> {
    return this._searchResults.getValue();
  }

  set searchResults(value: Array<any>) {
    this._searchResults.next(value);
  }

  get errorMessage(): String {
    return this._errorMessage.getValue();
  }

  set errorMessage(value: string) {
    this._errorMessage.next(value);
  }

  async search(value: string, withNavigate: boolean = false) {
    this.searchResults = [];
    this._errorMessage.next('');
    this.isImeiSearchInProgress = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // imeis
    if (/^[\d\s]+$/.test(value)) {
      //@ts-ignore
      if (value.replaceAll(' ', '').length === 15) {
        smartlook.track('Homepage IMEI search', {
          type: 'Homepage',
          imei: value,
        });
        this.isImeiSearchInProgress = true;
        await this.searchByIMEI(value, withNavigate);
        return;
      } else {
        return;
      }
    }

    // serials
    if (value.length >= 10 && !value.includes(' ')) {
      smartlook.track('Homepage serial search', {
        type: 'Homepage',
        serial: value,
      });
      this.isImeiSearchInProgress = true;
      await this.searchByIMEI(value, withNavigate);
    }

    // model
    smartlook.track('Homepage model search', {});
    await this.searchByName(value);
  }

  private searchByName(value: string) {
    this.subscription = this.ingram
      .createRequest(
        'POST',
        '/api/Model/GetModelbyModelName',
        `modelname=${value}`
      )
      .subscribe({
        next: (res: any) => {
          const response = res.devices;
          if (response.length >= 1) {
            const results = [];
            for (var i = 0; i < response.length; i++) {
              const item = response[i]._source;
              results.push(this.createResult(item, ''));
            }
            this._searchResults.next([...this.searchResults, ...results]);
          } else {
            if (!this.isImeiSearchInProgress) {
              this.errorMessage = 'Sorry we cannot find, please try again.';
            }
          }
        },
        error: () => {
          if (!this.isImeiSearchInProgress) {
            this.errorMessage = 'Sorry we cannot find, please try again.';
          }
        },
      });
  }

  private searchByIMEI(value: any, withNavigate: boolean) {
    this._errorMessage.next('');

    return this.ingram
      .createRequest(
        'POST',
        `/api/IMEI/LookupModelFromIMEI?IMEI=${value.replaceAll(' ', '')}`
      )
      .subscribe({
        next: async (res: any) => {
          try {
            res.data.ImageURL = await getCorrectImage(res.data.ImageURL);
            const response = res.data;
            if (response) {
              localStorage.setItem('foundDevice', JSON.stringify(response));
              this._searchResults.next([
                ...this.searchResults,
                this.createResult(response, 'IMEI', value),
              ]);
              if (withNavigate) {
                this.ingram
                  .createRequest(
                    'POST',
                    '/api/Mixpanel/track-homepage-search?type=imei' +
                      '&imei=' +
                      value.replaceAll(' ', '')
                  )
                  .subscribe();
                this.router.navigateByUrl(
                  this.createResult(response, 'IMEI', value).url
                );
              }
            }
          } catch (error) {
            this.errorMessage =
              'An error occurred while processing IMEI response.';
          } finally {
            this.isImeiSearchInProgress = false;
          }
        },
        error: () => {
          this.errorMessage =
            'Sorry we cannot find your IMEI or Serial number, please try again.';
          this.isImeiSearchInProgress = false;
        },
      });
  }

  private createResult(item: any, type?: string, value?: string) {
    return {
      name: item.FullName,
      url: this.buildUrl(type, item, value),
      value: item.CashValue.replace(/\D/g, ''),
      price: item.CashValue,
    };
  }

  private searchNameSort(value: any) {
    const _sortByTerm = function (data: any, term: any) {
      term = term.toLowerCase();
      const lastPart = term.split(' ').pop();
      if (!isNaN(lastPart) && lastPart) {
        return data.sort(function (a: any, b: any) {
          return a['name'].toLowerCase().indexOf(lastPart) >=
            b['name'].toLowerCase().indexOf(lastPart)
            ? 1
            : -1;
        });
      }

      return data.sort(function (a: any, b: any) {
        return a['name'].toLowerCase().indexOf(term) <=
          b['name'].toLowerCase().indexOf(term)
          ? 1
          : -1;
      });
    };
    _sortByTerm(this.searchResults, value);
  }

  private buildUrl(type: string, model: any, searchTerm = null) {
    if(model?.ProductClass.includes("Games Console")) {
      return `/device-questions?modelId=${model.ModelID}`;
    }
    if (type === 'IMEI') {
      return `/device-questions?imei=${searchTerm}`;
    } else {
      return `/device-questions?model=${model.FullNameURLFriendly}&id=${model.ModelID}`;
    }
  }
}
