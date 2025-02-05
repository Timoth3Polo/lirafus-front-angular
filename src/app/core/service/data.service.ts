import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Classe } from '../models/classe.model';
import { Type } from '../models/type.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public classeList:          Classe[]  | [] = [];
  public filteredClasseList:  Classe[]  | [] = [];
  public typeList:            Type[]    | [] = [];
  public currentClasse:       Classe    | null = null;

  private currentType = new BehaviorSubject<Type | null>(null);
  currentType$ = this.currentType.asObservable();

  constructor() { }

  setCurrentType(value: Type | null): void {
    this.currentType.next(value);
  }

  getCurrentType(): Type | null {
    return this.currentType.value;
  }
}
