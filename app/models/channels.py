from .db import db
from datetime import datetime

class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255))
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    servers = db.relationship('Server', back_populates='channels', single_parent=True)
    server_messages = db.relationship('ServerMessage', back_populates='channels', cascade='all, delete-orphan')

    def to_dict(self):
        return{
            'id' : self.id,
            'name' : self.name,
            'description' : self.description,
            'server_id' : self.server_id,
            'server_messages' : [{'message_id' : message.id, 'sender_id' : message.sender_id, 'body' : message.body, 'img' : message.img, 'sender_username' : message.users.username, 'sender_icon' : message.users.profile_picture, 'updated_at' : message.updated_at, 'channel_id' : message.channel_id} for message in self.server_messages]
        }
