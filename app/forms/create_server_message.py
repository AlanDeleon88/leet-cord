from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CreateServerMessage(FlaskForm):
    body = StringField('Body')
    img = StringField('Image')
