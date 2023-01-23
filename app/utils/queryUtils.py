from app.models import User, Server, Permission, DmRoom

def buildUserDict(user):
    #! probably dont need to do more queries, can access the users from model attribute instead. If i need to I will revise it to do so later.
    user_dict = user.to_dict()
    user_dict['servers'] = []
    if user.server_members:
        for server in user.server_members:
            server_q = Server.query.get(server.server_id)
            permission = Permission.query.get(server.permission_id)
            server_dict={'id' : server_q.id,
                        'name' : server_q.name,
                        'owner_id' : server_q.owner_id,
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
        #! probably dont need to do more queries, can access the users from model attribute instead.
        server_member = User.query.get(server.user_id)
        permission = Permission.query.get(server.permission_id)
        member = {'id' : server_member.id,
                  'username' : server_member.username,
                  'profile_picture' : server_member.profile_picture,
                  'permission' : permission.permission
                }
        server_dict['members'].append(member)
    return server_dict

def buildDmRoomDict(user):
    '''
        argument is queried user.
        the other users id
        IE dm left ---> other user is user2
           dm right ---> other user is user1
        the id of the dm room
        the activity of the users in the dm room

        build a new array of dictionaries
        iterate through each element in array
        query for other user
        example user.dm_left[0].user_two.to_dict()
        will have to loop through both dm_left and dm right getting the user info needed.
        new dict element
        dm in dm_left
        let otherUser = dm.user_two.to_dict()
        then proceed to build the dictionary

        {
            dm_room_id : dmId,
            user_id : user[id],
            user_icon : user[profile_icon],
            username : user[username],
            active : true or false
        }
    '''
    dm_arr = []
    #! could refactor to dry this code up. maybe create a helper function?
    for dm in user.dm_left:
        other_user = dm.user_two.to_dict()
        dm_dict = {
            'dm_id' : dm.id,
            'other_user_id' : other_user['id'],
            'other_user_icon' : other_user['profile_picture'],
            'other_username' : other_user['username'],
            'active' : dm.user1_active

        }
        dm_arr.append(dm_dict)

    for dm in user.dm_right:
        other_user = dm.user_one.to_dict()
        dm_dict = {
            'dm_id' : dm.id,
            'other_user_id' : other_user['id'],
            'other_user_icon' : other_user['profile_picture'],
            'other_username' : other_user['username'],
            'active' : dm.user2_active

        }
        dm_arr.append(dm_dict)

    return dm_arr
