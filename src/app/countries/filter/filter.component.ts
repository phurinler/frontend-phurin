import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() searchName = new EventEmitter<string>();
  @Input() isSearchDisable: boolean;

  constructor() {}

  ngOnInit(): void {}

  onSearchUpdate(event: Event) {
    let name = '';
    name = (<HTMLInputElement>event.target).value;
    this.searchName.emit(name);
  }
}
