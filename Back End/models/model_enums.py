import enum
class UserRoles(enum.Enum):
    admin = 'admin'
    super_admin = 'super_admin'
    user = 'user'
    guest = 'guest'