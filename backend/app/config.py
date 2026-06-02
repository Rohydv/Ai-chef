import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret-key-nutrichef-ai-2026'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///nutrichef.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key-nutrichef-ai-2026'
    # Tokens expire in 30 days for user convenience
    JWT_ACCESS_TOKEN_EXPIRES = 30 * 24 * 60 * 60
