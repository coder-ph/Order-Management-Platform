from flask_restful import Resource
from src.services_layer.utilities.constants import *

def userTest2():
    try:
        return {'message':'you reached the test user 2 endpoint'}
    except:
        return {'message': errorEnums.get('500')}
    