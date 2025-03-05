import os
import sys
import uuid
import logging
from typing import List

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from sqlalchemy.orm import sessionmaker
from faker import Faker

from models.client import db
from models.product_model import Product, Category

logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s: %(message)s'
)
logger = logging.getLogger(__name__)

def seed_categories(session, fake: Faker, num_categories: int = 5) -> List[Category]:
    """
    Create and seed product categories in the database.
    """
    try:
        categories = [
            Category(
                id=str(uuid.uuid4()),
                name=fake.word().capitalize(),
                description=fake.sentence()
            )
            for _ in range(num_categories)
        ]
        
        session.add_all(categories)
        session.commit()
        
        logger.info(f"Successfully created {len(categories)} categories")
        return categories
    
    except Exception as e:
        session.rollback()
        logger.error(f"Error creating categories: {e}")
        raise

def seed_products(session, fake: Faker, categories: List[Category], num_products: int = 10) -> List[Product]:
    """
    Create and seed products in the database.
    """
    try:
        if not categories:
            raise ValueError("No categories available for product creation")
        
        products = [
            Product(
                id=str(uuid.uuid4()),
                name=fake.word().capitalize(),
                description=fake.text(),
                price=round(fake.random_number(digits=4) / 100, 2),
                stock=fake.random_int(min=1, max=100),
                category_id=fake.random_element(elements=[cat.id for cat in categories])
            )
            for _ in range(num_products)
        ]
        
        session.add_all(products)
        session.commit()
        
        logger.info(f"Successfully created {len(products)} products")
        return products
    
    except Exception as e:
        session.rollback()
        logger.error(f"Error creating products: {e}")
        raise

def main():
    """
    Main function to seed the database with fake data.
    """
    fake = Faker()
  
    Session = sessionmaker(bind=db.engine)
    session = Session()
    
    try:
        categories = seed_categories(session, fake)
        products = seed_products(session, fake, categories)
        
        logger.info("Database seeding completed successfully!")
    
    except Exception as e:
        logger.error(f"Database seeding failed: {e}")
    
    finally:
        session.close()

if __name__ == '__main__':
    main()
