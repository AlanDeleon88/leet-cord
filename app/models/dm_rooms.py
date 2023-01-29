from .db import db
from datetime import datetime

class DmRoom(db.Model):
    __tablename__= 'dm_rooms'
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user1_active = db.Column(db.Boolean, default=False)
    user2_active = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user_one = db.relationship('User', foreign_keys=[user1_id], back_populates='dm_left')
    user_two = db.relationship('User', foreign_keys=[user2_id], back_populates='dm_right')

    direct_messages = db.relationship('DirectMessage',back_populates = 'dm_rooms', order_by='DirectMessage.created_at')

    def to_dict(self):
        return{
            'id': self.id,
            'user_one' : {'id' : self.user_one.id, 'username' : self.user_one.username, 'profile_picture' : self.user_one.profile_picture},
            'user_two' : {'id' : self.user_two.id, 'username' : self.user_two.username, 'profile_picture' : self.user_two.profile_picture},
            'user1_active' : self.user1_active,
            'user2_active' : self.user2_active,
            'direct_messages' : [{'message_id' : message.id, 'sender_id' : message.sender_id, 'body' : message.body, 'img' : message.img, 'sender_username' : message.users.username, 'sender_icon' : message.users.profile_picture, 'updated_at' : message.updated_at, 'dm_room_id' : message.dm_room_id} for message in self.direct_messages]
        }
