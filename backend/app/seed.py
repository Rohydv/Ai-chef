from app.models import db, Recipe, RecipeIngredient

def seed_recipes():
    # Clear existing recipes first to avoid duplication
    Recipe.query.delete()
    RecipeIngredient.query.delete()
    
    recipes_data = [
        {
            "name": "Classic Scrambled Eggs",
            "instructions": "Whisk eggs, milk, salt, and pepper in a bowl.\nMelt butter in a non-stick skillet over medium-low heat.\nPour in the eggs and cook, stirring gently, until cooked through.\nServe warm.",
            "cooking_time": 10,
            "difficulty": "Easy",
            "servings": 1,
            "calories": 220,
            "protein": 14.0,
            "carbohydrates": 2.0,
            "fat": 18.0,
            "ingredients": [
                {"name": "Eggs", "quantity": 2, "unit": "pcs"},
                {"name": "Milk", "quantity": 30, "unit": "ml"},
                {"name": "Butter", "quantity": 10, "unit": "g"},
                {"name": "Salt", "quantity": 1, "unit": "pinch"},
                {"name": "Pepper", "quantity": 1, "unit": "pinch"}
            ]
        },
        {
            "name": "Tomato Basil Pasta",
            "instructions": "Cook pasta according to package instructions.\nIn a pan, heat olive oil and sauté minced garlic and chopped onion until soft.\nAdd diced tomatoes and simmer for 10 minutes.\nStir in cooked pasta and fresh basil leaves.\nSeason with salt and pepper, top with parmesan cheese.",
            "cooking_time": 20,
            "difficulty": "Easy",
            "servings": 2,
            "calories": 450,
            "protein": 12.0,
            "carbohydrates": 75.0,
            "fat": 10.0,
            "ingredients": [
                {"name": "Pasta", "quantity": 200, "unit": "g"},
                {"name": "Tomato", "quantity": 3, "unit": "pcs"},
                {"name": "Garlic", "quantity": 2, "unit": "cloves"},
                {"name": "Onion", "quantity": 1, "unit": "pcs"},
                {"name": "Olive Oil", "quantity": 15, "unit": "ml"},
                {"name": "Basil", "quantity": 10, "unit": "g"},
                {"name": "Cheese", "quantity": 30, "unit": "g"}
            ]
        },
        {
            "name": "Avocado Toast with Egg",
            "instructions": "Toast the bread slice to desired crispiness.\nMash the avocado in a bowl with lemon juice, salt, and pepper.\nFry or poach the egg to your liking.\nSpread mashed avocado on the toast and top with the cooked egg.",
            "cooking_time": 10,
            "difficulty": "Easy",
            "servings": 1,
            "calories": 310,
            "protein": 11.0,
            "carbohydrates": 22.0,
            "fat": 20.0,
            "ingredients": [
                {"name": "Bread", "quantity": 1, "unit": "slice"},
                {"name": "Avocado", "quantity": 0.5, "unit": "pcs"},
                {"name": "Eggs", "quantity": 1, "unit": "pcs"},
                {"name": "Salt", "quantity": 1, "unit": "pinch"},
                {"name": "Pepper", "quantity": 1, "unit": "pinch"}
            ]
        },
        {
            "name": "Chicken Caesar Salad",
            "instructions": "Season chicken breast with salt and pepper, and grill or pan-fry until cooked through. Let it rest and slice.\nToss chopped romaine lettuce with Caesar dressing and croutons in a bowl.\nTop with sliced chicken and grated parmesan cheese.",
            "cooking_time": 25,
            "difficulty": "Medium",
            "servings": 2,
            "calories": 390,
            "protein": 32.0,
            "carbohydrates": 12.0,
            "fat": 24.0,
            "ingredients": [
                {"name": "Chicken", "quantity": 250, "unit": "g"},
                {"name": "Lettuce", "quantity": 150, "unit": "g"},
                {"name": "Caesar Dressing", "quantity": 30, "unit": "ml"},
                {"name": "Cheese", "quantity": 20, "unit": "g"},
                {"name": "Bread", "quantity": 1, "unit": "slice"}
            ]
        },
        {
            "name": "Beef Stir Fry",
            "instructions": "Slice beef into thin strips. Toss with a bit of soy sauce and cornstarch.\nHeat oil in a wok or large skillet over high heat. Sear beef strips for 2-3 minutes, then remove.\nIn the same pan, stir-fry broccoli, bell peppers, and onion until tender-crisp.\nReturn beef to pan, add soy sauce, garlic, and ginger. Toss and cook for another minute.",
            "cooking_time": 20,
            "difficulty": "Medium",
            "servings": 2,
            "calories": 420,
            "protein": 28.0,
            "carbohydrates": 18.0,
            "fat": 26.0,
            "ingredients": [
                {"name": "Beef", "quantity": 300, "unit": "g"},
                {"name": "Broccoli", "quantity": 150, "unit": "g"},
                {"name": "Bell Pepper", "quantity": 1, "unit": "pcs"},
                {"name": "Onion", "quantity": 1, "unit": "pcs"},
                {"name": "Garlic", "quantity": 2, "unit": "cloves"},
                {"name": "Soy Sauce", "quantity": 20, "unit": "ml"}
            ]
        },
        {
            "name": "Vegetable Omelette",
            "instructions": "Whisk eggs with a pinch of salt and pepper.\nSauté chopped bell pepper, onion, and tomato in butter until soft.\nPour whisked eggs over the vegetables, cook on medium-low.\nOnce edges set, lift to let raw egg flow underneath.\nFold in half and serve.",
            "cooking_time": 12,
            "difficulty": "Easy",
            "servings": 1,
            "calories": 250,
            "protein": 14.0,
            "carbohydrates": 6.0,
            "fat": 19.0,
            "ingredients": [
                {"name": "Eggs", "quantity": 2, "unit": "pcs"},
                {"name": "Tomato", "quantity": 0.5, "unit": "pcs"},
                {"name": "Onion", "quantity": 0.25, "unit": "pcs"},
                {"name": "Bell Pepper", "quantity": 0.25, "unit": "pcs"},
                {"name": "Butter", "quantity": 10, "unit": "g"}
            ]
        },
        {
            "name": "Grilled Cheese Sandwich",
            "instructions": "Butter one side of each slice of bread.\nPlace one slice, buttered side down, in a skillet.\nLayer cheese slices on top, then place the other slice on top with buttered side facing up.\nGrill until golden brown on both sides and cheese is melted.",
            "cooking_time": 10,
            "difficulty": "Easy",
            "servings": 1,
            "calories": 380,
            "protein": 12.0,
            "carbohydrates": 30.0,
            "fat": 22.0,
            "ingredients": [
                {"name": "Bread", "quantity": 2, "unit": "slices"},
                {"name": "Cheese", "quantity": 50, "unit": "g"},
                {"name": "Butter", "quantity": 15, "unit": "g"}
            ]
        },
        {
            "name": "Banana Oatmeal Pancakes",
            "instructions": "Blend oats, banana, egg, and a splash of milk to form a smooth batter.\nHeat a greased non-stick griddle over medium heat.\nPour batter to form small pancakes, cook until bubbles form on top, then flip.\nCook until golden brown on both sides.",
            "cooking_time": 15,
            "difficulty": "Easy",
            "servings": 1,
            "calories": 340,
            "protein": 10.0,
            "carbohydrates": 54.0,
            "fat": 8.0,
            "ingredients": [
                {"name": "Oats", "quantity": 50, "unit": "g"},
                {"name": "Banana", "quantity": 1, "unit": "pcs"},
                {"name": "Eggs", "quantity": 1, "unit": "pcs"},
                {"name": "Milk", "quantity": 50, "unit": "ml"}
            ]
        },
        {
            "name": "Garlic Butter Shrimp",
            "instructions": "In a large skillet, melt butter with olive oil over medium-high heat.\nAdd minced garlic and sauté for 1 minute until fragrant.\nAdd peeled shrimp, seasoning with salt and pepper.\nCook for 2-3 minutes per side until pink and opaque. Garnish with parsley.",
            "cooking_time": 10,
            "difficulty": "Easy",
            "servings": 2,
            "calories": 280,
            "protein": 24.0,
            "carbohydrates": 3.0,
            "fat": 19.0,
            "ingredients": [
                {"name": "Shrimp", "quantity": 300, "unit": "g"},
                {"name": "Butter", "quantity": 30, "unit": "g"},
                {"name": "Garlic", "quantity": 4, "unit": "cloves"},
                {"name": "Olive Oil", "quantity": 10, "unit": "ml"}
            ]
        },
        {
            "name": "Greek Salad",
            "instructions": "Toss diced cucumber, tomato, red onion, and olives in a bowl.\nDrizzle with olive oil and sprinkle dried oregano.\nTop with crumbled feta cheese.",
            "cooking_time": 10,
            "difficulty": "Easy",
            "servings": 2,
            "calories": 180,
            "protein": 5.0,
            "carbohydrates": 8.0,
            "fat": 15.0,
            "ingredients": [
                {"name": "Tomato", "quantity": 2, "unit": "pcs"},
                {"name": "Cucumber", "quantity": 1, "unit": "pcs"},
                {"name": "Onion", "quantity": 0.5, "unit": "pcs"},
                {"name": "Cheese", "quantity": 50, "unit": "g"},
                {"name": "Olive Oil", "quantity": 15, "unit": "ml"}
            ]
        },
        {
            "name": "Lentil Soup",
            "instructions": "Sauté chopped onion, garlic, carrot, and celery in olive oil until soft.\nAdd rinsed lentils, canned diced tomatoes, vegetable broth, and spices (cumin, thyme).\nBring to a boil, then cover and simmer on low for 30 minutes until lentils are soft.",
            "cooking_time": 40,
            "difficulty": "Medium",
            "servings": 4,
            "calories": 210,
            "protein": 11.0,
            "carbohydrates": 32.0,
            "fat": 4.5,
            "ingredients": [
                {"name": "Lentils", "quantity": 150, "unit": "g"},
                {"name": "Onion", "quantity": 1, "unit": "pcs"},
                {"name": "Garlic", "quantity": 2, "unit": "cloves"},
                {"name": "Tomato", "quantity": 1, "unit": "pcs"},
                {"name": "Olive Oil", "quantity": 15, "unit": "ml"}
            ]
        },
        {
            "name": "Tuna Salad Sandwich",
            "instructions": "Drain canned tuna. Mix with mayonnaise, finely chopped onion, salt, and pepper in a bowl.\nSpread the tuna mixture evenly on one slice of bread.\nTop with a lettuce leaf and the second slice of bread. Slice in half and enjoy.",
            "cooking_time": 8,
            "difficulty": "Easy",
            "servings": 1,
            "calories": 390,
            "protein": 26.0,
            "carbohydrates": 28.0,
            "fat": 17.0,
            "ingredients": [
                {"name": "Tuna", "quantity": 100, "unit": "g"},
                {"name": "Bread", "quantity": 2, "unit": "slices"},
                {"name": "Onion", "quantity": 0.25, "unit": "pcs"},
                {"name": "Lettuce", "quantity": 20, "unit": "g"}
            ]
        },
        {
            "name": "Caprese Salad",
            "instructions": "Slice fresh mozzarella cheese and tomatoes into 1/4-inch thick slices.\nLayer tomato slices alternately with fresh mozzarella slices on a serving platter.\nGarnish with fresh basil leaves, drizzle with olive oil and balsamic glaze, season with salt and pepper.",
            "cooking_time": 10,
            "difficulty": "Easy",
            "servings": 2,
            "calories": 230,
            "protein": 10.0,
            "carbohydrates": 4.0,
            "fat": 19.5,
            "ingredients": [
                {"name": "Tomato", "quantity": 2, "unit": "pcs"},
                {"name": "Cheese", "quantity": 120, "unit": "g"},
                {"name": "Basil", "quantity": 10, "unit": "g"},
                {"name": "Olive Oil", "quantity": 15, "unit": "ml"}
            ]
        },
        {
            "name": "Fruit & Yogurt Parfait",
            "instructions": "Layer yogurt into the bottom of a glass or bowl.\nAdd a layer of sliced banana or berries, followed by a layer of oats.\nRepeat layers until glass is full, topping with fruit and a drizzle of honey.",
            "cooking_time": 5,
            "difficulty": "Easy",
            "servings": 1,
            "calories": 260,
            "protein": 12.0,
            "carbohydrates": 42.0,
            "fat": 5.0,
            "ingredients": [
                {"name": "Yogurt", "quantity": 150, "unit": "g"},
                {"name": "Oats", "quantity": 30, "unit": "g"},
                {"name": "Banana", "quantity": 0.5, "unit": "pcs"}
            ]
        },
        {
            "name": "Quinoa Bowl",
            "instructions": "Cook quinoa according to instructions.\nRoast cubed chicken and chopped bell peppers with olive oil and garlic.\nToss cooked quinoa, chicken, and peppers together.\nTop with avocado slices and cheese.",
            "cooking_time": 25,
            "difficulty": "Medium",
            "servings": 1,
            "calories": 490,
            "protein": 34.0,
            "carbohydrates": 46.0,
            "fat": 20.0,
            "ingredients": [
                {"name": "Quinoa", "quantity": 60, "unit": "g"},
                {"name": "Chicken", "quantity": 120, "unit": "g"},
                {"name": "Bell Pepper", "quantity": 0.5, "unit": "pcs"},
                {"name": "Avocado", "quantity": 0.5, "unit": "pcs"},
                {"name": "Cheese", "quantity": 20, "unit": "g"},
                {"name": "Olive Oil", "quantity": 10, "unit": "ml"}
            ]
        }
    ]

    for item in recipes_data:
        recipe = Recipe(
            name=item["name"],
            instructions=item["instructions"],
            cooking_time=item["cooking_time"],
            difficulty=item["difficulty"],
            servings=item["servings"],
            calories=item["calories"],
            protein=item["protein"],
            carbohydrates=item["carbohydrates"],
            fat=item["fat"]
        )
        db.session.add(recipe)
        db.session.flush() # Flush to get recipe.id
        
        for ing in item["ingredients"]:
            recipe_ing = RecipeIngredient(
                recipe_id=recipe.id,
                ingredient_name=ing["name"],
                quantity=ing["quantity"],
                unit=ing["unit"]
            )
            db.session.add(recipe_ing)
            
    db.session.commit()
    print("Database successfully seeded with 15 recipes.")
