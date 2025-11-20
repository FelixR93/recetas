import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-receta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-receta.component.html',
  styleUrls: ['./form-receta.component.scss']
})
export class FormRecetaComponent implements OnInit {
  receta: Recipe;
  editing = false;

  constructor(
    private svc: RecipeService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    // Inicialización para nueva receta
    this.receta = this.initReceta();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.svc.getById(id);
      if (found) {
        this.receta = { ...found };
        this.editing = true;
      }
    }
  }

  /** Inicializa un objeto receta vacío */
  private initReceta(): Recipe {
    return {
      id: '',
      title: '',
      description: '',
      ingredients: [''],
      steps: [''],
      favorite: false,
      image: ''
    };
  }

  // Ingredientes
  addIngredient() { this.receta.ingredients.push(''); }
  removeIngredient(i: number) { this.receta.ingredients.splice(i, 1); }

  // Pasos
  addStep() { this.receta.steps.push(''); }
  removeStep(i: number) { this.receta.steps.splice(i, 1); }

  // Subida de imagen
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => { this.receta.image = reader.result as string; };
    reader.readAsDataURL(file);
  }

  // Guardar receta
  submit() {
    if (!this.receta.title.trim()) {
      alert('Título requerido');
      return;
    }

    // Limpiar campos vacíos
    this.receta.ingredients = this.receta.ingredients.map(s => s.trim()).filter(s => s);
    this.receta.steps = this.receta.steps.map(s => s.trim()).filter(s => s);

    if (this.editing) {
      this.svc.update(this.receta);
    } else {
      this.receta.id = uuidv4();
      this.svc.add(this.receta);
      // Reiniciar receta para nuevo ingreso si se desea seguir agregando
      this.receta = this.initReceta();
    }

    this.router.navigate(['/']);
  }

  // trackBy para inputs dinámicos
  trackByIndex(index: number, item: any) {
    return index;
  }
}
