import Axios from "axios";
import {
  DOMAIN_CYBERBUG,
  TOKEN,
  TOKEN_CYBERSOFT,
} from "../util/constants/settingSystem";

export const commentService = {
  //get all comment
  getCommentDetail: (taskIdCmt) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/Comment/getAll?taskId=${taskIdCmt}`,
      method: "GET",
      data: taskIdCmt,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  //insert comment
  insertComment: (postComment) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/Comment/insertComment`,
      method: "POST",
      data: postComment,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  //delete comment
  deleteComment: (idComment) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/Comment/deleteComment?idComment=${idComment}`,
      method: "DELETE",
      data: idComment,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  //edit comment
  editComment: (id, contentComment) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/Comment/updateComment?id=${contentComment}&contentComment=${id}`,
      method: "PUT",

      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
};
