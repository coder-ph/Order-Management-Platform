from flask import Blueprint
from controllers.store_controller import create_store_controller, get_store_controller, get_all_stores_controller, update_store_controller, delete_store_controller

store_bp = Blueprint('store_bp', __name__)

store_bp.route('/stores', methods=['POST'])(create_store_controller)
store_bp.route('/stores', methods=['GET'])(get_all_stores_controller)
store_bp.route('/stores/<int:store_id>', methods=['GET'])(get_store_controller)
store_bp.route('/stores/<int:store_id>', methods=['PUT'])(update_store_controller)
store_bp.route('/stores/<int:store_id>', methods=['DELETE'])(delete_store_controller)




