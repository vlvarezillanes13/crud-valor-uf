import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearValorComponent } from './crear-valor/crear-valor.component';
import { ListarValoresComponent } from './listar-valores/listar-valores.component';
import { ActualizarValorComponent } from './actualizar-valor/actualizar-valor.component';
import { VistaGraficoComponent } from './vista-grafico/vista-grafico.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado',
        component:ListarValoresComponent
      },
      {
        path:'agregar',
        component: CrearValorComponent
      },
      {
        path:'editar/:id',
        component: ActualizarValorComponent
      },
      {
        path:'grafico',
        component: VistaGraficoComponent
      },
      {
        path:'**',
        redirectTo:'listado'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UFRoutingModule { }
