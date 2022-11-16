"""empty message

Revision ID: 482948c5816e
Revises: 0f86c4b64193
Create Date: 2022-11-15 04:35:39.198983

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '482948c5816e'
down_revision = '0f86c4b64193'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('direct_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('dm_room_id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(), nullable=True),
    sa.Column('img', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['dm_room_id'], ['dm_rooms.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('direct_messages')
    # ### end Alembic commands ###