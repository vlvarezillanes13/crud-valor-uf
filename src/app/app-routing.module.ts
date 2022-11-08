import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'desafio',
    loadChildren: () => import('./UF/uf.module').then( m => m.UFModule )
  },
  {
    path:'**',
    redirectTo:'desafio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
