from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import db, User

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400

    # Clean strings
    username = username.strip()
    email = email.strip().lower()

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username is already taken"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email is already registered"}), 400

    try:
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User registered successfully", "user": user.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Database error: " + str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username_or_email = data.get('username') # can accept either
    password = data.get('password')

    if not username_or_email or not password:
        return jsonify({"error": "Username/Email and password are required"}), 400

    username_or_email = username_or_email.strip()
    
    # Try finding by username first, then by email
    user = User.query.filter_by(username=username_or_email).first()
    if not user:
        # Try by email
        user = User.query.filter_by(email=username_or_email.lower()).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid username/email or password"}), 401

    # Create token using user id as identity
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict()
    }), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"user": user.to_dict()}), 200
