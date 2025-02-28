from src.startup.init import app
from src.config.config_map import appConfig
from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = appConfig.mail.MAIL_SERVER
app.config['MAIL_PORT'] = appConfig.mail.MAIL_PORT
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = appConfig.mail.MAIL_USERNAME
app.config['MAIL_PASSWORD'] = appConfig.mail.MAIL_PASSWORD
app.config['MAIL_DEFAULT_SENDER'] = appConfig.mail.MAIL_DEFAULT_SENDER

mail = Mail(app)
def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)
