import os
import sys
import uuid
import logging
from typing import List

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from sqlalchemy.orm import sessionmaker
from faker import Faker


from models.client import db
from models.users_model import User, Token
from models.location_model import Location
from services.utilities import hash_string

# Configure logging
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s: %(message)s'
)
logger = logging.getLogger(__name__)

def seed_locations(session, fake: Faker, num_locations: int = 5) -> List[Location]:
    """
    Create and seed locations in the database.
    """
    try:
        locations = [
            Location(
                id=str(uuid.uuid4()),
                name=fake.city()
            ) 
            for _ in range(num_locations)
        ]
        
        session.add_all(locations)
        session.commit()
        
        logger.info(f"Successfully created {len(locations)} locations")
        return locations
    
    except Exception as e:
        session.rollback()
        logger.error(f"Error creating locations: {e}")
        raise

def seed_users(session, fake: Faker, locations: List[Location], num_users: int = 10) -> List[User]:
    """
    Create and seed users in the database.
    """
    try:
        if not locations:
            raise ValueError("No locations available for user creation")
        
        users = [
            User(
                id=str(uuid.uuid4()),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                phone_no=fake.phone_number(),
                email=fake.unique.email(),
                role=fake.random_element(elements=["user", "admin"]),
                password=hash_string(fake.password(length=12, special_chars=True)),
                location_id=fake.random_element(elements=[loc.id for loc in locations])
            )
            for _ in range(num_users)
        ]
        
        session.add_all(users)
        session.commit()
        
        logger.info(f"Successfully created {len(users)} users")
        return users
    
    except Exception as e:
        session.rollback()
        logger.error(f"Error creating users: {e}")
        raise

def seed_tokens(session, fake: Faker, num_tokens: int = 5) -> List[Token]:
    """
    Create and seed tokens in the database.
    """
    try:
        tokens = [
            Token(
                key=str(uuid.uuid4()),
                token=str(fake.random_number(digits=6))
            )
            for _ in range(num_tokens)
        ]
        
        session.add_all(tokens)
        session.commit()
        
        logger.info(f"Successfully created {len(tokens)} tokens")
        return tokens
    
    except Exception as e:
        session.rollback()
        logger.error(f"Error creating tokens: {e}")
        raise

def main():
    """
    Main function to seed the database with fake data.
    """
    # Create Faker instance
    fake = Faker()
    
    # Create database session
    Session = sessionmaker(bind=db.engine)
    session = Session()
    
    try:
        # Seed data in a specific order
        locations = seed_locations(session, fake)
        users = seed_users(session, fake, locations)
        tokens = seed_tokens(session, fake)
        
        logger.info("Database seeding completed successfully!")
    
    except Exception as e:
        logger.error(f"Database seeding failed: {e}")
    
    finally:
        
        session.close()

if __name__ == '__main__':
    main()