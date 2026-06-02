from flask import Blueprint, request, jsonify
from app.models import db, Ingredient

inventory_bp = Blueprint('inventory', __name__, url_prefix='/api/inventory')

@inventory_bp.route('', methods=['GET'])
def get_inventory():
    # Hardcoded to Guest user ID 1
    user_id = 1
    items = Ingredient.query.filter_by(user_id=user_id).all()
    return jsonify([item.to_dict() for item in items]), 200

@inventory_bp.route('', methods=['POST'])
def add_ingredient():
    # Hardcoded to Guest user ID 1
    user_id = 1
    data = request.get_json() or {}
    name = data.get('name')
    quantity_str = data.get('quantity')
    unit = data.get('unit')

    if not name or not quantity_str or not unit:
        return jsonify({"error": "Name, quantity, and unit are required"}), 400

    name = name.strip()
    unit = unit.strip()
    
    try:
        quantity = float(quantity_str)
        if quantity <= 0:
            return jsonify({"error": "Quantity must be greater than zero"}), 400
    except ValueError:
        return jsonify({"error": "Quantity must be a valid number"}), 400

    # Duplicate resolution
    existing_item = Ingredient.query.filter(
        Ingredient.user_id == user_id,
        db.func.lower(Ingredient.name) == name.lower()
    ).first()

    try:
        if existing_item:
            existing_item.quantity += quantity
            db.session.commit()
            return jsonify({
                "message": "Ingredient updated", 
                "ingredient": existing_item.to_dict()
            }), 200
        else:
            item = Ingredient(
                user_id=user_id,
                name=name,
                quantity=quantity,
                unit=unit
            )
            db.session.add(item)
            db.session.commit()
            return jsonify({
                "message": "Ingredient added", 
                "ingredient": item.to_dict()
            }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Database error: " + str(e)}), 500

@inventory_bp.route('/<int:item_id>', methods=['DELETE'])
def delete_ingredient(item_id):
    # Hardcoded to Guest user ID 1
    user_id = 1
    item = Ingredient.query.filter_by(id=item_id, user_id=user_id).first()
    
    if not item:
        return jsonify({"error": "Ingredient not found"}), 404

    try:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Ingredient deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Database error: " + str(e)}), 500
