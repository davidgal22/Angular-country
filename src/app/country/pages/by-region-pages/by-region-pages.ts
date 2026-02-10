import { Component } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'app-by-region-pages',
  imports: [CountryList],
  templateUrl: './by-region-pages.html',
})
export class ByRegionPages { }
