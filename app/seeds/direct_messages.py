from app.models import db, DirectMessage

def seed_direct_messages():
    demoAndMarnie = DirectMessage(
        sender_id = 1,
        dm_room_id = 1,
        body = 'you up?'
    )

    marnieAndDemo = DirectMessage(
        sender_id = 2,
        dm_room_id = 1,
        body = 'no go away'
    )

    demoAndMarnie2 = DirectMessage(
        sender_id = 2,
        dm_room_id = 1,
        body = 'cmonnnnnn'
    )

    demoAndBobbie = DirectMessage(
        sender_id = 1,
        dm_room_id = 2,
        body = 'sup bra'
    )

    bobbieAndDemo = DirectMessage(
        sender_id = 3,
        dm_room_id = 2,
        body = 'nm bruh'
    )

    marnieAndBobbie = DirectMessage(
        sender_id = 2,
        dm_room_id = 3,
        body = 'man he wont stop talking to me'
    )

    bobbieAndMarnie = DirectMessage(
        sender_id = 3,
        dm_room_id = 3,
        body = 'lol ikr'
    )

    db.session.add(demoAndMarnie)
    db.session.add(marnieAndDemo)
    db.session.add(demoAndMarnie2)
    db.session.add(demoAndBobbie)
    db.session.add(bobbieAndDemo)
    db.session.add(marnieAndBobbie)
    db.session.add(bobbieAndMarnie)

    db.session.commit()

def undo_direct_messages():
    db.session.execute('DELETE from direct_messages;')
    db.session.commit()
