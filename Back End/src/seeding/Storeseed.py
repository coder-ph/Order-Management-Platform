from faker import Faker
from sqlalchemy.orm import sessionmaker
from models.client import db
from models.store_model import Store
from models.users_model import User
from models.location_model import Location
import uuid

fake = Faker()

# Initialize session
Session = sessionmaker(bind=db.engine)
session = Session()

def seed_stores(users, locations):
    """Seed sample stores linked to users and locations."""
    stores = []
    for _ in range(10):
        store = Store(
            name=fake.company(),
            status=fake.boolean(),
            description=fake.sentence(nb_words=6),
            owner_id=fake.random_element(elements=[user.id for user in users]),
            location_id=fake.random_element(elements=[loc.id for loc in locations])
        )
        stores.append(store)

    session.add_all(stores)
    session.commit()
    return stores

def main():
    """Run store seeding after users and locations exist."""
    locations = session.query(Location).all()
    users = session.query(User).all()
    
    if not locations or not users:
        print("Please seed locations and users first!")
        return
    
    seed_stores(users, locations)
    print("Stores seeded successfully!")
    session.close()


