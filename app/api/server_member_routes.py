from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Server, ServerMember, db
from app.utils import buildServerDict


server_member_routes = Blueprint('server_member', __name__)

@server_member_routes.route('/<int:id>', methods=['POST'])
@login_required
def joinServer(id):
    # user = User.query.get(current_user.id)
    server = Server.query.get(id)
    if not server:
        return {'error' : 'server with that id could not be found'},404
    new_server_member = ServerMember(
        user_id = current_user.id,
        server_id = id,
        permission_id = 1,
    )
    db.session.add(new_server_member)
    db.session.commit()
    server_dict = buildServerDict(server)
    return server_dict

@server_member_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def leaveServer(id):
    server = Server.query.get(id)
    if not server:
        return {'error' : 'server with that id could not be found'},404
    server_members = ServerMember.query.all()

    for member in server_members:
        if member.user_id == current_user.id and member.server_id == id:
            db.session.delete(member)
            db.session.commit()
            return{'server_id' : member.server_id}
    return {'error' : 'server to user relation could not be found'}
