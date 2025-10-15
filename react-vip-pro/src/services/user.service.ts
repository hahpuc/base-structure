import { CreateUser, EditUser, QueryUser, UserDto } from "@/types/user";
import { BaseService } from "./base.service";

const API_PREFIX = "/admin";

class UserService extends BaseService<
  number,
  UserDto,
  CreateUser,
  EditUser,
  QueryUser
> {
  constructor() {
    super(API_PREFIX, "users");
  }
}

export const userService = new UserService();
