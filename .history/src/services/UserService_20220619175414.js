import { baseService } from './baseService';

export class UserService extends baseService {
  constructor() {
    super();
  }

  getUser = (keyWord) => this.get(`api/Users/getUser?keyword=${keyWord}`);

  assignUserProject = (userProject) => this.post('api/Project/assignUserProject', userProject);

  deleteUserFromProject = (userProject) => this.post('api/Project/removeUserFromProject', userProject);

  getUserByProjectId = (idProject) => {
    return this.get(`api/Users/getUserByProjectId?idProject=${idProject}`);
  };
  


}

export const userService = new UserService();
