from src.config.config_map import appConfig
from src.startup.routes import routerSetup
from flask import Flask
from src.startup.logging import Logger
from flask_restful import Resource, Api
from flask_cors import CORS


logger = Logger('root file')
app = Flask(__name__)
CORS(app)
api = Api(app)

routerSetup(api)
if __name__ == '__main__':
    app.run(debug=False,port=appConfig.app.PORT)
    logger.info(f"server started on port : {appConfig.app.PORT}")