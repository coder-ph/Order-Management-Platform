from flask import Blueprint
from handlers.controllers.order_itemcontroller import OrderItemController

order_item_bp = Blueprint("orderitem", __name__, url_prefix="/orderitem")

order_item_bp.route('/<int:order_id>/items', methods=['GET'])(OrderItemController.get_items_by_order)
order_item_bp.route('/', methods=['POST'])(OrderItemController.add_item_to_order)
order_item_bp.route('/<int:item_id>', methods=['PUT'])(OrderItemController.update_item_quantity)
order_item_bp.route('/<int:item_id>', methods=['DELETE'])(OrderItemController.remove_item)