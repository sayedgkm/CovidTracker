import { DebugNode, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { GlobalData } from '../models/global-data.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUrl: string = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/02-11-2022.csv";
  constructor(private httpClient: HttpClient) { }

  getGlobalData() {
    return this.httpClient.get(this.dataUrl, { responseType: 'text' })
      .pipe(
        map(resp => {
          let globalData = {};
          let rows = resp.split("\n");
          rows.splice(0, 1);
          rows.forEach(col => {
            let splittedCol = col.split(/,(?! )/);
            let data: GlobalData = {
              country: splittedCol[3],
              confirmed: isNaN(parseInt(splittedCol[7])) == true ? 0 : parseInt(splittedCol[7]),
              deaths: isNaN(parseInt(splittedCol[8])) == true ? 0 : parseInt(splittedCol[8]),
              recovered: isNaN(parseInt(splittedCol[9])) == true ? 0 : parseInt(splittedCol[9]),
              active: isNaN(parseInt(splittedCol[10])) == true ? 0 : parseInt(splittedCol[10])
            }
            if (data.country) {
              if (globalData[data.country]) {
                globalData[data.country].confirmed += data.confirmed;
                globalData[data.country].deaths += data.deaths;
                globalData[data.country].active += data.active;
                globalData[data.country].recovered += data.recovered;
              } else {
                globalData[data.country] = data;
              }
            }
          });
          return <GlobalData[]>Object.values(globalData)
        })
      );
  }

}
