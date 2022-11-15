from .db import db
from datetime import datetime
from sqlalchemy import UniqueConstraint

class ServerMember(db.Model):
    __tablename__ = 'server_members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    permission_id = db.Column(db.Integer, db.ForeignKey('permissions.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    UniqueConstraint('user_id', 'server_id')

    users = db.relationship('User', back_populates='server_members', single_parent=True)
    servers = db.relationship('Server', back_populates='server_members', single_parent=True)
    permissions = db.relationship('Permission', back_populates='server_members', single_parent=True)

    def to_dict(self):
        return{
            'id' : self.id,
            'user_id' : self.user_id,
            'server_id' : self.server_id,
            'permission' : self.permission_id #! replace with the relation later.
        }
