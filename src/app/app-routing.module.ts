import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { TypeListComponent } from './type/type-list/type-list.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { ClasseComponent } from './classe/classe/classe.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'classes/:id', component: ClasseComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
