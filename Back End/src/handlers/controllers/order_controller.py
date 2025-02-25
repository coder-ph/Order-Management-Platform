from flask import jsonify, request
from services.order_service import OrderService

class OrderController:
    @staticmethod
    def get_Orders():
        Order = OrderService.get_all_Orders()
        return jsonify([{"id": Order.id, "Orderitem":Order.order_item}]),200
        

    @staticmethod
    def get_Order(Order_id):
        Order = OrderService.get_Order_by_id(Order_id)
        if not Order:
            return jsonify({"error": "Order not found"}), 404
        return jsonify({"id": Order.id, "Orderitem":Order.order_item}), 200

    @staticmethod
    def create_Order():
        data = request.get_json()
        Order = OrderService.create_Order(data)
        return jsonify({"message": "Order created", "id": Order.id}), 201

    @staticmethod
    def update_Order(Order_id):
        data = request.get_json()
        Order = OrderService.update_Order(Order_id, data)
        if not Order:
            return jsonify({"error": "Order not found"}), 404
        return jsonify({"message": "Order updated"}), 200

    @staticmethod
    def cancel_Order(Order_id):
        Order = OrderService.cancel_Order(Order_id)
        if not Order:
            return jsonify({"error": "Order not found"}), 404
        return jsonify({"message": "Order deleted"}), 200



