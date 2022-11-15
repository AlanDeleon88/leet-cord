from app.models import db, ServerMember

def seed_server_members():
    demo1 = ServerMember(
        user_id = 1,
        server_id = 1,
        permission_id = 3,
    )
    demo3 = ServerMember(
        user_id = 1,
        server_id = 3,
        permission_id = 1,
    )

    marnie1 = ServerMember(
        user_id = 2,
        server_id = 1,
        permission_id = 1,
    )

    marnie2 = ServerMember(
        user_id = 2,
        server_id = 2,
        permission_id = 3
    )

    bobbie3 = ServerMember(
        user_id = 3,
        server_id = 3,
        permission_id = 3
    )
    bobbie1 = ServerMember(
        user_id = 3,
        server_id = 1,
        permission_id = 1
    )

    db.session.add(demo1)
    db.session.add(demo3)
    db.session.add(marnie1)
    db.session.add(marnie2)
    db.session.add(bobbie1)
    db.session.add(bobbie3)

    db.session.commit()

def undo_server_members():
    db.session.execute('DELETE from server_members;')
    db.session.commit()
