import enum
class UserRoles(enum.Enum):
    admin = 'admin'
    super_admin = 'super_admin'
    user = 'user'
    guest = 'guest'

class OrderStatus(enum.Enum):
    COMPLETE = 'COMPLETE'
    PENDING = 'PENDING'
    CANCELED = 'CANCELED'
    IN_PROGRESS = 'IN_PROGRESS'
    REJECTED = 'REJECTED'