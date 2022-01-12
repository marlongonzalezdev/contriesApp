import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country-interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styleUrls: ['./by-capital.component.css']
})
export class ByCapitalComponent implements OnInit {

  criteria: string = '';
  hasErrors: boolean = false;
  countries: Country[] = [];

  constructor(private service: CountryService) {}
  
  ngOnInit(): void {
    
  }
  search(criteria:string) {
    this.criteria = criteria;
    this.hasErrors = false;
    this.service.SearchByCapital(this.criteria).subscribe((countries) => {
         this.countries = countries;
    }, (err) => {
       this.hasErrors = true;
       this.countries = [];
    });
  }
}
