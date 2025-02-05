import { DataService } from './../../core/service/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Router } from '@angular/router';

import { TypeService } from '../../type/service/type.service';
import { Type } from '../../core/models/type.model';
import { Classe } from '../../core/models/classe.model';

@Component({
  selector: 'app-classe-card',
  templateUrl: './classe-card.component.html',
  styleUrl: './classe-card.component.scss'
})
export class ClasseCardComponent implements OnInit {
  @Input() classe!: Classe;
  typeList!: Type[];

  constructor(private typeService: TypeService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    const requests = this.classe.types
                            .sort()
                            .map(type => this.typeService.getTypeByName(type));

    forkJoin(requests).subscribe({
      next: (results) => {
        this.typeList = results;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des types:', error);
      }
    });
  }

  loadClasseCard(): void {
    this.dataService.currentClasse = this.classe;
    this.router.navigate(['/classes', this.classe.name]);
  }
}
