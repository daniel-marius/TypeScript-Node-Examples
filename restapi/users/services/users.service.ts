import usersDao from "../daos/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { UsersDto } from "../dto/users.model";

class UsersService implements CRUD {
  private static instance: UsersService;

  static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }

  async create(resource: UsersDto) {
    return await usersDao.addUser(resource);
  }

  async deleteById(resourceId: string) {
    return await usersDao.removeUserById(resourceId);
  }

  async list(limit: number, page: number) {
    return await usersDao.getUsers();
  }

  async patchById(resource: UsersDto) {
    return await usersDao.patchUserById(resource);
  }

  async readById(resourceId: string) {
    return await usersDao.getUserById(resourceId);
  }

  async updateById(resource: UsersDto) {
    return await usersDao.putUserById(resource);
  }

  async getUserByEmail(email: string) {
    return usersDao.getUserByEmail(email);
  }
}

export default UsersService.getInstance();
