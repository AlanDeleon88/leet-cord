from app.models import db, ServerMember, Server, User
import random

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

    #! loop through all servers --->
    #! create a set with at least 5-10 unique members from userIds 1-43
    #! cast set into an array ---> iterate through array of user ids ---> have ids join serverId with permission of 1.
    servers = Server.query.all()
    # users = User.query.all()
    for server in servers:

        userSet = set()
        for j in range(0, random.randint(3,9)):
            userSet.add(random.randint(1,43))
        userArr = list(userSet)
        for userId in userArr:
            server_member = ServerMember(
                user_id = userId,
                server_id = server.id,
                permission_id = 1
            )
            db.session.add(server_member)



    db.session.commit()

def undo_server_members():
    db.session.execute('DELETE from server_members;')
    db.session.commit()
