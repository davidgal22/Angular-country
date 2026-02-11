import { Country } from "../country/interfaces/country.interface";
import { RESTCountry } from "../country/interfaces/rest-countries.interfaces";

export class CountryMapper{

  static mapRestCountryToCountry(restCountry: RESTCountry): Country{
    return{
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name:restCountry.translations['spa'].common ?? 'NO Spanish name' ,
      population:restCountry.population,

    };
  }

     static mapRestCountryArrayToCountryArray(restCountry:RESTCountry[]):Country[]{
      return restCountry.map(this.mapRestCountryToCountry)
     }

  }
