import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { ClasseListComponent } from './classe-list/classe-list.component';
import { ClasseCardComponent } from './classe-card/classe-card.component';
import { ClasseComponent } from './classe/classe.component';

@NgModule({
  declarations: [
    ClasseListComponent,
    ClasseCardComponent,
    ClasseComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UpperCasePipe,
    RouterLink
  ],
  exports: [
    ClasseListComponent,
    ClasseCardComponent,
    ClasseComponent,
  ]
})
export class ClasseModule { }
