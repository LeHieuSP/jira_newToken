import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConstants";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConstant";
import ReactHtmlParser from "react-html-parser";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/Cyberbugs/TaskConstants";

import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConstants";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import { withFormik } from "formik";
import {
  DELETE_COMMENT_SAGA,
  EDIT_COMMENT_SAGA,
  GET_ALL_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
} from "../../../redux/constants/Cyberbugs/CommentConst";
import classNames from "classnames";

const { Option } = Select;

function ModalCyberBugs(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  // COMMENT
  const { lstComment } = useSelector((state) => state.CommentReducer);
  const userLogin = useSelector(
    (state) => state.UserLoginCyberBugsReducer.userLogin
  );

  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  // COMMENT
  const [visibleComment, setVisibleComment] = useState(false);
  const [stateEdit, setStateEdit] = useState({
    contentComment: "",
  });
  const onClickEditComment = () => setVisibleComment(true);

  const [content, setContent] = useState(taskDetailModal.description);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    // COMMENT
    dispatch({
      type: GET_ALL_COMMENT_SAGA,
      taskIdCmt: taskDetailModal.taskId,
    });
  }, []);

  console.log("taskDetailModal", taskDetailModal);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            {" "}
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,

                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: historyContent,
                });
                setVisibleEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleComment = () => {
    return lstComment?.map((comment, index) => {
      return (
        <div
          key={index}
          className="display-comment"
          style={{ display: "flex" }}
        >
          <div className="avatar">
            <img src={comment.user.avatar} alt="" />
          </div>
          <div>
            <p style={{ marginBottom: 5 }}>
              {comment.user.name} <span>a month ago</span>
            </p>
            {visibleComment ? (
              <form className="input-comment">
                <input
                  name="contentComment"
                  className="form-control"
                  type="text"
                  placeholder="Add a comment ..."
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const newValueEdit = {
                      ...stateEdit.contentComment,
                      [name]: value,
                    };
                    setStateEdit(newValueEdit);
                  }}
                />
                <span
                  onClick={() => {
                    dispatch({
                      type: EDIT_COMMENT_SAGA,
                      id: comment?.id,
                      contentComment: stateEdit?.contentComment,
                      taskIdCmt: comment?.taskId,
                    });
                    setVisibleComment(false);
                  }}
                  style={{ color: "#929398", cursor: "pointer" }}
                >
                  Save
                </span>
              </form>
            ) : (
              <p style={{ marginBottom: 5 }}>{comment.contentComment}</p>
            )}
            <div>
              <span
                onClick={onClickEditComment}
                style={{ color: "#929398", cursor: "pointer" }}
              >
                Edit
              </span>
              •
              <span
                onClick={() => {
                  dispatch({
                    type: DELETE_COMMENT_SAGA,
                    taskIdCmt: taskDetailModal.taskId,
                    idComment: comment.id,
                  });
                }}
                style={{ color: "#929398", cursor: "pointer" }}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleChangeModal = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChangeModal}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChangeModal}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className={classNames("task-title", "CollapsedText")}>
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                value={taskDetailModal.typeId}
                onChange={handleChangeModal}
                style={{ marginLeft: 10 }}
              >
                {arrTaskType.map((tp, index) => {
                  return <option value={tp.id}>{tp.taskType}</option>;
                })}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end"}} className={classNames("task-click", "CollapsedText")}>
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i
                className="fa fa-trash-alt='xyz'"
                style={{ cursor: "pointer" }}
              />
              <button
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                className="CloseBtn"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                  </div>

                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src={userLogin?.avatar} alt={userLogin?.avatar} />
                      </div>
                      <form onSubmit={handleSubmit} className="input-comment">
                        <input
                          name="contentComment"
                          className="form-control"
                          type="text"
                          placeholder="Add a comment ..."
                          onChange={handleChange}
                        />
                        <p className="CollapsedText">
                          Press
                          <button className="m-1 btn btn-primary p-1">
                            Enter
                          </button>
                          to post your comment
                        </p>
                      </form>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">{handleComment()}</div>
                    </div>
                  </div>
                </div>

                <div className= "Details">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="custom-select"
                      value={taskDetailModal.statusId}
                      onChange={(e) => {
                        handleChangeModal(e);
                      }}
                    >
                      {arrStatus.map((status, index) => {
                        return (
                          <option value={status.statusId} key={index}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees" style={{ marginBottom: 10 }}>
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModal.assigness.map((user, index) => {
                        return (
                          <div
                            className={classNames("mt-2", "mb-2", "assignee")}
                          >
                            <div key={index} className="item">
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {user.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_API_SAGA,
                                      actionType: REMOVE_USER_ASSIGN,
                                      userId: user.id,
                                    });
                                  }}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-6  mt-2 mb-2">
                        <Select
                          options={projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModal.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem, index) => {
                              return { value: mem.userId, label: mem.name };
                            })}
                          optionFilterProp="label"
                          style={{ width: "100%" }}
                          name="lstUser"
                          value="+ Add more"
                          className="form-control"
                          onSelect={(value) => {
                            if (value == "0") {
                              return;
                            }
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };
                            dispatch({
                              type: HANDLE_CHANGE_POST_API_SAGA,
                              actionType: CHANGE_ASSIGNESS,
                              userSelected,
                            });
                          }}
                        ></Select>
                      </div>
                    </div>
                  </div>

                  <div className="priority" style={{ marginBottom: 15 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChangeModal(e);
                      }}
                    >
                      {arrPriority.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6 className="CollapsedText">ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      type="text"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      onChange={(e) => {
                        handleChangeModal(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }} className="CollapsedText">
                    Create at a month ago
                  </div>
                  <div style={{ color: "#929398" }} className="CollapsedText">
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const createComment = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    return {
      taskId: props.taskDetailModal.taskId,
      contentComment: "",
    };
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: INSERT_COMMENT_SAGA,
      postComment: values,
    });
  },

  displayName: "CreateComment",
})(ModalCyberBugs);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
    taskDetailModal: state.TaskReducer.taskDetailModal,
  };
};

export default connect(mapStateToProps)(createComment);
