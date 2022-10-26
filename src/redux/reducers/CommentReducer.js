import {
  EDIT_COMMENT,
  GET_ALL_COMMENT,
  INSERT_COMMENT,
} from "../constants/Cyberbugs/CommentConst";

const initialState = {
  lstComment: [
    {
      user: {
        userId: 1917,
        name: "cris",
        avatar: "https://ui-avatars.com/api/?name=cris",
      },
      id: 4168,
      userId: 1917,
      taskId: 4599,
      contentComment: "okeoke yepp",
      deleted: false,
      alias: "okeoke-yepp",
    },
    {
      user: {
        userId: 1917,
        name: "cris",
        avatar: "https://ui-avatars.com/api/?name=cris",
      },
      id: 4168,
      userId: 1917,
      taskId: 4599,
      contentComment: "okeoke yepp",
      deleted: false,
      alias: "okeoke-yepp",
    },
  ],
  postComment: {
    taskId: 4599,
    contentComment: "",
  },
  editComment: {
    contentComment: "",
    id: 1,
  },
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT:
      return { ...state, lstComment: action.commentDetail };

    case EDIT_COMMENT:
      return { ...state, lstComment: action.editComment };

    default:
      return state;
  }
};
