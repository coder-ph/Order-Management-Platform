"""updated users

Revision ID: a7730a86dd14
Revises: d32fdca278ae
Create Date: 2025-02-26 10:52:48.246613

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a7730a86dd14'
down_revision = 'd32fdca278ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=50), nullable=False))
        batch_op.drop_constraint('users_username_key', type_='unique')
        batch_op.create_unique_constraint(None, ['first_name'])
        batch_op.create_unique_constraint(None, ['last_name'])
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_unique_constraint('users_username_key', ['username'])
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###
