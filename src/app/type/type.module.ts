import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TypeListComponent } from './type-list/type-list.component';
import { TypeCardComponent } from './type-card/type-card.component';

@NgModule({
  declarations: [
    TypeListComponent,
    TypeCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UpperCasePipe
  ],
  exports: [
    TypeListComponent,
    TypeCardComponent
  ]
})
export class TypeModule { }
