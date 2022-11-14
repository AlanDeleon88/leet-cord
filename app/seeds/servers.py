from app.models import db, Server

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
    db.session.commit()

def undo_servers():
    db.session.execute('DELETE FROM servers;')
    db.sesison.commit()
