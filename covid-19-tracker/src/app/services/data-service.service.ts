import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs';
import { GlobalData } from '../models/global-data.model';
import { globalAgent } from 'http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUrl : string = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/11-11-2020.csv";
  constructor(private httpClient: HttpClient) { }
  
  getGlobalData()  {
    return this.httpClient.get(this.dataUrl, {responseType:'text'})
    .pipe(
      map(resp=> {
        let globalData = {};

        let rows = resp.split("\n");
        rows.splice(0, 1);
        rows.forEach(col=> {
          let splittedCol = col.split(/,(?! )/);
          let data : GlobalData = {
            country: splittedCol[3],
            confirmed: parseInt(splittedCol[7]) == NaN ? 0 :  parseInt(splittedCol[7]),
            deaths: parseInt(splittedCol[8]) == NaN ? 0: parseInt(splittedCol[8]),
            recovered: parseInt(splittedCol[9]) == NaN ? 0: parseInt(splittedCol[9]),
            active: parseInt(splittedCol[10]) == NaN? 0: parseInt(splittedCol[9])
          }
          if(data.country) {
            if(globalData[data.country]) {
              globalData[data.country].confirmed+= data.confirmed;
              globalData[data.country].deaths+= data.deaths;
              globalData[data.country].active+= data.active;
              globalData[data.country].recovered+= data.recovered;
            } else {
              globalData[data.country]= data;
            }
          }
        });
        return <GlobalData[]>Object.values(globalData)
      })
    );
  }

}
