import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country-interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  get HttpParams() {
    return new HttpParams().set('fields', 'name,capital,flags,population,cca2');
  }

  constructor(private httpClient: HttpClient) {}

  SearchByCountry(country: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${country}`;

    return this.httpClient.get<Country[]>(url, { params: this.HttpParams });
  }

  SearchByCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;

    return this.httpClient.get<Country[]>(url, { params: this.HttpParams });
  }

  SearchCountryByCode(countryCode: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${countryCode}`;

    return this.httpClient.get<Country[]>(url);
  }

  SearchContriesByRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;

    return this.httpClient.get<Country[]>(url, { params: this.HttpParams });
  }
}
