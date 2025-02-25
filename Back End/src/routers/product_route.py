from flask import Blueprint
from handlers.controllers.product_controller import ProductController

product_bp = Blueprint("product", __name__, url_prefix="/products")

product_bp.route("/", methods=["GET"])(ProductController.get_all_products)
product_bp.route("/<int:product_id>", methods=["GET"])(ProductController.get_product)
product_bp.route("/", methods=["POST"])(ProductController.create_product)
product_bp.route("/<int:product_id>", methods=["PUT"])(ProductController.update_product)
product_bp.route("/<int:product_id>", methods=["DELETE"])(ProductController.delete_product)
