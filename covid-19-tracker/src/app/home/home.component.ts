import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { Observable } from 'rxjs';
import { GlobalData } from '../models/global-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalActive: number;
  totalRecovered: number;
  totalDeaths: number;
  totalConfirmed: number;
  constructor(private dataService: DataService) {
    this.totalActive = 0;
    this.totalRecovered = 0;
    this.totalDeaths = 0;
    this.totalConfirmed = 0;
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (resp) => {
        resp.forEach(item=> {
          this.totalActive+= item.active;
         // this.totalRecovered += item.recovered;
          this.totalConfirmed+= item.confirmed;
          this.totalDeaths += item.deaths;
        });
        
      },
      error: (er) => {
        console.log(er);
      }
    });
  }

}
