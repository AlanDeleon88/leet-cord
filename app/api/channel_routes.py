from flask import Blueprint, jsonify, session, request
from app.models import User, Server, Channel, ServerMember, db, ServerMessage
from app.forms import CreateServerMessage, EditChannel
from flask_login import current_user, login_user, logout_user, login_required
from app.utils import buildServerDict


channel_routes = Blueprint('channels', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@channel_routes.route('/<int:id>')
@login_required
def get_channel(id):
    '''
        get channel by id
    '''
    channel = Channel.query.get(id)

    if not channel:
        return {'error' : 'channel could not be found with that id'}, 404
    channel_dict = channel.to_dict()
    #! might turn this into a method later
    for message in channel_dict['server_messages']:
        message['my_message'] = False
        if message['sender_id'] == current_user.id:
            message['my_message'] = True
    return channel_dict


@channel_routes.route('/<int:id>', methods=['POST'])
@login_required
def post_to_channel(id):
    channel = Channel.query.get(id)

    if not channel:
        return {'error' : 'channel could not be found with that id'}, 404
    form = CreateServerMessage()
    form['csrf_token'].data = request.cookies['csrf_token']
    #! could use some backend validation for if body or img is null
    if form.validate_on_submit():
        new_msg = ServerMessage(
            sender_id = current_user.id,
            channel_id = id,
            body = form.data['body'],
            img = form.data['img']
        )
        db.session.add(new_msg)
        db.session.commit()
        #! might need to make a util function to add my message = true or false to this return

        new_msg_dict = new_msg.to_dict()
        new_msg_dict['my_message'] = True;

        return new_msg_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_channel_name(id):
    '''
        edit a channel by its name
    '''
    channel = Channel.query.get(id)

    if not channel:
        return {'error' : 'channel could not be found with that id'}

    form = EditChannel()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print('DEBUG--------------------------------------------', form.data)

    if form.validate_on_submit():
        if form.data['name']:
            channel.name = form.data['name']
        channel.description = form.data['description']
        if not form.data['name'] and not form.data['description']:
            return {'error' : 'both fields cannot be empty!'}, 401
        db.session.commit()
        channel_dict = channel.to_dict()
        return channel_dict
    return {'error' : 'form not validated correctly'}, 401

@channel_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_channel(id):
    '''
        delete a channel
    '''
    channel = Channel.query.get(id)

    if not channel:
        return {'error' : 'Channel could not be found with that id'}
    channel_dict = channel.to_dict()
    db.session.delete(channel)
    db.session.commit()

    return channel_dict
