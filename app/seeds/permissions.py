from app.models import db, Permission

def seed_permissions():
    member = Permission(permission='Member')
    mod = Permission(permission='Moderator')
    owner = Permission(permission='Owner')

    db.session.add(member)
    db.session.add(mod)
    db.session.add(owner)
    db.session.commit()

def undo_permissions():
    db.session.execute('DELETE from permissions;')
    db.session.commit()
