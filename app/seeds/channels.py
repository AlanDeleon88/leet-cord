from app.models import db, Channel , Server
from ..utils.faker_seed import generate_server_name
from .. utils.faker_seed import generate_server_desc
import random
def seed_channels():
    channel1 = Channel(
        server_id = 1,
        name='main channel',
        description='chat for general stuff'
    )
    channel2 = Channel(
        server_id = 1,
        name='raid chat',
    )
    channel3 = Channel(
        server_id = 2,
        name='stuff',
        description='a place to talk about stuff'
    )

    channel4 = Channel(
        server_id = 3,
        name= 'random',
        description = 'random'
    )
    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)

    #generate general channel for each server
    servers = Server.query.all()
    for server in servers:

        channel = Channel(
            server_id = server.id,
            name = 'general',
            description = 'general chat'
        )
        db.session.add(channel)

    #! generate a random amount of channels for each server. range from an extra 0-2 channels per server.
    for server in servers:

        for j in range(0, random.randint(0,2)):
            channel = Channel(
                server_id = server.id,
                name = generate_server_name(),
                description = generate_server_desc()
            )
            db.session.add(channel)


    db.session.commit()

def undo_channels():
    db.session.execute('DELETE from channels;')
    db.session.commit()
