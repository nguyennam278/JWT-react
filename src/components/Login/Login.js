import React from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {
  const history = useHistory();
  const changeRegister = () => {
    history.push("/register");
  };

  return (
    <div className="login-conatiner">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left d-none d-sm-block  col-7 d-flex flex-column gap-3">
            <div className="content-left__title  ">ThanhNam</div>
            <div className="content-left__detail">ThanhNam apppp</div>
          </div>

          <div className="content-right col-12 col-md-5 d-flex flex-column gap-3 ">
            <div className="title-hide d-sm-none ">ThanhNam</div>
            <input
              type="text"
              className="form-control "
              placeholder="Email address or phone number"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <button className="btn btn-primary">Login</button>

            <a href="#" className="forgot-password">
              Forgot your password
            </a>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={changeRegister}>
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
