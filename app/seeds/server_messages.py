from app.models import db, ServerMessage

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
    db.session.commit();

def undo_server_messages():
    db.session.execute('DELETE from server_messages;')
    db.session.commit()
