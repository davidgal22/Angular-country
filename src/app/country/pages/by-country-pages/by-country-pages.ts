import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'app-by-country-pages',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-pages.html',
})
export class ByCountryPages { }
