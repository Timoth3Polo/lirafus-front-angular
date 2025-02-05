import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Type } from '../../core/models/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<Type[]> {
      return this.http.get<Type[]>('/lirafus-api/types');
    }
  
    getTypeByName(typeName: string): Observable<Type> {
      return this.http.get<Type>(`/lirafus-api/types/${typeName}`);
    }
}
