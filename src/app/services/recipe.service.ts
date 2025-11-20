import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private storageKey = 'recipes_v1';
  private recipes: Recipe[] = [];

  constructor() {
    this.load();
    if (this.recipes.length === 0) {
      this.seedRecipes(); // cargar recetas de ejemplo si no hay nada
    }
  }

  private seedRecipes() {
    this.recipes = [
      {
        id: uuidv4(),
        title: 'Spaghetti Carbonara',
        description: 'Pasta clásica italiana con tocino y queso.',
        ingredients: ['200g spaghetti', '100g tocino', '2 huevos', '50g parmesano'],
        steps: ['Cocer la pasta', 'Freír el tocino', 'Mezclar huevos con queso', 'Combinar todo'],
        favorite: false,
        image: 'https://images.unsplash.com/photo-1603133872871-77f3eb4c4b82'
      },
      {
        id: uuidv4(),
        title: 'Ensalada César',
        description: 'Ensalada fresca con pollo y aderezo César.',
        ingredients: ['Lechuga', 'Pechuga de pollo', 'Croutons', 'Aderezo César'],
        steps: ['Cortar lechuga', 'Cocinar pollo', 'Mezclar con aderezo', 'Agregar croutons'],
        favorite: false,
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092'
      },
      {
        id: uuidv4(),
        title: 'Tacos al Pastor',
        description: 'Tacos mexicanos tradicionales con carne marinada.',
        ingredients: ['Carne de cerdo', 'Piña', 'Cilantro', 'Tortillas'],
        steps: ['Marinar carne', 'Asar carne', 'Calentar tortillas', 'Servir con piña y cilantro'],
        favorite: false,
        image: 'https://images.unsplash.com/photo-1604908177522-7d9c77b7e4b3'
      },
      {
        id: uuidv4(),
        title: 'Pancakes',
        description: 'Deliciosos pancakes para el desayuno.',
        ingredients: ['Harina', 'Leche', 'Huevos', 'Miel'],
        steps: ['Mezclar ingredientes', 'Cocinar en sartén', 'Servir con miel'],
        favorite: false,
        image: 'https://images.unsplash.com/photo-1587730122710-7a1e4b18f22f'
      },
      {
        id: uuidv4(),
        title: 'Sushi Rolls',
        description: 'Rollos de sushi variados con pescado fresco.',
        ingredients: ['Arroz para sushi', 'Alga nori', 'Pescado', 'Verduras'],
        steps: ['Preparar arroz', 'Colocar alga', 'Añadir relleno', 'Enrollar y cortar'],
        favorite: false,
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754'
      },
      {
        id: uuidv4(),
        title: 'Pizza Margherita',
        description: 'Pizza clásica con tomate, mozzarella y albahaca.',
        ingredients: ['Masa de pizza', 'Tomate', 'Mozzarella', 'Albahaca'],
        steps: ['Preparar masa', 'Añadir ingredientes', 'Hornear'],
        favorite: false,
        image: 'https://images.unsplash.com/photo-1594007656480-2fc8f9d859a5'
      },
      {
        id: uuidv4(),
        title: 'Brownies de Chocolate',
        description: 'Postre dulce y chocolatoso.',
        ingredients: ['Chocolate', 'Harina', 'Huevos', 'Azúcar'],
        steps: ['Derretir chocolate', 'Mezclar ingredientes', 'Hornear'],
        favorite: false,
        image: 'https://images.unsplash.com/photo-1601913475696-130d7e1e97a5'
      },
      {
        id: uuidv4(),
        title: 'Guacamole',
        description: 'Dip mexicano de aguacate, ideal con totopos.',
        ingredients: ['Aguacate', 'Cebolla', 'Tomate', 'Limón'],
        steps: ['Picar ingredientes', 'Machacar aguacate', 'Mezclar todo'],
        favorite: false,
        image: 'https://images.unsplash.com/photo-1601050690111-44f62e6d2c07'
      }
    ];
    this.save();
  }

  private save() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.recipes));
    }
  }

  private load() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(this.storageKey);
      this.recipes = raw ? JSON.parse(raw) : [];
    } else {
      this.recipes = [];
    }
  }

  getAll(): Recipe[] { return [...this.recipes]; }
  getById(id: string): Recipe | undefined { return this.recipes.find(r => r.id === id); }
  getFavorites(): Recipe[] { return this.recipes.filter(r => r.favorite); }
  add(recipe: Recipe) { this.recipes.push(recipe); this.save(); }
  update(updated: Recipe) {
    const i = this.recipes.findIndex(r => r.id === updated.id);
    if(i !== -1){ this.recipes[i] = { ...updated }; this.save(); }
  }
  remove(id: string) { this.recipes = this.recipes.filter(r => r.id !== id); this.save(); }
  toggleFavorite(id: string) {
    const recipe = this.getById(id);
    if(recipe){ recipe.favorite = !recipe.favorite; this.save(); }
  }
}
