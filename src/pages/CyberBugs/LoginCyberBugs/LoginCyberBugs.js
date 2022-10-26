import React from 'react';
import { Button, Input } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { withFormik, Formik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";
import { USER_SIGNIN_API } from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { singinCyberbugAction } from "../../../redux/actions/CyberBugsActions";
import { NavLink } from "react-router-dom";
import SignUpCyberBugs from "../SignUpCyberBugs/SignUpCyberBugs";
import { history } from "../../../util/history";
function LoginCyberBugs(props) {
  const {
    values, touched, errors, handleChange, handleBlur, handleSubmit,
  } = props;

  // const { userForm } = useSelector((state) => state.SignUpReducer);

  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ height: window.innerHeight }}
      >
        <h3
          className="text-center text-light"
          style={{ fontWeight: 700, fontSize: 30 }}
        >
          Login Cyber Bugs
        </h3>
        {/* {!userForm ? (
          <div> */}
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            name="email"
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            type="password"
            name="password"
            size="large"
            placeholder="password"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.password}</div>
        {/* </div>  
        ) : (
            history.push("/signup")
        )} */}

        <div style={{ display: "flex" }}>
          <button htmlType="submit" className="btn text-white btn-signup">
            Login
          </button>

          {/* <SignUpCyberBugs></SignUpCyberBugs> */}
          <button type="button" className="btn text-white btn-signin">
            <NavLink to="/signup" className="text-white">
              Sign Up
            </NavLink>
          </button>
        </div>

        <div className="social mt-3 d-flex ">
          <div>
            <a href="https://www.github.com/" target="_blank" rel="noreferrer">
              <Button
                type="ghost"
                shape="circle"
                icon={<GithubOutlined />}
                size={"large"}
                className="mr-4"
              ></Button>
            </a>
          </div>
          <div>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <Button
                type="ghost"
                shape="circle"
                icon={<TwitterOutlined />}
                size={"large"}
                className="mr-4"
              ></Button>
            </a>
          </div>
          <div>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              <Button
                type="ghost"
                shape="circle"
                icon={<InstagramOutlined />}
                size={"large"}
              ></Button>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}

const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Email is required!')
      .email('email is invalid!'),
    password: Yup.string()
      .min(6, 'password must have min 6 characters')
      .max(32, 'password  have max 32 characters'),
  }),
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch(singinCyberbugAction(email, password));
  },
  displayName: 'LoginCyberBugs',
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
