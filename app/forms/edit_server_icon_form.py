from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class EditServerIcon(FlaskForm):
    server_icon = StringField('server_icon', validators=[DataRequired()])
