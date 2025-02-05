import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Type } from '../../core/models/type.model';
import { TypeService } from '../service/type.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrl: './type-list.component.scss'
})
export class TypeListComponent {

  typeList$: Observable<Type[]>;
  
  constructor(private typeService: TypeService) {
    this.typeList$ = this.typeService.getAllTypes();
  }
}
