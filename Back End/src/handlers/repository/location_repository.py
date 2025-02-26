from models.index import Location, commit_session
class LocationRepository():
    @commit_session('location')
    def create_location(self, payload):
        newLocation = Location(longitude=payload['longitude'], lattitude=payload['lattitude'])
        return newLocation
        