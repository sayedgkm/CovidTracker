import { Component, OnInit } from '@angular/core';
import { GlobalData } from '../models/global-data.model';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countryWiseCovidDataList: GlobalData[];
  currentPageIndex: number;
  numberOfPages: number;
  itemPerPage: number;

  constructor(private dataService: DataService) {
    this.itemPerPage = 10;
    this.currentPageIndex = 1;
   }

  ngOnInit(): void {
    this.fetchCountryData(this.currentPageIndex);
  }

  fetchCountryData(currentPage: number) {
    this.dataService.getGlobalData().subscribe({
      next: (resp) => {
        let dataCnt = resp.length;
        this.numberOfPages = (dataCnt + this.itemPerPage - 1)/this.itemPerPage; 
        let start: number = (this.currentPageIndex - 1) * this.itemPerPage;
        let end : number = start + this.itemPerPage;
        this.countryWiseCovidDataList = resp.slice(start, end);
      },
      error: (er) => {
        console.log(er);
      }
    });
  }

  changePage(idx: number) {
    this.currentPageIndex = idx;
    this.fetchCountryData(this.currentPageIndex);
  }
}
