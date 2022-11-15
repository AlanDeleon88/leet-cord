from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_picture = db.Column(db.String(255), nullable=False, default='https://i.imgur.com/VxBVVgq.png')
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    hashed_password = db.Column(db.String(255), nullable=False)

    servers = db.relationship('Server', back_populates='users', cascade='all, delete-orphan')
    server_messages = db.relationship('ServerMessage', back_populates='users', cascade='all, delete-orphan')
    server_members = db.relationship('ServerMember', back_populates='users', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name' : self.first_name,
            'last_name' : self.last_name,
            'profile_picture' : self.profile_picture,
            'owned_servers' : [{'server_id': server.id, 'name' : server.name, 'server_icon': server.server_icon} for server in self.servers],
            'server_messages' : [{'id' : message.id, 'body' : message.body, 'image' : message.image} for message in self.server_messages]
        }
