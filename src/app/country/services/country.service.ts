import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../../mappers/country.mappers';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http: HttpClient = inject(HttpClient);

  searchByCapital(query:string): Observable<Country[]>{
    query = query.toLocaleLowerCase();

    return this.http
    .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError(error => {
          console.log('Error fetching', error);

          return throwError(() => new Error(`No se puedo obtener el pais ${query}`))
        })
      );
  }
  searchByCountry(query:string): Observable<Country[]>{
    query = query.toLocaleLowerCase();

    return this.http
    .get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError(error => {
          console.log('Error fetching', error);

          return throwError(() => new Error(`No se puedo obtener el pais ${query}`))
        })
      );
  }
}
