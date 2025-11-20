import { Routes } from '@angular/router';
import { ListaRecetasComponent } from './components/lista-recetas.component/lista-recetas.component';
import { FormRecetaComponent } from './components/form-receta.component/form-receta.component';
import { DetalleRecetaComponent } from './components/detalle-receta.component/detalle-receta.component';
import { FavoritosComponent } from './components/favoritos.component/favoritos.component';

export const routes: Routes = [
  { path: '', component: ListaRecetasComponent },
  { path: 'agregar', component: FormRecetaComponent },
  { path: 'editar/:id', component: FormRecetaComponent },
  { path: 'detalle/:id', component: DetalleRecetaComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '**', redirectTo: '' }
];
