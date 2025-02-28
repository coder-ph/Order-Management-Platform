import threading
from flask_mail import Message
from flask import render_template
from src.startup.init import app
from .client import send_async_email
from src.startup.logging import Logger

logger = Logger("welcome ping file")

def send_welcome_mail(payload:dict):
    try:
        recipients=[payload['email']]
        msg = Message("Hello Shellton",recipients=recipients)

        msg.html = render_template('welcome_email.html', username=payload['name'])
        thread = threading.Thread(target=send_async_email, args=(app, msg))
        thread.start()

        return logger.info(f"welcome email sent to {recipients}")
    except Exception as e:
        return logger.error(f"failed sending welcome email to {recipients}")
    
