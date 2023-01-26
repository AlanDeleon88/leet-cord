from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Server, ServerMember



from app.utils import queryUtils


server_member_routes = Blueprint('server_member', __name__)
