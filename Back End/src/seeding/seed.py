from faker import Faker
from models.index import db, User,Token, Location, session

import uuid

fake = Faker()

# Initialize session
# Create sample locations
##add longitude and latitude
def seed_location():
    locations = [Location(longitude=fake.string ,lattitude=fake.latitude()) for _ in range(10)]
    session.add_all(locations)
    session.commit()
    return locations

# Create sample users
def seed_users(locations):
    users = []
    for _ in range(10):
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            phone_no=fake.phone_number(),
            email=fake.email(),
            role='user',  # Adjust as needed
            password='password123',  # Ensure hashing is handled in the model
            location_id=fake.random_element(elements=[loc.id for loc in locations])
        )
        users.append(user)

    session.add_all(users)
    session.commit()

# Create sample tokens
# seeding orders
# seeding products

#category 
