import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlFullFilterService {
  private filterSubject = new Subject<any>();
  currentFilter$ = this.filterSubject.asObservable();

  constructor() { }
}
