from flask import Blueprint, jsonify
from app.models import Recipe, Ingredient

recipes_bp = Blueprint('recipes', __name__, url_prefix='/api/recipes')

@recipes_bp.route('', methods=['GET'])
def get_matching_recipes():
    # Hardcoded to Guest user ID 1
    user_id = 1
    
    # 1. Fetch user's inventory and normalize names
    user_items = Ingredient.query.filter_by(user_id=user_id).all()
    fridge = {item.name.lower().strip(): item for item in user_items}
    
    # 2. Fetch all recipes
    all_recipes = Recipe.query.all()
    results = []
    
    for recipe in all_recipes:
        matched_count = 0
        missing = []
        available = []
        
        # Check ingredients needed for this recipe
        for req_ing in recipe.ingredients:
            req_name = req_ing.ingredient_name.lower().strip()
            
            if req_name in fridge:
                user_ing = fridge[req_name]
                if user_ing.quantity >= req_ing.quantity:
                    matched_count += 1
                    available.append({
                        "name": req_ing.ingredient_name,
                        "quantity": req_ing.quantity,
                        "unit": req_ing.unit,
                        "owned_quantity": user_ing.quantity
                    })
                else:
                    shortfall = req_ing.quantity - user_ing.quantity
                    missing.append({
                        "name": req_ing.ingredient_name,
                        "quantity": shortfall,
                        "unit": req_ing.unit,
                        "required_quantity": req_ing.quantity,
                        "owned_quantity": user_ing.quantity
                    })
            else:
                missing.append({
                    "name": req_ing.ingredient_name,
                    "quantity": req_ing.quantity,
                    "unit": req_ing.unit,
                    "required_quantity": req_ing.quantity,
                    "owned_quantity": 0.0
                })
        
        # Calculate percentage match
        total_req = len(recipe.ingredients)
        match_percentage = round((matched_count / total_req) * 100) if total_req > 0 else 100
        
        recipe_dict = recipe.to_dict()
        results.append({
            "recipe": recipe_dict,
            "match_percentage": match_percentage,
            "available_ingredients": available,
            "missing_ingredients": missing
        })
        
    # Sort by match percentage descending, then recipe name
    results.sort(key=lambda x: (-x["match_percentage"], x["recipe"]["name"]))
    
    return jsonify(results), 200
