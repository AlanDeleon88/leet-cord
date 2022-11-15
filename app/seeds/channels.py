from app.models import db, Channel

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
    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.commit()

def undo_channels():
    db.session.execute('DELETE from channels;')
    db.session.commit()
