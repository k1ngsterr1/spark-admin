import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "config/sequelize";

interface UserAttributes {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface UserCreationsAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationsAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  private _role!: string; // Use an underscore to differentiate private properties
  private _password!: string;

  constructor(attributes: UserAttributes) {
    super();
    Object.assign(this, attributes);
    this._password = this.hashPassword(attributes.password);
  }

  private hashPassword(password: string): string {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    if (await this.verifyPassword(oldPassword)) {
      this._password = this.hashPassword(newPassword);
      return true;
    }
    return false;
  }

  public async verifyPassword(password: string): Promise<boolean> {
    return bcryptjs.compareSync(password, this._password);
  }

  public changeRole(newRole: string): void {
    this._role = newRole;
  }

  get role(): string {
    return this._role;
  }

  set role(newRole: string) {
    this._role = newRole;
  }

  get password(): string {
    return "Password is private";
  }

  get passwordHash(): string {
    return this._password;
  }
}
