export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expiry_date: string | null;
  created_at: string;
}

export interface RecipeIngredient {
  id?: number;
  ingredient_name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: number;
  name: string;
  instructions: string[];
  cooking_time: number;
  difficulty: string;
  servings: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  ingredients: RecipeIngredient[];
}

export interface Favorite {
  id: number;
  user_id: number;
  recipe_id: number;
  created_at: string;
}

export interface RecipeHistory {
  id: number;
  query_ingredients: string;
  searched_at: string;
}

export interface ShoppingListItem {
  id: number;
  ingredient_name: string;
  quantity: number;
  unit: string;
  is_checked: boolean;
}

export interface ShoppingList {
  id: number;
  name: string;
  created_at: string;
  items: ShoppingListItem[];
}
