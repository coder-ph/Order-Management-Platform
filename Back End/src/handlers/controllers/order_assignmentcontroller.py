from flask import request, jsonify
from services.order_service import OrderAssignmentService

class OrderAssignmentController:
    @staticmethod
    def assign_order():
        data = request.get_json()
        
        if not data or 'order_id' not in data or 'user_id' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        order_id = data['order_id']
        user_id = data['user_id']
        
        assignment, error = OrderAssignmentService.assign_order(order_id, user_id)
        
        if error and error != "Assignment already exists":
            return jsonify({'error': error}), 400
        
        return jsonify({
            'id': assignment.id,
            'order_id': assignment.order_id,
            'user_assigned': assignment.user_assigned
        }), 200
    
    @staticmethod
    def remove_assignment(assignment_id):
        success, error = OrderAssignmentService.remove_assignment(assignment_id)
        
        if not success:
            return jsonify({'error': error}), 400
        
        return jsonify({'message': 'Assignment removed successfully'}), 200
    
    @staticmethod
    def get_assignments_by_user(user_id):
        assignments = OrderAssignmentService.get_assignments_by_user(user_id)
        return jsonify([{
            'id': assignment.id,
            'order_id': assignment.order_id,
            'user_assigned': assignment.user_assigned
        } for assignment in assignments]), 200
    
    @staticmethod
    def get_assignments_by_order(order_id):
        assignments = OrderAssignmentService.get_assignments_by_order(order_id)
        return jsonify([{
            'id': assignment.id,
            'order_id': assignment.order_id,
            'user_assigned': assignment.user_assigned
        } for assignment in assignments]), 200