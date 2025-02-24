from models import Product, db

class ProductService:
    @staticmethod
    def get_all_products():
        return Product.query.all()

    @staticmethod
    def get_product_by_id(product_id):
        return Product.query.get(product_id)

    @staticmethod
    def create_product(data):
        new_product = Product(
            product_name=data["product_name"],
            quantity=data["quantity"],
            description=data.get("description"),
            category_id=data["category_id"]
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product

    @staticmethod
    def update_product(product_id, data):
        product = Product.query.get(product_id)
        if product:
            product.product_name = data.get("product_name", product.product_name)
            product.quantity = data.get("quantity", product.quantity)
            product.description = data.get("description", product.description)
            product.category_id = data.get("category_id", product.category_id)
            db.session.commit()
            return product
        return None

    @staticmethod
    def delete_product(product_id):
        product = Product.query.get(product_id)
        if product:
            db.session.delete(product)
            db.session.commit()
            return True
        return False
