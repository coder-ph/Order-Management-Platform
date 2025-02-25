from flask import jsonify,request
from services.orderitem_service import OrderItemService

class OrderItemController:
    @staticmethods
    def get_items_by_order(order_id):
        items = OrderItemService.get_items_by_order(order_id)
        return jsonify([{
            'id': item.id,
            'order_id': item.order_id,
            'product_id': item.product_id,
            'quantity': item.quantity,
            'price': float(item.price)
        } for item in items]), 200
    
    @staticmethod
    def add_item_to_order():
        data = request.get_json()
        
        if not data or 'order_id' not in data or 'product_id' not in data or 'quantity' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        order_id = data['order_id']
        product_id = data['product_id']
        quantity = data['quantity']
        
        order, error = OrderItemService.add_item_to_order(order_id, product_id, quantity)
        
        if error:
            return jsonify({'error': error}), 400
        
        return jsonify({
            'id': order.id,
            'user_id': order.user_id,
            'total_amount': float(order.total_amount),
            'status': order.status
        }), 200
    
    @staticmethod
    def update_item_quantity(item_id):
        data = request.get_json()
        
        if not data or 'quantity' not in data:
            return jsonify({'error': 'Quantity is required'}), 400
        
        quantity = data['quantity']
        
        if quantity <= 0:
            return jsonify({'error': 'Quantity must be greater than zero'}), 400
        
        item, error = OrderItemService.update_item_quantity(item_id, quantity)
        
        if error:
            return jsonify({'error': error}), 400
        
        return jsonify({
            'id': item.id,
            'order_id': item.order_id,
            'product_id': item.product_id,
            'quantity': item.quantity,
            'price': float(item.price)
        }), 200
    
    @staticmethod
    def remove_item(item_id):
        success, error = OrderItemService.remove_item(item_id)
        
        if not success:
            return jsonify({'error': error}), 400
        
        return jsonify({'message': 'Item removed successfully'}), 200