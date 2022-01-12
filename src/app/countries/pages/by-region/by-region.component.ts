import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styleUrls: ['./by-region.component.css'],
})
export class ByRegionComponent implements OnInit {
  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  activeRegion: string = '';

  hasErrors: boolean = false;
  countries: Country[] = [];

  // https://restcountries.com/v3.1/region/{region}

  constructor(private service: CountryService) {}

  ngOnInit(): void {}

  getCSSClass(region: string) {
    return region === this.activeRegion
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  SetActiveRegion(region: string) {
    if (region !== this.activeRegion) {
      this.hasErrors = false;
      this.activeRegion = region;
      this.countries = [];
      this.service.SearchContriesByRegion(region).subscribe(
        (countries) => {
          this.countries = countries;
        },
        (err) => {
          this.hasErrors = true;
          this.countries = [];
        }
      );
    }
  }
}
