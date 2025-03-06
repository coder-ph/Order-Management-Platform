import os
import sys
import uuid
import logging
from typing import List

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from sqlalchemy.orm import sessionmaker
from faker import Faker

from models.client import db
from models.product_model import Product

from models.category_model import Category
from services.utilities import generate_random_sku

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def seed_products(session, fake: Faker, categories: List[Category], num_products: int = 10) -> List[Product]:
    """
    Create and seed products into the database.
    """
    try:
        if not categories:
            logger.warning("No categories found! Products need categories to be assigned.")
            return []

        products = []
        for _ in range(num_products):
            product = Product(
                id=str(uuid.uuid4()),
                name=fake.unique.word().capitalize(),  
                description=fake.sentence(nb_words=12),  
                price=round(fake.random.uniform(10, 500), 2), 
                stock=fake.random_int(min=5, max=200),  
                sku=generate_random_sku(),
                category_id=fake.random_element([cat.id for cat in categories])
            )
            products.append(product)

        session.add_all(products)
        session.commit()

        logger.info(f"Successfully added {len(products)} products to the database.")
        return products

    except Exception as e:
        session.rollback()
        logger.error(f"Error occurred while seeding products: {e}")
        raise
    finally:
        session.close()

def main():
    """
    Main function to seed products into the database.
    """
    fake = Faker()
    Session = sessionmaker(bind=db.engine)
    session = Session()

    try:
        categories = session.query(Category).all()
        if not categories:
            logger.warning("No categories found in the database. Please seed categories first.")
        else:
            seed_products(session, fake, categories)

        logger.info("Product seeding process completed successfully.")

    except Exception as e:
        logger.error(f"Product seeding failed: {e}")

    finally:
        session.close()

if __name__ == '__main__':
    main()
