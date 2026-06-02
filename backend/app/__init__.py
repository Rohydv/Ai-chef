import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.config import Config
from app.models import db, Recipe
from app.routes.auth import auth_bp
from app.routes.inventory import inventory_bp
from app.routes.recipes import recipes_bp
from app.seed import seed_recipes

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app)
    db.init_app(app)
    jwt = JWTManager(app)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(inventory_bp)
    app.register_blueprint(recipes_bp)

    # Create tables and seed data
    with app.app_context():
        db.create_all()
        # Seed guest user if it doesn't exist
        from app.models import User
        guest = User.query.get(1)
        if not guest:
            print("Guest user not found. Seeding Guest Chef...")
            guest = User(id=1, username="Guest Chef", email="guest@nutrichef.com", password_hash="guest_hash")
            db.session.add(guest)
            db.session.commit()
            print("Guest Chef successfully seeded.")
            
        # Seed recipes if they don't exist yet
        if Recipe.query.count() == 0:
            print("Recipes table is empty. Seeding mock recipes...")
            seed_recipes()
            print("Recipes successfully seeded.")
        else:
            print("Recipes already seeded in database.")

    # A simple health check route
    @app.route('/health')
    def health():
        return {"status": "healthy", "service": "NutriChef AI Backend"}, 200

    return app
