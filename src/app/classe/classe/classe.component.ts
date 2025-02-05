import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, concatWith, forkJoin, map, Observable, switchMap, tap } from 'rxjs';

import { Classe } from '../../core/models/classe.model';
import { Type } from '../../core/models/type.model';
import { DataService } from '../../core/service/data.service';
import { ClasseService } from '../service/classe.service';
import { TypeService } from '../../type/service/type.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent implements OnInit {

  classe$!: Observable<Classe>;
  typeList$!: Observable<Type[]>;
  classeName!: string;
  isSmallScreen: boolean = false;
  overviews!: String[];

  constructor(private dataService: DataService, 
    private classeService: ClasseService, 
    private typeService: TypeService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.isSmallScreen = window.innerWidth <= 985;
    }
    
  ngOnInit(): void {
    
    this.getParamsFromRoute(["id"]).pipe(
      tap(paramValues =>
        this.classeName = paramValues[0]
    )).subscribe();

    this.classe$ = this.classeService.getClasseByName(this.classeName).pipe(
      tap((classe: Classe) => {
        this.typeList$ = this.getTypesFromClasse(classe);
        this.overviews = classe.overview.split("\\n");
      })
    );
  }

  getParamsFromRoute(params: string[]): Observable<string[]> {
    return this.activatedRoute.params.pipe(
      map(routeParams => {
        return params.map(param => routeParams[param]);
      })
    );
  }

  getTypesFromClasse(classe: Classe): Observable<Type[]> {
    const requests = classe.types
      .sort()
      .map(type => this.typeService.getTypeByName(type));
    
    return forkJoin(requests);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    this.isSmallScreen = event.target.innerWidth <= 992;
  }

  onSelectType(type: Type | null): void {

    this.dataService.setCurrentType(type);
    this.router.navigate(['/']);
  }
}
