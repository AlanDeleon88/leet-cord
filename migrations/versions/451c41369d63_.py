"""empty message

Revision ID: 451c41369d63
Revises: 6a234aefa6a7
Create Date: 2022-11-14 15:47:51.219257

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '451c41369d63'
down_revision = '6a234aefa6a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('servers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('icon_img', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('servers')
    # ### end Alembic commands ###