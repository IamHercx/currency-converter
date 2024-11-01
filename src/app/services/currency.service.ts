import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { enviroment } from '../../environments/environment';
import { CurrencyModel } from '../models/currency.model';
import { Subject } from 'rxjs';
import { QueeryParamsModel } from '../models/query-params.model';
import { ConversionModel } from '../models/conversion.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private convertEndpoint = enviroment.convertEndpoint;
  private currenciesEndpoint = enviroment.currenciesEndpoint;
  public availableCurrencies: Subject<CurrencyModel[]> = new Subject<CurrencyModel[]>;

  constructor(
    private httpSerice: HttpService
  ) { 
    this.getAvailableCurrencies();
  }
  
  private async getAvailableCurrencies() {
    const resposne = await this.httpSerice.get(this.currenciesEndpoint);
    this.availableCurrencies.next(resposne.response as CurrencyModel[]);
  }

  public async getCurrencyConversion(queryParams: QueeryParamsModel[]){
    const response = await this.httpSerice.get(this.convertEndpoint,queryParams);
    return response.response as ConversionModel;
  }
}
