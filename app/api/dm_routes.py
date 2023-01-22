from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, DmRoom, db, DirectMessage
from app.utils import buildUserDict, buildDmRoomDict
from app.forms import create_server_message, edit_server_message_form

from app.utils import queryUtils


dm_routes = Blueprint('dms', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@dm_routes.route('/<int:id>')
@login_required
def getDmRoomMessage(id):
    dm_room = DmRoom.query.get(id);
    if not dm_room:
        return {'error' : 'dm room with that id not found'}, 404
    dm_dict = dm_room.to_dict()
    for message in dm_dict['direct_messages']:
        message['my_message'] = False
        if current_user.id == message['sender_id']:
            message['my_message'] = True

    return dm_dict
