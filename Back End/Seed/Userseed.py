from sqlalchemy.orm import sessionmaker

from models.client import db
from models.users_model import User,Token  
from models.location_model import Location
from src.services_layer.utilities.index import hash_string
import uuid
from faker import Faker

fake = Faker()

Session = sessionmaker(bind=db.engine)  
session = Session()



locations = [Location(id=uuid.uuid4(), name=fake.city()) for _ in range(5)]
session.add_all(locations)
session.commit()


users = []
for _ in range(10):
    user = User(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        phone_no=fake.phone_number(),
        email=fake.email(),
        role=fake.random_element(elements=["user", "admin"]),
        password=hash_string("password123"),
        location_id=fake.random_element(elements=[loc.id for loc in locations])
    )
    users.append(user)

session.add_all(users)
session.commit()


tokens = [Token(key=fake.uuid4(), token=fake.random_number(digits=5)) for _ in range(5)]
session.add_all(tokens)
session.commit()

print("Database seeded successfully!")
session.close()
