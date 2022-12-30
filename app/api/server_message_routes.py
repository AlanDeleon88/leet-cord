from flask import Blueprint, jsonify, session, request
from app.models import User,Channel, db, ServerMessage
from app.forms import CreateServerMessage, EditChannel
from flask_login import current_user, login_user, logout_user, login_required
from app.utils import buildServerDict


server_message_routes = Blueprint('server_messages', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@server_message_routes.route('/<int:id>')
@login_required
def get_server_message(id):
    message = ServerMessage.query.get(id);

    if not message:
        return {'error' : 'message with that id could not be found'}, 404

    message_dict = message.to_dict();
    message_dict['my_message'] = False;
    if message_dict['sender_id'] == current_user.id:
        message_dict['my_message'] = True
    return message_dict
