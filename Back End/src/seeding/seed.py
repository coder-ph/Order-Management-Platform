from faker import Faker
from models.index import db, User,Token, Location, session, Category

import uuid

fake = Faker()

# Initialize session
# Create sample locations
##add longitude and latitude
random_string = fake.pystr(min_chars=6, max_chars=6)
def seed_location():
    locations = [Location(longitude=random_string ,lattitude=random_string) for _ in range(10)]
    session.add_all(locations)
    session.commit()
    return locations

def seed_category():
    locations = [Category(name=fake.catego ,lattitude=random_string) for _ in range(10)]
    session.add_all(locations)
    session.commit()
    return locations

# Create sample users
def seed_users(locations):
    users = []
    for loc in locations:
        print(loc)
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            phone_no=random_string,
            email=fake.email(),
            role='user',  # Adjust as needed
            password='password123',  # Ensure hashing is handled in the model
            location_id= loc.id
        )
        users.append(user)

    session.add_all(users)
    session.commit()

# Create sample tokens
# seeding orders
# seeding products

#category 
