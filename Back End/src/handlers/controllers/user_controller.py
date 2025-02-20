from flask_restful import Resource
from src.services_layer.utilities.constants import *

def userTest():
    try:
        return {'message':'you reached the test user endpoint'}
    except:
        return {'message': errorEnums.get('400')}
    