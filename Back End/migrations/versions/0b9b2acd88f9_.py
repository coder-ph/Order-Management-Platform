"""empty message

Revision ID: 0b9b2acd88f9
Revises: 60f0a7ec0699
Create Date: 2025-03-02 09:43:18.358922

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0b9b2acd88f9'
down_revision = '60f0a7ec0699'
branch_labels = None
depends_on = None

order_status_enum = sa.Enum('COMPLETE', 'PENDING', 'CANCELED', 'IN_PROGRESS', 'REJECTED', name='orderstatus')
def upgrade():
    # Explicitly create the Enum type before using it
    order_status_enum.create(op.get_bind(), checkfirst=True)

    with op.batch_alter_table('invoices', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['id'])

    # Alter 'status' column with explicit casting
    op.execute("ALTER TABLE orders ALTER COLUMN status TYPE orderstatus USING status::orderstatus")
def downgrade():
    # Convert back to VARCHAR before dropping ENUM
    op.execute("ALTER TABLE orders ALTER COLUMN status TYPE VARCHAR(15) USING status::TEXT")

    with op.batch_alter_table('invoices', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # Drop the enum type (ONLY IF IT'S NO LONGER USED)
    order_status_enum.drop(op.get_bind(), checkfirst=True)
