import { call, put, takeLatest, select } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  DELETE_COMMENT_SAGA,
  EDIT_COMMENT_SAGA,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
} from "../../constants/Cyberbugs/CommentConst";

function* getAllCommentSaga(action) {
  try {
    const { status, data } = yield call(() =>
      commentService.getCommentDetail(action.taskIdCmt)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT,
        commentDetail: data.content,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("errorAllCommentSaga", err.response.data);
  }
}

export function* theoDoiGetAllCommentSaga() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}
//insert comment

function* insertCommentSaga(action) {
  try {
    const { status, data } = yield call(() =>
      commentService.insertComment(action.postComment)
    );
    console.log("insertCommentSaga", data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskIdCmt: action.postComment.taskId,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}
//delete comment

function* deleteCommentSaga(action) {
  try {
    const { status, data } = yield call(() =>
      commentService.deleteComment(action.idComment)
    );
    console.log(data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskIdCmt: action.taskIdCmt,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

//edit comment

function* editCommentSaga(action) {
  try {
    const { status, data } = yield call(() =>
      commentService.editComment(action.contentComment, action.id)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskIdCmt: action.taskIdCmt,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiEditCommentSaga() {
  yield takeLatest(EDIT_COMMENT_SAGA, editCommentSaga);
}
