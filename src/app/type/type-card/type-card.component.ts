import { Component, Input } from '@angular/core';

import { Type } from '../../core/models/type.model';
import { DataService } from './../../core/service/data.service';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrl: './type-card.component.scss'
})
export class TypeCardComponent {
  @Input() type!: Type;

  constructor(private dataService: DataService) { }

  onSelectType() {
    this.dataService.setCurrentType(this.type);
  }
}