from models import Location, db

class LocationService:
    @staticmethod
    def get_all_locations():
        return Location.query.all()

    @staticmethod
    def get_location_by_id(location_id):
        return Location.query.get(location_id)

    @staticmethod
    def create_location(data):
        new_location = Location(**data)
        db.session.add(new_location)
        db.session.commit()
        return new_location

    @staticmethod
    def update_location(location_id, data):
        location = Location.query.get(location_id)
        if not location:
            return None
        for key, value in data.items():
            setattr(location, key, value)
        db.session.commit()
        return location

    @staticmethod
    def delete_location(location_id):
        location = Location.query.get(location_id)
        if not location:
            return None
        db.session.delete(location)
        db.session.commit()
        return location
