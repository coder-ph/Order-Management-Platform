from flask import Blueprint
from handlers.controllers.location_controller import LocationController

location_bp = Blueprint('locations', __name__)

location_bp.route('/', methods=['GET'])(LocationController.get_locations)
location_bp.route('/<int:location_id>', methods=['GET'])(LocationController.get_location)
location_bp.route('/', methods=['POST'])(LocationController.create_location)
location_bp.route('/<int:location_id>', methods=['PUT'])(LocationController.update_location)
location_bp.route('/<int:location_id>', methods=['DELETE'])(LocationController.delete_location)
