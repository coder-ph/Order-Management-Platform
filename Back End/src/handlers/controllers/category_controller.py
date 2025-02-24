from flask import jsonify, request
from services.category_service import CategoryService

class CategoryController:
    @staticmethod
    def get_all_categories():
        categories = CategoryService.get_all_categories()
        return jsonify([{"id": c.id, "name": c.name} for c in categories]), 200

    @staticmethod
    def get_category(category_id):
        category = CategoryService.get_category_by_id(category_id)
        if category:
            return jsonify({"id": category.id, "name": category.name}), 200
        return jsonify({"error": "Category not found"}), 404

    @staticmethod
    def create_category():
        data = request.get_json()
        category = CategoryService.create_category(data)
        return jsonify({"message": "Category created", "id": category.id}), 201

    @staticmethod
    def update_category(category_id):
        data = request.get_json()
        category = CategoryService.update_category(category_id, data)
        if category:
            return jsonify({"message": "Category updated"}), 200
        return jsonify({"error": "Category not found"}), 404

    @staticmethod
    def delete_category(category_id):
        if CategoryService.delete_category(category_id):
            return jsonify({"message": "Category deleted"}), 200
        return jsonify({"error": "Category not found"}), 404
