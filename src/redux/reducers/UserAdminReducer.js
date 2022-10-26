import {
  EDIT_USER_ADMIN_MODAL,
  GET_USER_ADMIN,
  GET_USER_SEARCH_ADMIN,
  SEARCH_USER_ADMIN,
} from "../constants/Cyberbugs/UserConstants";

const stateDefault = {
  arrUserAdmin: [
    {
      userId: 2060,
      name: "kai",
      avatar: "https://ui-avatars.com/api/?name=kai",
      email: "kai10@gmail.com",
      phoneNumber: "0987666555",
    },
  ],
  userEdit: {
    id: "",
    passWord: "",
    email: "string",
    name: "string",
    phoneNumber: "string",
  },
  userSearchAdmin: [],
};

export const UserAdminReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_USER_ADMIN: {
      state.arrUserAdmin = action.arrUserAdmin;
      return { ...state };
    }
    case EDIT_USER_ADMIN_MODAL: {
      state.userEdit = action.userEditModal;
      return { ...state };
    }

    case SEARCH_USER_ADMIN: {
      const arrUserSearchUpdate = state.arrUserAdmin.filter(
        (user) => user.userId == action.userSearch
      );
      state.arrUserAdmin = arrUserSearchUpdate;
      return { ...state };
    }

    case GET_USER_SEARCH_ADMIN: {
      state.userSearchAdmin = action.listUsersAdminSearch;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
