"""empty message

Revision ID: 66d263bf4bea
Revises: acb07615c1d6
Create Date: 2025-03-05 19:03:53.567809

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '66d263bf4bea'
down_revision = 'acb07615c1d6'
branch_labels = None
depends_on = None

# Define the new enum type
invoice_status_enum = sa.Enum('PENDING', 'COMPLETE', 'CANCELED', 'FAILED', name='invoicestatus')

def upgrade():
    # Explicitly create the enum type before adding the column
    invoice_status_enum.create(op.get_bind(), checkfirst=True)

    with op.batch_alter_table('invoices', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', invoice_status_enum, nullable=False))

def downgrade():
    with op.batch_alter_table('invoices', schema=None) as batch_op:
        batch_op.drop_column('status')

    # Explicitly drop the enum type
    invoice_status_enum.drop(op.get_bind(), checkfirst=True)

