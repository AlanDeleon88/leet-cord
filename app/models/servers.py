from .db import db
from datetime import datetime

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    icon_img = db.Column(db.String(255), nullable=False, default='https://i.imgur.com/bRfwYF3.png')
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='servers', single_parent=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name' : self.name,
            'owner_id' : self.owner_id,
            'icon_img' : self.icon_img,
        }
