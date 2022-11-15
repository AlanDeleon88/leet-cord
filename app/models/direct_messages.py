from .db import db
from datetime import datetime

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    dm_room_id = db.Column(db.Integer, db.ForeignKey('dm_rooms.id'), nullable=False)
    body = db.Column(db.String)
    img = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='direct_messages', single_parent=True)
    dm_rooms = db.relationship('DmRoom', back_populates='direct_messages', single_parent=True)

    def to_dict(self):
        return {
            'id' : self.id,
            'sender_id' : self.sender_id,
            'dm_room_id' : self.dm_room_id,
            'body' : self.body,
            'img' : self.img
        }
