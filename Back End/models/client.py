from flask_sqlalchemy import SQLAlchemy
from ..index import app
from src.config.config_map import appConfig

app.config['SQLALCHEMY_DATABASE_URI'] = appConfig.app.DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)