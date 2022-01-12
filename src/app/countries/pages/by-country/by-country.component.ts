import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styleUrls: ['./by-country.component.css'],
})
export class ByCountryComponent implements OnInit {
  criteria: string = '';
  hasErrors: boolean = false;
  countries: Country[] = [];
  suggestions: Country[] = [];

  showSuggestions: boolean = false;

  constructor(private service: CountryService) {}

  ngOnInit(): void {}

  search(criteria: string) {

    this.countries = [];
    this.criteria = criteria;
    this.hasErrors = false;

    this.showSuggestions = false;
    this.service.SearchByCountry(this.criteria).subscribe(
      (countries) => {
        this.countries = countries;
      },
      (err) => {
        this.hasErrors = true;
        this.countries = [];
      }
    );
  }

  getSuggestions(criteria: string) {
    this.countries = [];
    this.criteria = criteria;
    this.showSuggestions = true;
    this.service.SearchByCountry(criteria).subscribe(
      (countries) => {
        this.suggestions = countries.splice(0,5);
      },
      (err) => {
        
        this.suggestions = [];
      }
    );
  }

  searchBySuggestion(criteria: string){
    this.search(criteria);    
  }
}
