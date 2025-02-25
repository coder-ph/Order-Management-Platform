from models import OrderAssignment, db
class OrderAssignmentService:
    @staticmethod
    def assign_order(order_id, user_id):
        try:
            
            order = Order.query.get(order_id)
            if not order:
                return None, "Order not found"
            
            
            user = User.query.get(user_id)
            if not user:
                return None, "User not found"
            
            
            existing = OrderAssignment.query.filter_by(
                order_id=order_id,
                user_assigned=user_id
            ).first()
            
            if existing:
                return existing, "Assignment already exists"
            
           
            assignment = OrderAssignment(
                order_id=order_id,
                user_assigned=user_id
            )
            
            db.session.add(assignment)
            db.session.commit()
            return assignment, None
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}
    
    @staticmethod
    def remove_assignment(assignment_id):
        try:
            assignment = OrderAssignment.query.get(assignment_id)
            if not assignment:
                return False, "Assignment not found"
            
            db.session.delete(assignment)
            db.session.commit()
            return True, None
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}
    
    @staticmethod
    def get_assignments_by_user(user_id):
        return OrderAssignment.query.filter_by(user_assigned=user_id).all()
    
    @staticmethod
    def get_assignments_by_order(order_id):
        return OrderAssignment.query.filter_by(order_id=order_id).all()