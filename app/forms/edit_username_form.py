from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class EditUsername(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
