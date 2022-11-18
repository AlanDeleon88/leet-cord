from .db import db
from datetime import datetime

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    server_icon = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='servers', single_parent=True)
    channels = db.relationship('Channel', back_populates='servers', cascade='all, delete-orphan')
    server_members = db.relationship('ServerMember', back_populates='servers', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name' : self.name,
            'owner_id' : self.owner_id,
            'server_icon' : self.server_icon,
            'description' : self.description,
            'channels' : [{'channel_id' : channel.id, 'name' : channel.name, 'description' : channel.description} for channel in self.channels]
        }
