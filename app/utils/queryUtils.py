from app.models import User, Server, Permission, db

def buildUserDict(user):
    user_dict = user.to_dict()
    user_dict['servers'] = []
    if user.server_members:
        for server in user.server_members:
            server_q = Server.query.get(server.server_id)
            permission = Permission.query.get(server.permission_id)
            server_dict={'id' : server_q.id,
                        'name' : server_q.name,
                        'description' : server_q.description,
                        'server_icon' : server_q.server_icon,
                        'channels' : [{'channel_id' : channel.id, 'name' : channel.name, 'description' : channel.description} for channel in server_q.channels],
                        'permission' : permission.permission
                        }
            user_dict['servers'].append(server_dict)
        return user_dict
    else:
        return user_dict

def buildServerDict(server):
    server_dict = server.to_dict()
    server_dict['members'] = []

    for server in server.server_members:
        server_member = User.query.get(server.user_id)
        permission = Permission.query.get(server.permission_id)
        member = {'id' : server_member.id,
                  'username' : server_member.username,
                  'profile_picture' : server_member.profile_picture,
                  'permission' : permission.permission
                }
        server_dict['members'].append(member)
    return server_dict
