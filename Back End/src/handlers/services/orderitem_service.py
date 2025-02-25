from models import OrderItem,db


class OrderItemService:
    @staticmethod
    def get_items_by_order(order_id):
        return OrderItem.query.filter_by(order_id=order_id).all()
    
    @staticmethod
    def add_item_to_order(order_id, product_id, quantity):
        try:
            order = Order.query.get(order_id)
            product = Product.query.get(product_id)
            
            if not order:
                return None, "Order not found"
            if not product:
                return None, "Product not found"
            
            
            existing_item = OrderItem.query.filter_by(
                order_id=order_id, 
                product_id=product_id
            ).first()
            
            if existing_item:
              
                existing_item.quantity += quantity
                item_price = product.price * quantity
            else:
                
                item_price = product.price * quantity
                new_item = OrderItem(
                    order_id=order_id,
                    product_id=product_id,
                    quantity=quantity,
                    price=product.price
                )
                db.session.add(new_item)
            
           
            order.total_amount += item_price
            
            
            invoice = Invoice.query.filter_by(order_id=order_id).first()
            if invoice and invoice.status == "Unpaid":
                invoice.amount_due += item_price
            
            db.session.commit()
            return order, None
        except SQLAlchemyError as e:
            db.session.rollback()
            return None, str(e)
    
    @staticmethod
    def update_item_quantity(order_item_id, quantity):
        try:
            item = OrderItem.query.get(order_item_id)
            if not item:
                return None, "Order item not found"
            
           
            price_diff = item.price * (quantity - item.quantity)
            
            
            item.quantity = quantity
            
          
            order = Order.query.get(item.order_id)
            order.total_amount += price_diff
            
           
            invoice = Invoice.query.filter_by(
                order_id=item.order_id, 
                status="Unpaid"
            ).first()
            if invoice:
                invoice.amount_due += price_diff
            
            db.session.commit()
            return item, None
        except SQLAlchemyError as e:
            db.session.rollback()
            return None, str(e)
    
    @staticmethod
    def remove_item(order_item_id):
        try:
            item = OrderItem.query.get(order_item_id)
            if not item:
                return False, "Order item not found"
            
           
            item_total = item.price * item.quantity
            
          
            order = Order.query.get(item.order_id)
            order.total_amount -= item_total
            
           
            invoice = Invoice.query.filter_by(
                order_id=item.order_id, 
                status="Unpaid"
            ).first()
            if invoice:
                invoice.amount_due -= item_total
            
            
            db.session.delete(item)
            db.session.commit()
            return True, None
        except SQLAlchemyError as e:
            db.session.rollback()
            return False, str(e)