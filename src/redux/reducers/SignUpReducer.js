import { USER_FORM_SERVICE } from "../constants/Cyberbugs/UserConstants";

const initialState = {
  userForm: false,
};

export const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FORM_SERVICE: {
      state.userForm = action.userForm;
      return { ...state };
    }

    default:
      return state;
  }
};
