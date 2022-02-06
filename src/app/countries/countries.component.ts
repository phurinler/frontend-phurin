import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  parentCountriesAll = [];
  parentSearchName: string;
  isLoading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getCountriesAll();
  }

  getCountriesAll() {
    this.http.get<any>('https://restcountries.com/v2/all').subscribe(
      (res) => {
        this.parentCountriesAll = res.map((el: any, index: number) => {
          return {
            i: index + 1,
            name: el.name,
            capital: el.capital ? el.capital : ' - ',
            subregion: el.subregion,
            population: el.population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          };
        });
      },
      (error) => {
        this.openSnackBar(`getCountriesAll Failed. (${error.message})`);
      },
      () => {
        this.isLoading = true;
      }
    );
  }

  getSearchName(value: string) {
    this.parentSearchName = value;
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
