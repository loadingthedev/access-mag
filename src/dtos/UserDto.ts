import { IUser } from "../models/User";

class UserDto {
  id;
  name;
  email;
  accessModules;
  isAdmin;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.accessModules = user.accessModules;
    // this.password = user.password;
    this.isAdmin = user.isAdmin;
  }
}

export default UserDto;
