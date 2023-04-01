from app.models import db, ServerMessage, Server
from ..utils.faker_seed import generate_server_message
import random

def seed_server_messages():
    ch1message1 = ServerMessage(
        sender_id = 1,
        channel_id =1,
        body='hey whats up guys?'
    )
    ch1message2 = ServerMessage(
        sender_id = 2,
        channel_id =1,
        body='nm logging in soon?'
    )
    ch1message3 = ServerMessage(
        sender_id = 3,
        channel_id = 1,
        body = 'sorry cant make it because.'
    )

    ch2message1 = ServerMessage(
        sender_id = 1,
        channel_id = 2,
        body = 'raids are at 6pm!'
    )

    ch2message2 = ServerMessage(
        sender_id = 3,
        channel_id = 2,
        body = 'sorry cant make it because I dont feel liek it'
    )

    ch3message1 = ServerMessage(
        sender_id = 2,
        channel_id = 3,
        body = 'anyone around?'
    )
    db.session.add(ch1message1)
    db.session.add(ch1message2)
    db.session.add(ch1message3)
    db.session.add(ch2message1)
    db.session.add(ch2message2)
    db.session.add(ch3message1)

    #! query for all servers --> iterate through all servers
    #! each iteration query for all members in server
    #! iterate through all of server's channels
        #! each iteration random range of 4-15
            #! each iteration create a server_message with userId picked randomly from server members, random message, and current channel.
    servers = Server.query.all()
    for server in servers:
        serv_dict = server.to_dict()
        users = serv_dict['members']
        channels = serv_dict['channels']
        for channel in channels:
            for i in range(0, random.randint(7,20)):
                server_message = ServerMessage(
                    sender_id = users[random.randint(0,len(users) - 1)]['user_id'],
                    channel_id = channel['channel_id'],
                    body = generate_server_message()
                )
                db.session.add(server_message)

    # for server in servers:
    #     server.members

    db.session.commit();

def undo_server_messages():
    db.session.execute('DELETE from server_messages;')
    db.session.commit()
