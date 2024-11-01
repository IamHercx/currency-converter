import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment.prod';
import { QueeryParamsModel } from '../models/query-params.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = enviroment.apiUrl;
  private apiKey = enviroment.aipKey;

constructor(
  private http: HttpClient
) { }

   async get(endpoint: string, queryParams?: Array<QueeryParamsModel>): Promise<any>{

    let url: string = `${this.baseUrl}${endpoint}?api_key=${this.apiKey}`;
    if(queryParams){
      url = `${url}${this.buildQueryParamsString(queryParams)}`;
    }
    
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe({
        next: response => {
          resolve(response);
        },
        error: err => {
          console.log('Error Http GET: ', err);
          reject(err);
        }
      });
    });
     
  }

  private buildQueryParamsString(queryParams: Array<QueeryParamsModel>): string{
    var queryString = '';
    queryParams.forEach(record => {
      queryString = `${queryString}&${record.param}=${record.value}`     
    });
    return queryString;
  }

}
