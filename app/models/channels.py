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

    def to_dict(self):
        return{
            'id' : self.id,
            'name' : self.name,
            'description' : self.description,
            'server_id' : self.server_id
        }
