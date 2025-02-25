from flask_cors import CORS
from flask import Flask
from flask_restful import Api

init_app = Flask(__name__)
def initial_setup(init_app):
    CORS(init_app)
    return init_app
app = initial_setup(init_app)
api = Api(app)
