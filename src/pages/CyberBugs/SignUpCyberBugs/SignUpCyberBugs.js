import React, { useState } from "react";
import { Input, Button } from "antd";
import { connect, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";


import {
  UserOutlined,
  LockOutlined,
  WhatsAppOutlined,
  DribbbleOutlined,
} from "@ant-design/icons";
import { USER_SIGN_UP_SAGA } from "../../../redux/constants/Cyberbugs/UserConstants";

export default function SignUpCyberBugs(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      passWord: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name can not be empty!"),
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
    onSubmit: (values) => {
      console.log("values", values);
      dispatch({
        type: USER_SIGN_UP_SAGA,
        signUpForm: values,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ height: window.innerHeight }}
      >
        <div>
          <h2
            className="text-center text-light text-login"
            style={{ fontWeight: 700, fontSize: 30 }}
          >
            Cyber Bugs
          </h2>
          <div>
            <h6 className="text-center text-light">Create An Account</h6>
            <div className="w-100 mt-3">
              <Input
                onChange={formik.handleChange}
                name="name"
                size="large"
                placeholder="Full Name"
                prefix={<DribbbleOutlined />}
              />
              {formik.touched.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : (
                ""
              )}
            </div>
            <div className="w-100 mt-3">
              <Input
                onChange={formik.handleChange}
                name="email"
                size="large"
                placeholder="Email Address"
                prefix={<UserOutlined />}
              />
              {formik.touched.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="w-100 mt-3">
              <Input
                onChange={formik.handleChange}
                name="passWord"
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
                type="password"
              />
            </div>
            {formik.touched.passWord ? (
              <div className="text-danger">{formik.errors.passWord}</div>
            ) : (
              ""
            )}
            <div className="w-100 mt-3">
              <Input
                onChange={formik.handleChange}
                name="phoneNumber"
                size="large"
                placeholder="Phone Number"
                prefix={<WhatsAppOutlined />}
              />
              {formik.touched.phoneNumber ? (
                <div className="text-danger">{formik.errors.phoneNumber}</div>
              ) : (
                ""
              )}
            </div>
            <button className="btn text-white w-100 my-4 btn-grad ">
              Register
            </button>

            <p>
              <NavLink className="text-primary " to="/login">
                Already have an account?
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
