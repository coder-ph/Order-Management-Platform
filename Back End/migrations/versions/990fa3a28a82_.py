"""empty message

Revision ID: 990fa3a28a82
Revises: 32c6067aae01
Create Date: 2025-02-27 10:52:14.099295

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '990fa3a28a82'
down_revision = '32c6067aae01'
branch_labels = None
depends_on = None

userrole_enum = sa.Enum('admin', 'super_admin', 'user', 'guest', name='userroles')

def upgrade():
    userrole_enum.create(op.get_bind(), checkfirst=True)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', userrole_enum, nullable=False, server_default="user"))

def downgrade():
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('role')

    userrole_enum.drop(op.get_bind(), checkfirst=True)
