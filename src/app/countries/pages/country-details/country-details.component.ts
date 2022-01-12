import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country-interface';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CountryService
  ) {}

  country!: Country;

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe( ({countryCode})=>{
    //   console.log(countryCode);
    //   this.service.SearchCountryByCode(countryCode).subscribe(country=>{
    //       console.log(country);
    //   })
    // })

    this.activatedRoute.params
      .pipe(
        switchMap(({ countryCode }) =>
          this.service.SearchCountryByCode(countryCode)
        ),
        tap(console.log)
      )
      .subscribe((resp) => {
        this.country = resp[0]
      });
  }
}
