from models import Category, db

class CategoryService:
    @staticmethod
    def get_all_categories():
        return Category.query.all()

    @staticmethod
    def get_category_by_id(category_id):
        return Category.query.get(category_id)

    @staticmethod
    def create_category(data):
        new_category = Category(name=data["name"])
        db.session.add(new_category)
        db.session.commit()
        return new_category

    @staticmethod
    def update_category(category_id, data):
        category = Category.query.get(category_id)
        if category:
            category.name = data.get("name", category.name)
            db.session.commit()
            return category
        return None

    @staticmethod
    def delete_category(category_id):
        category = Category.query.get(category_id)
        if category:
            db.session.delete(category)
            db.session.commit()
            return True
        return False
