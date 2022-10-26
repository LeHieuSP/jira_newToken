import React, { useState, useEffect } from "react";
import { useFormik, withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  SET_SUBMIT_EDIT_USER_ADMIN,
  UPDATE_USER_ADMIN_SAGA,
} from "../../../redux/constants/Cyberbugs/UserConstants";

function FormEditUserAdmin(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_EDIT_USER_ADMIN,
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">User ID</p>
            <input
              value={values.id}
              className="form-control"
              name="id"
              disabled
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">User Name</p>
            <input
              value={values.name}
              className="form-control"
              name="name"
              onChange={handleChange}
            ></input>
            {touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Email</p>
            <input
              value={values.email}
              className="form-control"
              name="email"
              onChange={handleChange}
            ></input>
            {touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Phone Number</p>
            <input
              value={values.phoneNumber}
              className="form-control"
              name="phoneNumber"
              onChange={handleChange}
            ></input>
            {touched.phoneNumber ? (
              <div className="text-danger">{errors.phoneNumber}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Password</p>
            <input
              type="password"
              value={values.passWord}
              className="form-control"
              name="passWord"
              onChange={handleChange}
            ></input>
            <div className="text">
              You can adjust the password of other users.
            </div>
            {touched.passWord ? (
              <div className="text-danger">{errors.passWord}</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

const editProjectForm = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    const { userEdit } = props;

    return {
      name: userEdit?.name,
      id: userEdit?.userId,
      email: userEdit?.email,
      phoneNumber: userEdit?.phoneNumber,
      passWord: "",
    };
  },

  //bắt lỗi đăng nhập...
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Name can not be empty!")
      .matches(/^[A-Za-z]+$/, "Name is invalid!"),
    passWord: Yup.string()
      .required("Password can not be empty!")
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be at maximum 32 characters"),
    email: Yup.string()
      .required("Email can not be empty!")
      .email("Email is invalid!"),
    phoneNumber: Yup.string()
      .required("Phone number can not be empty!")
      .min(6, "Phone number must be at least 6 characters")
      .matches(/^[0-9]+$/, "Phone number can not a character"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: UPDATE_USER_ADMIN_SAGA,
      updateUser: values,
    });
  },

  displayName: "FormEditUserAdminFormik",
})(FormEditUserAdmin);

const mapStateToProps = (state) => {
  return {
    userEdit: state.UserAdminReducer.userEdit,
  };
};

export default connect(mapStateToProps)(editProjectForm);
