from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, DmRoom, db, DirectMessage
from app.utils import buildUserDict, buildDmRoomDict
from app.forms import CreateServerMessage, EditServerMessage

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
def getDmRoom(id):
    dm_room = DmRoom.query.get(id)
    dm_dict = dm_room.to_dict()
    #! might turn this into a method later
    for message in dm_dict['direct_messages']:
        message['my_message'] = False
        if message['sender_id'] == current_user.id:
            message['my_message'] = True
    if dm_dict['user_one']['id'] == current_user.id:
        dm_dict['other_user'] = dm_dict['user_two']
    if dm_dict['user_two']['id'] == current_user.id:
        dm_dict['other_user'] = dm_dict['user_one']

    return dm_dict

@dm_routes.route('/<int:id>/messages')
@login_required
def getDmRoomMessages(id):
    dm_room = DmRoom.query.get(id);
    if not dm_room:
        return {'error' : 'dm room with that id not found'}, 404
    dm_dict = dm_room.to_dict()
    for message in dm_dict['direct_messages']:
        message['my_message'] = False
        if current_user.id == message['sender_id']:
            message['my_message'] = True

    return dm_dict

@dm_routes.route('/<int:id>', methods=['POST'])
@login_required
def postDmRoomMessage(id):
    dm_room = DmRoom.query.get(id)
    if not dm_room:
        return {'error' : 'dm room with that id not found'}, 404
    form = CreateServerMessage();
    form['csrf_token'].data = request.cookies['csrf_token']
    #! could use some backend validation for if body or img is null
    if form.validate_on_submit():
        new_msg = DirectMessage(
            sender_id = current_user.id,
            dm_room_id = id,
            body = form.data['body'],
            img = form.data['img']
        )

        db.session.add(new_msg)
        db.session.commit()
        #! might need to make a util function to add my message = true or false to this return

        new_msg_dict = new_msg.to_dict()
        new_msg_dict['my_message'] = True;
        new_msg_dict['message_id'] = new_msg_dict['id']

        return new_msg_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
