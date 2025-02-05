import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Classe } from '../../core/models/classe.model';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private http: HttpClient) { }

  getAllClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>('/lirafus-api/classes');
  }

  getClasseByName(classeName: string): Observable<Classe> {
    return this.http.get<Classe>(`lirafus-api/classes/${classeName}`);
  }
}