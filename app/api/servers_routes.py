from flask import Blueprint, jsonify, session, request
from app.models import User, Server, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.utils import queryUtils

server_routes = Blueprint('servers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@server_routes.route('/')
@login_required
def get_all_servers():
    servers = Server.query.all()
    return {'servers' : [server.to_dict()] for server in servers}

@server_routes.route('/<int:id>')
@login_required
def get_server_by_id(id):
    server = Server.query.get(id)
    if server:
        server_dict = queryUtils.buildServerDict(server)
        return server_dict
    return {'error' : 'could not find server with that id'}
