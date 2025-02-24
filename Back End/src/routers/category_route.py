from flask import Blueprint
from handlers.controllers.category_controller import CategoryController

category_bp = Blueprint("category", __name__, url_prefix="/categories")

category_bp.route("/", methods=["GET"])(CategoryController.get_all_categories)
category_bp.route("/<int:category_id>", methods=["GET"])(CategoryController.get_category)
category_bp.route("/", methods=["POST"])(CategoryController.create_category)
category_bp.route("/<int:category_id>", methods=["PUT"])(CategoryController.update_category)
category_bp.route("/<int:category_id>", methods=["DELETE"])(CategoryController.delete_category)
