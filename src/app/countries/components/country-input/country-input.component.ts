import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.css']
})
export class CountryInputComponent implements OnInit {

  criteria:string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder:string = '';

  debouncer: Subject<string> = new Subject();

  search(){
      this.onEnter.emit(this.criteria);      
  }

  keyPressed():void
  {
    this.debouncer.next(this.criteria);
  }

  constructor() { }  
  
  ngOnInit(): void {
     this.debouncer
     .pipe(
       debounceTime(300)
     )
     .subscribe(criteria=>{
       this.onDebounce.emit(criteria);
     })
  }
}
