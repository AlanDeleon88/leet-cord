from flask import Blueprint, jsonify, session, request
from app.models import User, Server, Channel, ServerMember, db
from app.forms import CreateServer, EditServerIcon, EditServerName, EditServerDescription, CreateChannel
from flask_login import current_user, login_user, logout_user, login_required
from app.utils import buildServerDict


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
    return {'servers' : [server.to_dict() for server in servers]}

@server_routes.route('/<int:id>')
@login_required
def get_server_by_id(id):
    server = Server.query.get(id)
    if server:
        server_dict = buildServerDict(server) #! maybe include channel messages?
        return server_dict
    return {'error' : 'could not find server with that id'}

#! add new server routes here..

@server_routes.route('/', methods = ['POST'])
@login_required
def new_server():
    form = CreateServer()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit() :
        if form.data['server_icon']:
            server = Server(
                name = form.data['name'],
                owner_id = current_user.id,
                server_icon = form.data['server_icon'],
                description = form.data['description']
            )
            db.session.add(server)
            db.session.commit()

            #* create a default general channel for new server.
            general_channel = Channel(
                name = 'general',
                description = 'general chat',
                server_id = server.id
            )

            db.session.add(general_channel)
            db.session.commit()

            #* add association to server members for newly created server.
            server_member = ServerMember(
                user_id = current_user.id,
                server_id = server.id,
                permission_id = 3
            )

            db.session.add(server_member)
            db.session.commit()

            server_dict = buildServerDict(server)
            return server_dict
        else:
            server = Server(
                name = form.data['name'],
                owner_id = current_user.id,
                description = form.data['description']
            )

            db.session.add(server)
            db.session.commit()

            #* create default channel for new server.
            general_channel = Channel(
                name = 'general',
                description = 'general chat',
                server_id = server.id
            )
            db.session.add(general_channel)
            db.session.commit()

            #* add association to server members for newly created server.
            server_member = ServerMember(
                user_id = current_user.id,
                server_id = server.id,
                permission_id = 3
            )

            db.session.add(server_member)
            db.session.commit()
            server_dict = buildServerDict(server)
            return server_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:id>/channels', methods=['POST'])
@login_required
def add_channel(id):
    '''
        add new channel to server
    '''
    server = Server.query.get(id)
    form = CreateChannel()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not server:
        return {'error' : 'server not found with that id'}, 404

    if form.validate_on_submit():
        new_channel = Channel(
            server_id = id,
            name = form.data['name'],
            description = form.data['description']
        )
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#! try to refactor server edits into a single route later
@server_routes.route('/<int:id>/name', methods = ['PUT'])
@login_required
def edit_server_name(id):
    '''
        edit server name
    '''
    server = Server.query.get(id)
    if current_user.id != server.owner_id:
        return {'error' : 'server doest not belong to current user'}, 401
    form = EditServerName()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not server:
        return {'errors' : 'could not find server with that id'}, 404

    if form.validate_on_submit():
        server.name = form.data['name']
        db.session.commit()
        server_dict = buildServerDict(server)
        return server_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:id>/desc', methods = ['PUT'])
@login_required
def edit_server_decsription(id):
    '''
        edit serer description
    '''
    server = Server.query.get(id)
    if current_user.id != server.owner_id:
        return {'error' : 'server doest not belong to current user'}, 401
    form = EditServerDescription()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not server:
        return {'errors' : 'could not find server with that id'}, 404

    if form.validate_on_submit():
        server.description = form.data['description']
        db.session.commit()
        server_dict = buildServerDict(server)
        return server_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:id>/server_icon', methods = ['PUT'])
@login_required
def edit_server_icon(id):
    '''
        edit server icon
    '''
    server = Server.query.get(id)
    if current_user.id != server.owner_id:
        return {'error' : 'server doest not belong to current user'}, 404
    form = EditServerIcon()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not server:
        return{'errors' : 'could not find server with that id'}, 401

    if form.validate_on_submit():
        server.server_icon = form.data['server_icon']
        db.session.commit()
        server_dict = buildServerDict(server)
        return server_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_server(id):
    server = Server.query.get(id)

    if server:
        db.session.delete(server)
        db.session.commit()
        return {'deletedServerId' : id}
    return {'errors' : 'server could not be found with that id'}, 404
