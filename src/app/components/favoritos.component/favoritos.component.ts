import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  favoritos: Recipe[] = [];

  constructor(private svc: RecipeService, public router: Router) {}

  ngOnInit(): void { this.favoritos = this.svc.getFavorites(); }

  verDetalle(id: string) { this.router.navigate(['/detalle', id]); }
  toggleFavorite(id: string) { this.svc.toggleFavorite(id); this.favoritos = this.svc.getFavorites(); }
}
