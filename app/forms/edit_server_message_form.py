from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditServerMessage(FlaskForm):
    body = StringField('Body')
