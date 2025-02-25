from flask import Blueprint
from handlers.controllers.order_assignmentcontroller import OrderAssignmentController

order_assignment_bp = Blueprint("orderassignment", __name__, url_prefix="/orderassignment")


order_assignment_bp.route('/', methods=['POST'])(OrderAssignmentController.assign_order)
order_assignment_bp.route('/<int:assignment_id>', methods=['DELETE'])(OrderAssignmentController.remove_assignment)
order_assignment_bp.route('/user/<int:user_id>', methods=['GET'])(OrderAssignmentController.get_assignments_by_user)
order_assignment_bp.route('/order/<int:order_id>', methods=['GET'])(OrderAssignmentController.get_assignments_by_order)
