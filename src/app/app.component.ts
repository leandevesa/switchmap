import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { switchMap, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  search$ = new Subject<string>();
  subscription: Subscription;
  title = 'switchmap';

  constructor(private http: HttpClient) {

    this.subscription = this.search$.pipe(
      debounceTime(400),
      switchMap(searchText => http.get('https://jsonplaceholder.typicode.com/todos/1', {
        params: {
          asd: searchText
        }
      }))
     ).subscribe(response => {
        console.log(response);
     });
  }

  handleTextChange(newText: string) {
    console.log(newText);
      return this.search$.next(newText);
  }
}
