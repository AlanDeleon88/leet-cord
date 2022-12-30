from .db import db
from datetime import datetime

class ServerMessage(db.Model):
    __tablename__ = 'server_messages'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    body = db.Column(db.String)
    img = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='server_messages', single_parent=True)
    channels = db.relationship('Channel', back_populates='server_messages', single_parent=True)

    def to_dict(self):
        return{
            'id' : self.id,
            'sender_id' : self.sender_id,
            'channel_id' : self.channel_id,
            'body' : self.body,
            'img' : self.img,
            'sender_icon' : self.users.profile_picture,
            'sender_username' : self.users.username,
            'updated_at' : self.updated_at
        }
