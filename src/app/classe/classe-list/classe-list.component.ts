import { Component, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { Classe } from '../../core/models/classe.model';
import { ClasseService } from '../service/classe.service';
import { DataService } from '../../core/service/data.service';
import { Type } from '../../core/models/type.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrl: './classe-list.component.scss'
})
export class ClasseListComponent implements OnDestroy {

  classeList$!: Observable<Classe[]>;
  filteredClasseList$: Observable<Classe[]> | null = null;
  private currentTypeSubscribe : Subscription;
  @Input() selectedType: Type | null = null;

  constructor(private classeService: ClasseService, private dataService: DataService) {
    this.classeList$ = this.classeService.getAllClasses();

    this.currentTypeSubscribe = this.dataService.currentType$.subscribe({
      next: () => {
        this.onCurrentTypeChange();
      }
    })
  }

  filterClasses(type: Type | null) {
    if(!!type) {
      this.filteredClasseList$ = this.classeList$.pipe(
        map(classes => classes.filter(classe => classe.types.includes(type.name)))
      );
    } else {
      this.filteredClasseList$ = this.classeList$;
    }
  }

  onCurrentTypeChange() {
    this.filterClasses(this.dataService.getCurrentType());
  }

  ngOnDestroy(): void {
    if (this.currentTypeSubscribe) {
      this.currentTypeSubscribe.unsubscribe();
    }
  }
}
