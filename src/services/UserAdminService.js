
import Axios from "axios";
import { baseService } from "./baseService";

export class UserAdminService extends baseService {
  constructor() {
    super();
  }

  userSignUpAPI = (signUpForm) => {
    return this.post(`api/Users/signup`, signUpForm);
  };
  getUserAdminAPI = (keyWord) => {
    return this.get(`api/Users/getUser?keyword=${keyWord}`);
  };
  deleteUserAdminAPI = (userId) => {
    return this.delete(`api/Users/deleteUser?id=${userId}`);
  };
  updateUserAdminAPI = (updateUser) => {
    return this.put(`api/Users/editUser`,updateUser);
  };
}


export const userAdminService = new UserAdminService();
