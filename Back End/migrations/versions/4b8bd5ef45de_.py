"""empty message

Revision ID: 4b8bd5ef45de
Revises: c65e48dee906
Create Date: 2025-03-02 07:47:13.374598

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4b8bd5ef45de'
down_revision = 'c65e48dee906'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order_items',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('product_id', sa.UUID(), nullable=False),
    sa.Column('order_id', sa.UUID(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['id'])
        batch_op.drop_constraint('orders_product_id_fkey', type_='foreignkey')
        batch_op.drop_column('product_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('product_id', sa.UUID(), autoincrement=False, nullable=False))
        batch_op.create_foreign_key('orders_product_id_fkey', 'products', ['product_id'], ['id'], ondelete='SET NULL')
        batch_op.drop_constraint(None, type_='unique')

    op.drop_table('order_items')
    # ### end Alembic commands ###
