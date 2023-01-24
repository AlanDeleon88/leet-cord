from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, DmRoom, db
from app.utils import buildUserDict, buildDmRoomDict, buildPostDmRoomDict
from app.forms import EditProfilePicture
from app.forms import EditUsername
from app.utils import queryUtils


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    user_dict = queryUtils.buildUserDict(user)
    return user_dict

@user_routes.route('/<int:id>/servers')
@login_required
def get_user_servers(id):
    '''
        get all servers the current user is associated with. IE get server Members list from user.
    '''
    user = User.query.get(id)
    if not user:
        return {'error' : 'user couldnt be found'}
    user_dict = buildUserDict(user)
    return {'servers' : user_dict['servers']}


#! still needs testing
@user_routes.route('/<int:id>/profile_picture', methods=['PUT'])
@login_required
def edit_profile_picture(id):
    '''
        edit a users profile picture. will pair with aws later.
    '''
    user = User.query.get(id)
    form = EditProfilePicture()
    form['csrf_token'].data = request.cookies['csrf_token']

    if current_user.id != id:
        return {'errors' : 'unable to edit another users info'}
    if not user:
        return {'errors' : 'unable to find a user with that id'}

    if form.validate_on_submit():
        user.profile_picture = form.data['profile_picture']
        db.session.commit()
        user_dict = buildUserDict(user)
        return user_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#! still needs testing
@user_routes.route('/<int:id>/username', methods=['PUT'])
@login_required
def edit_username(id):
    '''
        edit a users profile picture. will pair with aws later.
    '''
    user = User.query.get(id)
    form = EditUsername()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.id != id:
        return {'errors' : 'unable to edit another users info'}

    if not user:
        return {'errors' : 'unable to find a user with that id'}

    if form.validate_on_submit():
        user.profile_picture = form.data['username']
        db.session.commit()
        user_dict = queryUtils.buildUserDict(user)
        return user_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:id>/dm', methods=['GET'])
@login_required
def getUserDmRooms(id):
    '''
        from logged in users, returns all dm rooms that user is in with in single object. includes other users name and icon
    '''
    user = User.query.get(id)

    dm_arr = buildDmRoomDict(user)

    # user_dict = user.to_dict()

    return {'dms' : dm_arr}

    # return {'dm_1' : user_dict['dm_rooms1'], 'dm_2' : user_dict['dm_rooms2'], 'marnie' : user.dm_left[0].user_two.to_dict(), 'demo' : user_dict['direct_messages'] }

#! still need to test
@user_routes.route('/<int:id>/dm', methods=['POST'])
@login_required
def createDmRoom(id) :
    '''
        creates a dm room if their id combo is not found
    '''
    user_to_dm = User.query.get(id)
    if not user_to_dm:
        return {'error' : 'User could not be found with that id'}
    #! query for dm rooms. look for any combination of the 2 ids in either first or second dm slot.
    dm_rooms = DmRoom.query.all()

    for dm_room in dm_rooms:
        if current_user.id == dm_room.user1_id or current_user.id == dm_room.user2_id:
            if id == dm_room.user1_id or id == dm_room.user2_id:
                #! we found the pair that exists, now we just set either user1_active or user2_active to true
                if current_user.id == dm_room.user1_id:
                    dm_room.user1_active = True
                    dm_room.user2_active = True
                    db.session.commit()
                    dm_room_dict = buildPostDmRoomDict(dm_room)
                    return dm_room_dict
                    # return {'TEST' : 'ROOM FOUND UPDATE'}
                elif current_user.id == dm_room.user2_id:
                    dm_room.user2_active = True
                    dm_room.user1_active = True
                    db.session.commit()
                    dm_room_dict = buildPostDmRoomDict(dm_room)
                    return dm_room_dict
                    # return {'TEST' : 'ROOM2 FOUND UPDATE'}

    #! there were no combos in ids found in the dm table, therefore create a new table.
    newDmRoom = DmRoom(
        user1_id = current_user.id,
        user2_id = id,
        user1_active = True,
        user2_active = True,
    )
    db.session.add(newDmRoom)
    db.session.commit()
    dm_room_dict = buildPostDmRoomDict(newDmRoom)
    return dm_room_dict
    # return {'TEST' : 'NEW ROOM NO MATCH'}
    # return {'dms' :  [dm.to_dict() for dm in dm_rooms]}
