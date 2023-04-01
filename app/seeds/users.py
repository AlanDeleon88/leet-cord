from app.models import db, User
from ..utils import generate_email
from ..utils import generate_username
from ..utils import generate_last_name
from ..utils import generate_first_name


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name='Man', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', first_name='marnie', last_name='darnie', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', first_name='bobbie', last_name='blobbie', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    for i in range(0, 40):
        user = User(
                username= generate_username(), email=generate_email(), first_name=generate_first_name(), last_name=generate_last_name(), password='password')
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('DELETE FROM users')
    db.session.commit()
