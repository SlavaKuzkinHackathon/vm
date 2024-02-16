import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  HasOne,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';

import { Role } from 'src/role/models/role.model';
import { UserRole } from 'src/role/models/user-role.model';
import { Token } from 'src/token/token.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasOne(() => Token, { onDelete: 'CASCADE' })
  token: Token;
}
