from app.models import db, Server, ServerMember, User
from ..utils.faker_seed import generate_server_name
from .. utils.faker_seed import generate_server_desc
from .. utils.faker_seed import generate_server_icon
import random

def seed_servers():
    server1 = Server(
        name='DemoGamerz',
        description='for all us gamerz',
        owner_id = 1
    )
    server2 = Server(
        name='marniesPlace',
        owner_id = 2
    )
    server3 = Server(
        name='Bobs Pizza',
        description='a place to chill and chat',
        owner_id = 3
    )
    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)

    serverId = 4
    users = User.query.all()
    for user in users:
        userId = user.id
        for j in range(0,random.randint(0, 2)):
            server = Server(
                name=generate_server_name(),
                description = generate_server_desc(),
                owner_id= userId,
                server_icon= generate_server_icon()
            )
            server_member = ServerMember(
                user_id = user.id,
                server_id = serverId,
                permission_id = 3,
            )
            serverId += 1
            db.session.add(server)
            db.session.add(server_member)


    db.session.commit()

def undo_servers():
    db.session.execute('DELETE FROM servers;')
    db.session.commit()
