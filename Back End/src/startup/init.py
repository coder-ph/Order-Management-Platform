from flask_cors import CORS
from flask import Flask, request, render_template
from flask_restful import Api
import os
from flask import Flask

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../services_layer/pings"))
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")

init_app = Flask(__name__, template_folder=TEMPLATES_DIR)
def initial_setup(init_app):
    @init_app.route("/")
    def route_home():
        return {'message':'Welcome to Group 4 APIs'},200
    @init_app.route("/api/v1")
    def route_home_api():
        return {'message':'Welcome to Group 4 APIs'},200
    @init_app.errorhandler(404)
    def handle_404(error):
        print()
        return {'error':'404 resource not found', 'data':{
            'message':"please refer to documentation",
            'url':request.path.split('/api/v1')[1]
            }}, 404
    CORS(init_app)
    
    return init_app
app = initial_setup(init_app)
api = Api(app)
