from flask import jsonify, request
from services.location_service import LocationService

class LocationController:
    @staticmethod
    def get_locations():
        locations = LocationService.get_all_locations()
        return jsonify([{"id": loc.id, "latitude": loc.latitude, "longitude": loc.longitude} for loc in locations]), 200

    @staticmethod
    def get_location(location_id):
        location = LocationService.get_location_by_id(location_id)
        if not location:
            return jsonify({"error": "Location not found"}), 404
        return jsonify({"id": location.id, "latitude": location.latitude, "longitude": location.longitude}), 200

    @staticmethod
    def create_location():
        data = request.get_json()
        location = LocationService.create_location(data)
        return jsonify({"message": "Location created", "id": location.id}), 201

    @staticmethod
    def update_location(location_id):
        data = request.get_json()
        location = LocationService.update_location(location_id, data)
        if not location:
            return jsonify({"error": "Location not found"}), 404
        return jsonify({"message": "Location updated"}), 200

    @staticmethod
    def delete_location(location_id):
        location = LocationService.delete_location(location_id)
        if not location:
            return jsonify({"error": "Location not found"}), 404
        return jsonify({"message": "Location deleted"}), 200
