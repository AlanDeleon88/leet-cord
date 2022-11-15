from app.models import db, DmRoom

def seed_dm_rooms():
    demoAndMarnie = DmRoom(
        user1_id = 1,
        user2_id =2,
        user1_active = True,
        user2_active = True
    )

    demoAndBobbie = DmRoom(
        user1_id = 1,
        user2_id =3,
        user1_active = True,
        user2_active = True
    )

    MarnieAndBobbie = DmRoom(
        user1_id = 2,
        user2_id =3,
        user1_active = True,
        user2_active = True
    )
    db.session.add(demoAndMarnie)
    db.session.add(demoAndBobbie)
    db.session.add(MarnieAndBobbie)

    db.session.commit()

def undo_dm_rooms():
    db.session.execute('DELETE from dm_rooms;')
    db.session.commit()
