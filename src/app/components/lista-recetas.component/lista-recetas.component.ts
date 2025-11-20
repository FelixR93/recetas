import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-recetas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.scss']
})
export class ListaRecetasComponent {
  recetas: Recipe[] = [];

  constructor(public svc: RecipeService, public router: Router) {
    this.recetas = this.svc.getAll();
  }

  verDetalle(id: string) {
    this.router.navigate(['/detalle', id]);
  }

  editar(id: string) {
    this.router.navigate(['/editar', id]);
  }

  toggleFavorite(id: string) {
    this.svc.toggleFavorite(id);
    this.recetas = this.svc.getAll();
  }

  eliminar(id: string) {
    if (confirm('¿Eliminar receta?')) {
      this.svc.remove(id);
      this.recetas = this.svc.getAll();
    }
  }
}
