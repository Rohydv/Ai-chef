from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    ingredients = db.relationship('Ingredient', backref='user', lazy=True, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }


class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'unit': self.unit,
            'created_at': self.created_at.isoformat()
        }


class Recipe(db.Model):
    __tablename__ = 'recipes'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    cooking_time = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)
    servings = db.Column(db.Integer, default=1, nullable=False)
    calories = db.Column(db.Float, nullable=False)
    protein = db.Column(db.Float, nullable=False)
    carbohydrates = db.Column(db.Float, nullable=False)
    fat = db.Column(db.Float, nullable=False)

    # Relationships
    ingredients = db.relationship('RecipeIngredient', backref='recipe', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'instructions': self.instructions.split('\n') if self.instructions else [],
            'cooking_time': self.cooking_time,
            'difficulty': self.difficulty,
            'servings': self.servings,
            'calories': self.calories,
            'protein': self.protein,
            'carbohydrates': self.carbohydrates,
            'fat': self.fat,
            'ingredients': [ing.to_dict() for ing in self.ingredients]
        }


class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredients'
    
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id', ondelete='CASCADE'), nullable=False)
    ingredient_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'ingredient_name': self.ingredient_name,
            'quantity': self.quantity,
            'unit': self.unit
        }
