import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() childCountriesAll = [];
  @Input() childSearchName = '';
  countries = [];
  max: number;
  loadMax: number = 0;
  isLoading: boolean = false;
  isSearch: boolean = false;
  isSearchEmpty: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(change: SimpleChange) {
    if (change['childSearchName']) {
      this.loadMax = 20;
      this.getCountriesBySearching(change['childSearchName'].currentValue);
    }
    change['childCountriesAll'] &&
      change['childCountriesAll'].currentValue.length > 0 &&
      this.getCountriesAll();
  }

  getCountriesAll() {
    if (this.childCountriesAll.length > 0) {
      this.max = this.childCountriesAll.length;
      this.isLoading = true;
      this.loadMax = 20;
      this.getCountries();
    }
  }

  getCountries() {
    this.countries = this.childCountriesAll.filter(
      (el) => el.i >= 1 && el.i <= this.loadMax
    );
    this.countries.length === 0
      ? (this.isSearchEmpty = true)
      : (this.isSearchEmpty = false);
  }

  onLoadMore() {
    this.loadMax += 10;
    if (this.isSearch) {
      this.getCountriesBySearching(this.childSearchName);
    } else {
      this.getCountries();
    }
  }

  getCountriesBySearching(value) {
    if (value) {
      this.isSearch = true;
      this.max = this.childCountriesAll.filter((el) =>
        el.name.toLowerCase().includes(value.toLowerCase().trim())
      ).length;
      let name = this.childCountriesAll
        .filter((el) =>
          el.name.toLowerCase().includes(value.toLowerCase().trim())
        )
        .slice(0, this.loadMax);
      this.countries = name;
      this.countries.length === 0
        ? (this.isSearchEmpty = true)
        : (this.isSearchEmpty = false);
    } else if (!value) {
      this.isSearch = false;
      this.max = this.childCountriesAll.length;
      this.getCountries();
    }
  }
}
