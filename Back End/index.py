from src.config.config_map import appConfig
from src.startup.routes import routerSetup
from src.startup.logging import Logger
from src.startup.init import api, app
from models.client import setup_db

logger = Logger('root file')

routerSetup(api)

if __name__ == '__main__':
    setup_db()
    with app.app_context():
        logger.info(f"server started on port : {appConfig.app.PORT}")
    app.run(host="0.0.0.0",debug=True,port=appConfig.app.PORT)