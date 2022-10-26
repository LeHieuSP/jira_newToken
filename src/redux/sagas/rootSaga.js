import { all } from "redux-saga/effects";

import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCategorySaga from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";
import * as TaskTypeSaga from "./Cyberbugs/TaskTypeSaga";
import * as PrioritySaga from "./Cyberbugs/PrioritySaga";
import * as TaskSaga from "./Cyberbugs/TaskSaga";
import * as StatusSaga from "./Cyberbugs/StatusSaga";
import * as CommentSaga from "./Cyberbugs/CommentSaga";
import * as UserAdminSaga from "./Cyberbugs/UserAdminSaga";
export function* rootSaga() {
  yield all([
    //Nghiệp vụ cyberbugs ...
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProject(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    
    StatusSaga.theoDoiGetAllStatusSaga(),

    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPriority(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiUdpateTask(),


    CommentSaga.theoDoiGetAllCommentSaga(),
    CommentSaga.theoDoiInsertCommentSaga(),
    CommentSaga.theoDoiDeleteCommentSaga(),
    CommentSaga.theoDoiEditCommentSaga(),

    UserAdminSaga.theoDoiUserSignUpSaga(),
    UserAdminSaga.theoDoiGetUserAdminSaga(),
    UserAdminSaga.theoDoiDeleteUserAdminSaga(),
    UserAdminSaga.theoDoiUpdateUserAdminSaga(),

  ]);
}
