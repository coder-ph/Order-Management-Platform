"""empty message

Revision ID: 9e0b0054195f
Revises: 0b9b2acd88f9
Create Date: 2025-03-04 08:11:06.865331

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9e0b0054195f'
down_revision = '0b9b2acd88f9'
branch_labels = None
depends_on = None

def upgrade():
    # Explicitly cast VARCHAR to FLOAT using USING clause
    op.execute('ALTER TABLE orders ALTER COLUMN total_amount TYPE FLOAT USING total_amount::double precision')

def downgrade():
    # Convert FLOAT back to VARCHAR explicitly
    op.execute('ALTER TABLE orders ALTER COLUMN total_amount TYPE VARCHAR(50) USING total_amount::text')
