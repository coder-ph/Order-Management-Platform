from .user_repository import UserRepository
from .location_repository import LocationRepository

location_repository = LocationRepository()
user_repository = UserRepository(location_repository)
