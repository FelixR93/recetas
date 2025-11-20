import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-receta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-receta.component.html',
  styleUrls: ['./detalle-receta.component.scss']
})
export class DetalleRecetaComponent implements OnInit {
  receta?: Recipe;

  constructor(private route: ActivatedRoute, public router: Router, private svc: RecipeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.receta = this.svc.getById(id);
  }

  toggleFavorite() {
    if (this.receta) {
      this.svc.toggleFavorite(this.receta.id);
      this.receta.favorite = !this.receta.favorite;
    }
  }

  volver() { this.router.navigate(['/']); }
}
