from flask import jsonify, request
from services.product_service import ProductService

class ProductController:
    @staticmethod
    def get_all_products():
        products = ProductService.get_all_products()
        return jsonify([{
            "id": p.id, 
            "product_name": p.product_name,
            "quantity": p.quantity,
            "description": p.description,
            "category_id": p.category_id
        } for p in products]), 200

    @staticmethod
    def get_product(product_id):
        product = ProductService.get_product_by_id(product_id)
        if product:
            return jsonify({
                "id": product.id, 
                "product_name": product.product_name,
                "quantity": product.quantity,
                "description": product.description,
                "category_id": product.category_id
            }), 200
        return jsonify({"error": "Product not found"}), 404

    @staticmethod
    def create_product():
        data = request.get_json()
        product = ProductService.create_product(data)
        return jsonify({"message": "Product created", "id": product.id}), 201

    @staticmethod
    def update_product(product_id):
        data = request.get_json()
        product = ProductService.update_product(product_id, data)
        if product:
            return jsonify({"message": "Product updated"}), 200
        return jsonify({"error": "Product not found"}), 404

    @staticmethod
    def delete_product(product_id):
        if ProductService.delete_product(product_id):
            return jsonify({"message": "Product deleted"}), 200
        return jsonify({"error": "Product not found"}), 404
