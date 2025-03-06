from faker import Faker
from sqlalchemy.orm import sessionmaker
from models.client import db
from models.users_model import User,Token
from models.location_model import Location

import uuid

fake = Faker()

# Initialize session
Session = sessionmaker(bind=db.engine)
session = Session()

# Create sample locations
locations = [Location(id=uuid.uuid4(), name=fake.city()) for _ in range(5)]
session.add_all(locations)
session.commit()

# Create sample users
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
tokens = [Token(key=str(uuid.uuid4()), token=str(fake.random_number(digits=5))) for _ in range(5)]
session.add_all(tokens)
session.commit()

print("Database seeded successfully!")
session.close()