import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { ChefHat, Search, Clock, Award, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../services/api';
import type { Recipe } from '../types';

interface MatchedRecipe {
  recipe: Recipe;
  match_percentage: number;
  available_ingredients: any[];
  missing_ingredients: any[];
}

export const RecipeGenerator: React.FC = () => {
  const [recipes, setRecipes] = useState<MatchedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRecipeId, setExpandedRecipeId] = useState<number | null>(null);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const data = await api.recipes.getMatching();
      setRecipes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch recipes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedRecipeId(expandedRecipeId === id ? null : id);
  };

  const filteredRecipes = recipes.filter((item) =>
    item.recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm text-slate-500">
            Discover meals matching ingredients available inside your fridge.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
          <p className="text-xs font-semibold text-rose-800">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400 font-semibold animate-pulse">Analyzing fridge ingredients...</p>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="py-20 text-center bg-white border border-slate-100 rounded-3xl">
          <ChefHat className="mx-auto text-slate-300 mb-3" size={40} />
          <p className="text-slate-500 text-sm font-semibold mb-1">No matching recipes found</p>
          <p className="text-slate-450 text-xs max-w-sm mx-auto">
            {searchQuery ? "Try refining your search keyword." : "Add basic cooking ingredients like eggs, oil, tomato, onion, or bread to match recipes."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecipes.map((item) => {
            const { recipe, match_percentage, available_ingredients, missing_ingredients } = item;
            const isExpanded = expandedRecipeId === recipe.id;
            const difficultyColor = 
              recipe.difficulty.toLowerCase() === 'easy' ? 'text-emerald-600 bg-emerald-50' : 
              recipe.difficulty.toLowerCase() === 'medium' ? 'text-amber-600 bg-amber-50' : 
              'text-rose-600 bg-rose-50';

            return (
              <Card 
                key={recipe.id}
                className={`transition-all duration-300 overflow-hidden border-2 ${
                  match_percentage === 100 
                    ? 'border-emerald-100 shadow-emerald-50/50 hover:border-emerald-300' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Header click toggles expand */}
                <div 
                  onClick={() => toggleExpand(recipe.id)}
                  className="flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-extrabold text-lg text-slate-800 truncate leading-snug">
                        {recipe.name}
                      </h3>
                      {match_percentage === 100 ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full shrink-0">
                          Ready to Cook
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full shrink-0">
                          {match_percentage}% Match
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {recipe.cooking_time} mins
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider ${difficultyColor}`}>
                        {recipe.difficulty}
                      </span>
                      <span>
                        {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Circle match chart */}
                    <div className="w-11 h-11 rounded-full border-4 border-slate-100 flex items-center justify-center font-bold text-xs relative" style={{
                      borderColor: match_percentage === 100 ? '#10b981' : match_percentage > 50 ? '#f59e0b' : '#ef4444'
                    }}>
                      {match_percentage}%
                    </div>
                    <button className="p-1 text-slate-400 rounded-lg hover:bg-slate-50 transition-colors">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Expanded details section */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-6 animate-fade-in">
                    {/* Nutrition tags */}
                    <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-2xl text-center">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calories</p>
                        <p className="font-extrabold text-slate-800 text-sm">{recipe.calories} kcal</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Protein</p>
                        <p className="font-extrabold text-slate-800 text-sm">{recipe.protein}g</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Carbs</p>
                        <p className="font-extrabold text-slate-800 text-sm">{recipe.carbohydrates}g</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fat</p>
                        <p className="font-extrabold text-slate-800 text-sm">{recipe.fat}g</p>
                      </div>
                    </div>

                    {/* Ingredients Checklist */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        <Award size={16} className="text-emerald-600" />
                        Ingredient Match Checklist
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Available */}
                        {available_ingredients.map((ing) => (
                          <div key={ing.name} className="flex items-center gap-2 text-sm bg-emerald-50/40 border border-emerald-100 p-2.5 rounded-xl">
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                            <span className="font-medium text-slate-700">
                              {ing.name} <span className="text-xs text-slate-400">({ing.quantity} {ing.unit})</span>
                            </span>
                          </div>
                        ))}
                        {/* Missing */}
                        {missing_ingredients.map((ing) => (
                          <div key={ing.name} className="flex items-start gap-2 text-sm bg-amber-50/40 border border-amber-100 p-2.5 rounded-xl">
                            <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                            <span className="font-medium text-slate-700">
                              {ing.name} <span className="text-xs text-slate-400">({ing.required_quantity} {ing.unit})</span>
                              <span className="block text-[11px] font-bold text-amber-600">
                                Missing: {ing.quantity} {ing.unit} (Have: {ing.owned_quantity})
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Steps / Instructions */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        <ChefHat size={16} className="text-emerald-600" />
                        Instructions
                      </h4>
                      <ol className="space-y-3">
                        {recipe.instructions.map((step, idx) => (
                          <li key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-650">
                            <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-slate-600">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default RecipeGenerator;
