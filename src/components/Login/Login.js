import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = (props) => {
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const changeRegister = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    if (!valueLogin) {
      toast.error("Please enter email or phone number");
      return;
    }
    if (!password) {
      toast.error("Please enter password");
      return;
    }

    await loginUser(valueLogin, password);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/testapi")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);
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
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>

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
