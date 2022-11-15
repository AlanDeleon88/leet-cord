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
                        'icon_img' : server_q.server_icon,
                        'permission' : permission.permission
                        }
            user_dict['servers'].append(server_dict)
        return user_dict
    else:
        return user_dict
