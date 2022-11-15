from .db import db
from datetime import datetime

class Permission(db.Model):
    __tablename__='permissions'
    id = db.Column(db.Integer, primary_key=True)
    permission = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    server_members = db.relationship('ServerMember', back_populates='permissions')




    def to_dict(self):
        return{
            'id' : self.id,
            'permission' : self.permission
        }
